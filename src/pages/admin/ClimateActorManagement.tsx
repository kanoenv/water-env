// @ts-nocheck
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import AdminStatCard from '@/components/admin/AdminStatCard';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Users,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  Mail,
  Phone,
  Building2,
  Calendar,
  MapPin,
  Target,
  Trash2,
  Download,
  Search,
  RefreshCw,
  ChevronLeft,
  ChevronRight
} from "lucide-react";


interface ClimateActor {
  id: string;
  organization_name: string;
  actor_type: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  status: string;
  created_at: string;
  approved_at: string | null;
  focus_areas: string[];
  lga_operations: string[];
  description: string;
  website_url: string | null;
  year_established: number | null;
  rejection_reason: string | null;
  logo_url?: string | null;
}

const PAGE_SIZE = 12;

const ClimateActorManagementContent = () => {
  const { toast } = useToast();
  const [actors, setActors] = useState<ClimateActor[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedActor, setSelectedActor] = useState<ClimateActor | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);


  useEffect(() => {
    loadActors();
  }, []);

  const loadActors = async () => {
    try {
      const { data, error } = await supabase
        .from('climate_actors')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading actors:', error);
        throw error;
      }
      
      console.log('Loaded actors:', data);
      setActors(data || []);
    } catch (error: any) {
      console.error('Error in loadActors:', error);
      toast({
        title: "Error",
        description: "Failed to load climate actors",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (actorId: string) => {
    setActionLoading(true);
    try {
      console.log('Approving actor:', actorId);
      
      const { error } = await supabase
        .from('climate_actors')
        .update({ 
          status: 'approved',
          approved_at: new Date().toISOString(),
          rejection_reason: null
        })
        .eq('id', actorId);

      if (error) {
        console.error('Error approving actor:', error);
        throw error;
      }

      toast({
        title: "Actor Approved",
        description: "Organization has been approved and added to the registry",
      });

      await loadActors();
    } catch (error: any) {
      console.error('Error in handleApprove:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to approve actor",
        variant: "destructive"
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async (actorId: string) => {
    if (!rejectionReason.trim()) {
      toast({
        title: "Error",
        description: "Please provide a reason for rejection",
        variant: "destructive"
      });
      return;
    }

    setActionLoading(true);
    try {
      console.log('Rejecting actor:', actorId, 'with reason:', rejectionReason);
      
      const { error } = await supabase
        .from('climate_actors')
        .update({ 
          status: 'rejected',
          rejection_reason: rejectionReason,
          approved_at: null
        })
        .eq('id', actorId);

      if (error) {
        console.error('Error rejecting actor:', error);
        throw error;
      }

      toast({
        title: "Actor Rejected",
        description: "Organization application has been rejected",
      });

      setRejectionReason('');
      await loadActors();
    } catch (error: any) {
      console.error('Error in handleReject:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to reject actor",
        variant: "destructive"
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (actorId: string) => {
    setActionLoading(true);
    try {
      console.log('Deleting actor:', actorId);
      
      const { error } = await supabase
        .from('climate_actors')
        .delete()
        .eq('id', actorId);

      if (error) {
        console.error('Error deleting actor:', error);
        throw error;
      }

      toast({
        title: "Organization Deleted",
        description: "Organization has been permanently removed",
      });

      await loadActors();
    } catch (error: any) {
      console.error('Error in handleDelete:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete organization",
        variant: "destructive"
      });
    } finally {
      setActionLoading(false);
    }
  };

  const exportToCSV = () => {
    const headers = [
      'Organization Name',
      'Actor Type',
      'Contact Name',
      'Contact Email',
      'Contact Phone',
      'Status',
      'Focus Areas',
      'LGA Operations',
      'Year Established',
      'Created At',
      'Approved At'
    ];

    const csvData = actors.map(actor => [
      actor.organization_name,
      actor.actor_type,
      actor.contact_name,
      actor.contact_email,
      actor.contact_phone,
      actor.status,
      actor.focus_areas.join('; '),
      actor.lga_operations.join('; '),
      actor.year_established || '',
      new Date(actor.created_at).toLocaleDateString(),
      actor.approved_at ? new Date(actor.approved_at).toLocaleDateString() : ''
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `climate-actors-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Export Successful",
      description: "Climate actors data has been exported to CSV",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const q = search.trim().toLowerCase();
  const filteredActors = actors.filter(actor => {
    const statusOk = filter === 'all' || actor.status === filter;
    if (!statusOk) return false;
    if (!q) return true;
    return [actor.organization_name, actor.contact_name, actor.contact_email]
      .filter(Boolean)
      .some((v: string) => v.toLowerCase().includes(q));
  });

  const totalPages = Math.max(1, Math.ceil(filteredActors.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageActors = filteredActors.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const stats = {
    total: actors.length,
    pending: actors.filter(a => a.status === 'pending').length,
    approved: actors.filter(a => a.status === 'approved').length,
    rejected: actors.filter(a => a.status === 'rejected').length
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-28 rounded-xl border border-border bg-muted/40 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-36 rounded-xl border border-border bg-muted/40 animate-pulse" />
          ))}
        </div>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-24 rounded-xl border border-border bg-muted/30 animate-pulse" />
        ))}
      </div>
    );
  }


  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Climate-Actor Management"
        description="Review, verify and publish organisations applying to the official Kano State climate-actor registry."
        breadcrumb={[{ label: 'Admin', to: '/admin/dashboard' }, { label: 'Climate Actors' }]}
        actions={
          <>
            <Button variant="outline" onClick={loadActors} className="gap-2">
              <RefreshCw className="h-4 w-4" /> Refresh
            </Button>
            <Button onClick={exportToCSV} className="gap-2">
              <Download className="h-4 w-4" /> Export CSV
            </Button>
          </>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <AdminStatCard label="Total Applications" value={stats.total} icon={Users} hint="All submissions" active={filter === 'all'} onClick={() => { setFilter('all'); setPage(1); }} />
        <AdminStatCard label="Pending Review" value={stats.pending} icon={Clock} tone="warning" hint="Awaiting decision" active={filter === 'pending'} onClick={() => { setFilter('pending'); setPage(1); }} />
        <AdminStatCard label="Approved" value={stats.approved} icon={CheckCircle} tone="success" hint="Live on registry" active={filter === 'approved'} onClick={() => { setFilter('approved'); setPage(1); }} />
        <AdminStatCard label="Rejected" value={stats.rejected} icon={XCircle} tone="danger" hint="Declined" active={filter === 'rejected'} onClick={() => { setFilter('rejected'); setPage(1); }} />
      </div>

      {/* Toolbar */}
      <Card>
        <CardContent className="p-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search organisation, contact or email…"
              className="pl-9"
            />
          </div>
          <Tabs value={filter} onValueChange={(v) => { setFilter(v); setPage(1); }}>
            <TabsList>
              <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
              <TabsTrigger value="pending">Pending ({stats.pending})</TabsTrigger>
              <TabsTrigger value="approved">Approved ({stats.approved})</TabsTrigger>
              <TabsTrigger value="rejected">Rejected ({stats.rejected})</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      {/* List */}
      {filteredActors.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-2 py-16 text-center">
            <Building2 className="h-8 w-8 text-muted-foreground/50" />
            <p className="font-medium">No organisations found</p>
            <p className="text-sm text-muted-foreground">Try a different filter or search term.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {pageActors.map((actor) => (
            <Card key={actor.id} className="group relative overflow-hidden transition-all hover:shadow-md hover:border-primary/30">
              <span className="absolute inset-y-0 left-0 w-0.5 bg-gradient-to-b from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardContent className="p-4 md:p-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-start gap-3 min-w-0">
                    <Avatar className="h-12 w-12 rounded-lg border border-border bg-background">
                      <AvatarImage src={actor.logo_url || undefined} alt={`${actor.organization_name} logo`} className="object-contain" />
                      <AvatarFallback className="rounded-lg bg-primary/10 text-primary text-sm font-semibold">
                        {actor.organization_name?.charAt(0)?.toUpperCase() || 'O'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold leading-tight truncate">{actor.organization_name}</h3>
                        {getStatusBadge(actor.status)}
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {actor.actor_type === 'state_actor' ? 'State Actor' : 'Non-State Actor'} · Applied {new Date(actor.created_at).toLocaleDateString()}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" />{actor.contact_email}</span>
                        <span className="flex items-center gap-1.5"><Target className="h-3.5 w-3.5" />{actor.focus_areas?.length || 0} focus areas</span>
                        <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{actor.lga_operations?.length || 0} LGAs</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    {actor.status === 'pending' && (
                      <Button size="sm" onClick={() => handleApprove(actor.id)} disabled={actionLoading} className="gap-1.5">
                        <CheckCircle className="h-4 w-4" /> Approve
                      </Button>
                    )}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedActor(actor)} className="gap-1.5">
                          <Eye className="h-4 w-4" /> Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>{actor.organization_name}</DialogTitle>
                          <DialogDescription>Application details & verification</DialogDescription>
                        </DialogHeader>

                        {selectedActor && (
                          <div className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label className="font-medium">Contact Person</Label>
                                <div className="flex items-center gap-2 text-sm"><Users className="h-4 w-4 text-muted-foreground" />{selectedActor.contact_name}</div>
                              </div>
                              <div className="space-y-2">
                                <Label className="font-medium">Email</Label>
                                <div className="flex items-center gap-2 text-sm"><Mail className="h-4 w-4 text-muted-foreground" />{selectedActor.contact_email}</div>
                              </div>
                              <div className="space-y-2">
                                <Label className="font-medium">Phone</Label>
                                <div className="flex items-center gap-2 text-sm"><Phone className="h-4 w-4 text-muted-foreground" />{selectedActor.contact_phone}</div>
                              </div>
                              {selectedActor.year_established && (
                                <div className="space-y-2">
                                  <Label className="font-medium">Year Established</Label>
                                  <div className="flex items-center gap-2 text-sm"><Calendar className="h-4 w-4 text-muted-foreground" />{selectedActor.year_established}</div>
                                </div>
                              )}
                            </div>

                            <div className="space-y-2">
                              <Label className="font-medium">Description</Label>
                              <p className="text-sm text-muted-foreground leading-relaxed">{selectedActor.description}</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label className="font-medium">Focus Areas</Label>
                                <div className="flex flex-wrap gap-1">
                                  {(selectedActor.focus_areas || []).map((area) => (
                                    <Badge key={area} variant="secondary" className="text-xs">{area}</Badge>
                                  ))}
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label className="font-medium">Operating LGAs</Label>
                                <div className="flex flex-wrap gap-1">
                                  {(selectedActor.lga_operations || []).map((lga) => (
                                    <Badge key={lga} variant="outline" className="text-xs">{lga}</Badge>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {selectedActor.status === 'pending' && (
                              <div className="flex flex-col gap-4 pt-4 border-t sm:flex-row">
                                <Button onClick={() => handleApprove(selectedActor.id)} disabled={actionLoading} className="flex-1">
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  {actionLoading ? 'Processing…' : 'Approve Application'}
                                </Button>
                                <div className="flex-1 space-y-2">
                                  <Textarea
                                    placeholder="Reason for rejection…"
                                    value={rejectionReason}
                                    onChange={(e) => setRejectionReason(e.target.value)}
                                    className="resize-none"
                                  />
                                  <Button
                                    variant="destructive"
                                    onClick={() => handleReject(selectedActor.id)}
                                    disabled={actionLoading || !rejectionReason.trim()}
                                    className="w-full"
                                  >
                                    <XCircle className="h-4 w-4 mr-2" />
                                    {actionLoading ? 'Processing…' : 'Reject Application'}
                                  </Button>
                                </div>
                              </div>
                            )}

                            {selectedActor.rejection_reason && (
                              <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
                                <Label className="font-medium text-destructive">Rejection Reason</Label>
                                <p className="mt-1 text-sm text-muted-foreground">{selectedActor.rejection_reason}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete this organisation?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This cannot be undone. "{actor.organization_name}" and all associated data will be permanently removed.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(actor.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Pagination */}
          <div className="flex flex-col items-center justify-between gap-3 pt-2 sm:flex-row">
            <p className="text-xs text-muted-foreground">
              Showing {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, filteredActors.length)} of {filteredActors.length}
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}>
                <ChevronLeft className="h-4 w-4" /> Previous
              </Button>
              <span className="text-xs text-muted-foreground tabular-nums">Page {currentPage} / {totalPages}</span>
              <Button variant="outline" size="sm" disabled={currentPage >= totalPages} onClick={() => setPage(currentPage + 1)}>
                Next <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


const ClimateActorManagement = () => {
  return (
    <AdminLayout>
      <ClimateActorManagementContent />
    </AdminLayout>
  );
};

export default ClimateActorManagement;
