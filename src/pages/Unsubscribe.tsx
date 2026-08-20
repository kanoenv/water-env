import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

export default function Unsubscribe() {
  const [params] = useSearchParams();
  const token = params.get('token') || '';
  const [state, setState] = useState<'loading' | 'valid' | 'used' | 'invalid' | 'success' | 'error'>('loading');
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    if (!token) { setState('invalid'); return; }
    (async () => {
      try {
        const res = await fetch(`${SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`, {
          headers: { apikey: SUPABASE_ANON },
        });
        const j = await res.json();
        if (!res.ok) { setState('invalid'); return; }
        if (j.used) setState('used');
        else { setEmail(j.email || ''); setState('valid'); }
      } catch {
        setState('error');
      }
    })();
  }, [token]);

  const confirm = async () => {
    const { error } = await supabase.functions.invoke('handle-email-unsubscribe', { body: { token } });
    if (error) setState('error'); else setState('success');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-emerald-50">
      <Card className="max-w-md w-full">
        <CardContent className="p-8 text-center space-y-4">
          <h1 className="text-2xl font-serif text-emerald-900">Email Preferences</h1>
          {state === 'loading' && <p>Loading…</p>}
          {state === 'invalid' && <p className="text-red-700">This unsubscribe link is invalid.</p>}
          {state === 'used' && <p>This email has already been unsubscribed.</p>}
          {state === 'valid' && (
            <>
              <p>Unsubscribe <strong>{email}</strong> from future emails from the Kano State Ministry of Water Resources, Environment and Climate Change?</p>
              <Button className="bg-emerald-700 hover:bg-emerald-800" onClick={confirm}>Confirm Unsubscribe</Button>
            </>
          )}
          {state === 'success' && <p className="text-emerald-800">You have been unsubscribed successfully.</p>}
          {state === 'error' && <p className="text-red-700">Something went wrong. Please try again later.</p>}
        </CardContent>
      </Card>
    </div>
  );
}
