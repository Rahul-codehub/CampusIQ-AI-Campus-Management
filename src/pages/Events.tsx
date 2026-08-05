import { useEffect, useState } from "react";
import { dbApi } from "@/integrations/mongodb/api";
import { useAuth } from "@/contexts/AuthContext";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, MapPin, Clock } from "lucide-react";

const Events = () => {
  const { user, hasRole } = useAuth();
  const canManageEvents = hasRole("admin") || hasRole("faculty");
  const [events, setEvents] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", event_date: "", location: "", category: "general", organizer: "", max_participants: "" });

  const fetchData = async () => {
    try {
      setEvents(await dbApi.list("events", { sort: "event_date:asc" }));
    } catch (error: any) {
      toast.error(error.message || "Unable to load events.");
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    try {
      await dbApi.insert("events", {
        title: form.title, description: form.description || null,
        event_date: new Date(form.event_date).toISOString(),
        location: form.location || null, category: form.category,
        organizer: form.organizer || null,
        max_participants: form.max_participants ? parseInt(form.max_participants) : null,
        created_by: user.id,
      });
      toast.success("Event created!");
      setOpen(false);
      fetchData();
    } catch (error: any) {
      toast.error(error.message || "Unable to create event.");
    }
  };

  const isFuture = (d: string) => new Date(d) > new Date();

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Events</h1>
            <p className="text-muted-foreground">Campus events and activities</p>
          </div>
          {canManageEvents && (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild><Button><Plus className="w-4 h-4 mr-2" />Create Event</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Create Event</DialogTitle></DialogHeader>
                <form onSubmit={handleAdd} className="space-y-4">
                  <div className="space-y-2"><Label>Title</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></div>
                  <div className="space-y-2"><Label>Description</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>Date & Time</Label><Input type="datetime-local" value={form.event_date} onChange={(e) => setForm({ ...form, event_date: e.target.value })} required /></div>
                    <div className="space-y-2"><Label>Location</Label><Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {["academic", "cultural", "sports", "workshop", "seminar", "general"].map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2"><Label>Organizer</Label><Input value={form.organizer} onChange={(e) => setForm({ ...form, organizer: e.target.value })} /></div>
                  </div>
                  <Button type="submit" className="w-full">Create Event</Button>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {events.length === 0 && <Card className="md:col-span-2"><CardContent className="py-12 text-center text-muted-foreground">No events yet.</CardContent></Card>}
          {events.map((ev) => (
            <Card key={ev.id} className="border-border hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <Badge variant={isFuture(ev.event_date) ? "default" : "secondary"}>
                    {isFuture(ev.event_date) ? "Upcoming" : "Past"}
                  </Badge>
                  <Badge variant="outline">{ev.category}</Badge>
                </div>
                <h3 className="font-semibold text-lg mb-2">{ev.title}</h3>
                {ev.description && <p className="text-sm text-muted-foreground mb-3">{ev.description}</p>}
                <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{new Date(ev.event_date).toLocaleString()}</span>
                  {ev.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{ev.location}</span>}
                  {ev.organizer && <span>By {ev.organizer}</span>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Events;
