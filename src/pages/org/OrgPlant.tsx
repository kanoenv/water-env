import { useEffect, useRef, useState } from "react";
import OrgLayout, { useOrgApp } from "@/components/org/OrgLayout";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Camera, MapPin, Loader2, CheckCircle2, TreePine } from "lucide-react";

const SPECIES = ["Neem", "Mahogany", "Mango", "Moringa", "Acacia", "Eucalyptus", "Cassia", "Date Palm", "Other"];

async function compress(file: File): Promise<{ base64: string; mime: string }> {
  const img = await new Promise<HTMLImageElement>((res, rej) => {
    const i = new Image(); i.onload = () => res(i); i.onerror = rej;
    i.src = URL.createObjectURL(file);
  });
  const max = 1280;
  const scale = Math.min(1, max / Math.max(img.width, img.height));
  const w = Math.round(img.width * scale), h = Math.round(img.height * scale);
  const c = document.createElement("canvas"); c.width = w; c.height = h;
  c.getContext("2d")!.drawImage(img, 0, 0, w, h);
  const dataUrl = c.toDataURL("image/jpeg", 0.78);
  return { base64: dataUrl.split(",")[1], mime: "image/jpeg" };
}

export default function OrgPlant() {
  const { app } = useOrgApp();
  const { toast } = useToast();
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [gpsBusy, setGpsBusy] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [form, setForm] = useState({ species: "Neem", trees_planted: "1", notes: "", location_name: "", district: "" });
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchGps = () => {
    setGpsBusy(true);
    navigator.geolocation.getCurrentPosition(
      p => { setCoords({ lat: p.coords.latitude, lng: p.coords.longitude }); setGpsBusy(false); },
      e => { setGpsBusy(false); toast({ title: "GPS failed", description: e.message, variant: "destructive" }); },
      { enableHighAccuracy: true, timeout: 15000 },
    );
  };
  useEffect(() => { fetchGps(); }, []);

  const onPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    setPhoto(f); setPreview(URL.createObjectURL(f));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!coords) return toast({ title: "Waiting for GPS", variant: "destructive" });
    if (!photo) return toast({ title: "Photo required", variant: "destructive" });
    setBusy(true);
    const { base64, mime } = await compress(photo);
    const { data: { session } } = await supabase.auth.getSession();
    const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/org-plant`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        Authorization: `Bearer ${session?.access_token}`,
      },
      body: JSON.stringify({
        species: form.species, trees_planted: Number(form.trees_planted),
        latitude: coords.lat, longitude: coords.lng,
        location_name: form.location_name, district: form.district, notes: form.notes,
        photo_base64: base64, photo_mime: mime,
      }),
    });
    const j = await res.json();
    setBusy(false);
    if (!res.ok) return toast({ title: "Save failed", description: j.error, variant: "destructive" });
    setSuccess(true);
    toast({ title: "Planting logged", description: "Your tree has been recorded." });
    setTimeout(() => {
      setSuccess(false); setPhoto(null); setPreview(null);
      setForm({ ...form, notes: "", trees_planted: "1" });
      fetchGps();
    }, 1800);
  };

  return (
    <OrgLayout>
      <header className="mb-6">
        <p className="text-emerald-700 text-xs uppercase tracking-widest">Field action</p>
        <h1 className="font-serif text-2xl sm:text-3xl text-slate-900 flex items-center gap-2">
          <TreePine className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-700" /> Plant a tree
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Log a planting on behalf of {app?.organization_name}.</p>
      </header>

      <div className="max-w-2xl">
        <Card>
          <CardHeader><CardTitle className="text-base">New planting</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={submit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label>Species</Label>
                  <select className="w-full h-10 border rounded-md px-2 bg-background" value={form.species} onChange={e => setForm({ ...form, species: e.target.value })}>
                    {SPECIES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <Label>Trees planted (this entry)</Label>
                  <Input type="number" min={1} value={form.trees_planted} onChange={e => setForm({ ...form, trees_planted: e.target.value })} />
                </div>
              </div>

              <div className="rounded-lg border p-3 bg-emerald-50">
                <div className="flex items-center gap-2 text-sm font-semibold text-emerald-800"><MapPin className="w-4 h-4" /> GPS location</div>
                {coords ? (
                  <div className="text-xs text-emerald-900 mt-1">{coords.lat.toFixed(6)}, {coords.lng.toFixed(6)}</div>
                ) : (
                  <div className="text-xs text-amber-700 mt-1 flex items-center gap-1"><Loader2 className="w-3 h-3 animate-spin"/> Acquiring…</div>
                )}
                <Button type="button" size="sm" variant="outline" className="mt-2" onClick={fetchGps} disabled={gpsBusy}>Refresh GPS</Button>
              </div>

              <div>
                <Label>Photo</Label>
                <input ref={fileRef} type="file" accept="image/*" capture="environment" onChange={onPhoto} className="hidden" />
                <Button type="button" variant="outline" className="w-full h-28 border-dashed" onClick={() => fileRef.current?.click()}>
                  {preview ? <img src={preview} className="h-24 rounded object-cover" alt="" /> : <span className="flex items-center gap-2"><Camera className="w-5 h-5" /> Snap or upload a photo</span>}
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div><Label>Site name</Label><Input value={form.location_name} onChange={e => setForm({ ...form, location_name: e.target.value })} placeholder="e.g. Audu Bako park" /></div>
                <div><Label>District / LGA</Label><Input value={form.district} onChange={e => setForm({ ...form, district: e.target.value })} placeholder="e.g. Nassarawa" /></div>
              </div>
              <div><Label>Notes (optional)</Label><Textarea rows={2} value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} /></div>

              <Button type="submit" disabled={busy || !coords} className="w-full h-12 text-base bg-emerald-700 hover:bg-emerald-800">
                {busy ? <><Loader2 className="w-4 h-4 mr-2 animate-spin"/> Saving…</> : success ? <><CheckCircle2 className="w-5 h-5 mr-2"/> Saved!</> : "Submit planting"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </OrgLayout>
  );
}
