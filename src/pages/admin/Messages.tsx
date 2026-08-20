// @ts-nocheck

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { MessageSquare, Search, Loader2, RefreshCw, Mail, CheckCircle, Clock, Reply } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAdminAuth } from '@/context/AdminAuthContext';

const STATUSES = ['New', 'In Progress', 'Resolved'];

const Messages = () => {
  const { toast } = useToast();
  const { adminUser, isAuthenticated } = useAdminAuth();
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selected, setSelected] = useState<any | null>(null);
  const [notes, setNotes] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchMessages = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(2000);
      if (error) throw error;
      setMessages(data || []);
    } catch (e) {
      console.error(e);
      toast({ title: 'Error', description: 'Failed to load messages', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    if (isAuthenticated) fetchMessages();
  }, [isAuthenticated, fetchMessages]);

  const filtered = messages.filter((m) => {
    const q = search.toLowerCase();
    const matches =
      !q ||
      m.name?.toLowerCase().includes(q) ||
      m.email?.toLowerCase().includes(q) ||
      m.subject?.toLowerCase().includes(q) ||
      m.message?.toLowerCase().includes(q);
    const matchesStatus = statusFilter === 'all' || m.status === statusFilter;
    return matches && matchesStatus;
  });

  const updateStatus = async (status: string) => {
    if (!selected) return;
    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({
          status,
          admin_notes: notes,
          handled_by: adminUser?.id || null,
          handled_at: new Date().toISOString(),
        })
        .eq('id', selected.id);
      if (error) throw error;
      toast({ title: 'Message updated', description: `Marked as ${status}.` });
      setSelected(null);
      fetchMessages();
    } catch (e) {
      console.error(e);
      toast({ title: 'Error', description: 'Could not update the message', variant: 'destructive' });
    } finally {
      setIsUpdating(false);
    }
  };

  const statusBadge = (s: string) => {
    if (s === 'Resolved') return <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">Resolved</Badge>;
    if (s === 'In Progress') return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">In Progress</Badge>;
    return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">New</Badge>;
  };

  const counts = {
    total: messages.length,
    New: messages.filter((m) => m.status === 'New').length,
    Resolved: messages.filter((m) => m.status === 'Resolved').length,
  };

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Citizen Messages"
        description="Messages submitted through the public contact page"
        icon={MessageSquare}
      />

      <div className="grid gap-4 md:grid-cols-3 mb-6">
        {[
          { label: 'Total Messages', value: counts.total, icon: Mail },
          { label: 'Awaiting Response', value: counts.New, icon: Clock },
          { label: 'Resolved', value: counts.Resolved, icon: CheckCircle },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <p className="text-3xl font-bold">{s.value}</p>
              </div>
              <s.icon className="w-8 h-8 text-muted-foreground/40" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-5 space-y-4">
          <div className="flex flex-col md:flex-row gap-3 md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input className="pl-9" placeholder="Search by name, email or subject" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                {STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={fetchMessages} disabled={isLoading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>

          {isLoading ? (
            <div className="py-16 flex justify-center"><Loader2 className="w-6 h-6 animate-spin" /></div>
          ) : filtered.length === 0 ? (
            <p className="py-16 text-center text-muted-foreground">No messages found.</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sender</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Received</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((m) => (
                    <TableRow key={m.id}>
                      <TableCell>
                        <div className="font-medium">{m.name}</div>
                        <div className="text-xs text-muted-foreground">{m.email}</div>
                      </TableCell>
                      <TableCell className="max-w-[320px]">
                        <div className="font-medium truncate">{m.subject}</div>
                        <div className="text-xs text-muted-foreground truncate">{m.message}</div>
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-sm">{new Date(m.created_at).toLocaleString()}</TableCell>
                      <TableCell>{statusBadge(m.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="outline" onClick={() => { setSelected(m); setNotes(m.admin_notes || ''); }}>
                          Open
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selected?.subject}</DialogTitle>
            <DialogDescription>
              From {selected?.name} · {selected?.email} · {selected && new Date(selected.created_at).toLocaleString()}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="rounded-lg bg-muted p-4 text-sm whitespace-pre-wrap">{selected?.message}</div>
            <div>
              <label className="text-sm font-medium">Internal notes / response summary</label>
              <Textarea className="mt-2" rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Record the action taken or reply sent…" />
            </div>
            {selected?.email && (
              <Button asChild variant="outline" className="w-full">
                <a href={`mailto:${selected.email}?subject=${encodeURIComponent('RE: ' + (selected?.subject || ''))}`}>
                  <Reply className="w-4 h-4 mr-2" /> Reply by email
                </a>
              </Button>
            )}
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" disabled={isUpdating} onClick={() => updateStatus('In Progress')}>Mark In Progress</Button>
            <Button disabled={isUpdating} onClick={() => updateStatus('Resolved')}>
              {isUpdating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <CheckCircle className="w-4 h-4 mr-2" />}
              Mark Resolved
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default Messages;
