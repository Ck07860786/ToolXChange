"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useUser, UserButton } from "@clerk/nextjs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { Plus, Search, List, ClipboardList, Clock, Edit, Trash, Loader2 } from "lucide-react";

export default function UserDashboard() {
  const { user } = useUser();
  const [tools, setTools] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    availability: true,
    rentalRate: "",
    status:"",
  });
  const [files, setFiles] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };
  const handleFiles = (e) => setFiles(e.target.files);

  // Submit create or update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editing) {
        const res = await fetch(`/api/tools/${editing._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        });
        if (res.ok) {
          const { tool } = await res.json();
          setTools(prev => prev.map(t => t._1=== tool._id ? tool : t));

          
          
        }
      } else {
        const formData = new FormData();
        formData.append('ownerId', user?.id);
        formData.append('name', form.name);
        formData.append('description', form.description);
        formData.append('availability', String(form.availability));
        formData.append('status', String(form.status));
        formData.append('rentalRate', form.rentalRate);
        Array.from(files).forEach(file => formData.append('images', file));
        const res = await fetch('/api/tools/new-tool/create', { method: 'POST', body: formData });
        if (res.ok) {
          const { tool } = await res.json();
          setTools(prev => [...prev, tool]);
        }
      }
      setOpen(false);
      setEditing(null);
      setFiles([]);
      await fetchTools();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };


  
    const fetchTools = useCallback(async () => {
      if (!user) return;
      const res = await fetch(`/api/tools?ownerId=${user.id}`);
      if (res.ok) {
        const data = await res.json();
        setTools(data.tools);
      }
    }, [user]);

    useEffect(() => { fetchTools(); }, [fetchTools]);

  const openForm = (tool) => {
    if (tool) {
      setEditing(tool);
      setForm({ name: tool.name, description: tool.description, availability: tool.availability, rentalRate: tool.rentalRate });
    } else {
      setEditing(null);
      setForm({ name: '', description: '', availability: true, rentalRate: '' });
    }
    setOpen(true);
  };



// Prepare delete
const handleDeleteClick = (id) => {
  setDeleteId(id);
  setConfirmOpen(true);
};

  // Confirm delete
  const confirmDelete = async () => {
    const res = await fetch(`/api/tools/${deleteId}`, { method: 'DELETE' });
    if (res.ok) setTools(prev => prev.filter(t => t._id !== deleteId));
    setConfirmOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <Input placeholder="Search tools..." className="max-w-xs" icon={<Search size={20} />} />
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <List size={20} />
                My Listings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{tools.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList size={20} />
                Borrowed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">0</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock size={20} />
                Pending Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">0</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus size={20} />
                Share a Tool
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <Plus size={16} className="mr-2" />
                    Add New Tool
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-white p-6 rounded-lg">
                  <DialogHeader>
                    <DialogTitle>Post a New Tool</DialogTitle>
                    <DialogDescription>Fill out the form to share your tool with the community.</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" name="name" value={form.name} onChange={handleChange} required />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea id="description" name="description" value={form.description} onChange={handleChange} required />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="availability"
                        name="availability"
                        checked={form.availability}
                        onCheckedChange={(checked) =>
                          setForm((prev) => ({ ...prev, availability: checked }))
                        }
                      />
                      <Label htmlFor="availability">Available to Rent</Label>
                    </div>
                    <div>
                      <Label htmlFor="rentalRate">Rental Rate (per day)</Label>
                      <Input
                        id="rentalRate"
                        name="rentalRate"
                        type="number"
                        value={form.rentalRate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="images">Images</Label>
                      <Input
                        id="images"
                        name="images"
                        type="file"
                        accept="image/*"
                        onChange={handleFiles}
                        multiple
                      />
                    </div>
                    <DialogFooter>
                      <Button type="submit">Submit</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for Tools */}
        <Tabs defaultValue="active-listings" className="space-y-4">
          <TabsList><TabsTrigger value="active-listings">My Tools</TabsTrigger><TabsTrigger value="pending-requests">Requests</TabsTrigger><TabsTrigger value="history">History</TabsTrigger></TabsList>
          <TabsContent value="active-listings">
            <Table>
              <TableHeader><TableRow><TableHead>Tool</TableHead><TableHead>Status</TableHead><TableHead>Available</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
              <TableBody>
                {tools.map(tool => (
                  <TableRow key={tool._id}>
                    <TableCell>{tool.name}</TableCell>
                    <TableCell>{tool.status}</TableCell>
                    <TableCell>{tool.availability ? 'Yes' : 'No'}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="ghost" onClick={() => openForm(tool)}><Edit size={16} /></Button>
                      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="destructive" className="ml-2" onClick={() => handleDeleteClick(tool._id)}><Trash size={16} /></Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Tool</AlertDialogTitle>
                            <AlertDialogDescription>Are you sure you want to delete this tool? This action cannot be undone.</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className=' bg-red-500' onClick={confirmDelete}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="pending-requests"><p>No pending requests at the moment.</p></TabsContent>
          <TabsContent value="history"><p>Borrow/Share history will appear here.</p></TabsContent>
        </Tabs>
        <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-white p-6 rounded-lg">
          <DialogHeader>
            <DialogTitle>{editing ? 'Edit Tool' : 'Post a New Tool'}</DialogTitle>
            <DialogDescription>Fill out the form to share your tool with the community.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div><Label htmlFor="name">Name</Label><Input id="name" name="name" value={form.name} onChange={handleChange} required/></div>
            <div><Label htmlFor="description">Description</Label><Textarea id="description" name="description" value={form.description} onChange={handleChange} required/></div>
            <div className="flex items-center space-x-2"><Checkbox id="availability" name="availability" checked={form.availability} onCheckedChange={checked => setForm(prev => ({...prev, availability: checked}))}/><Label htmlFor="availability">Available to Rent</Label></div>
            <div><Label htmlFor="rentalRate">Rental Rate (per day)</Label><Input id="rentalRate" name="rentalRate" type="number" value={form.rentalRate} onChange={handleChange} required/></div>
            <div><Label htmlFor="images">Images</Label><Input id="images" name="images" type="file" accept="image/*" onChange={handleFiles} multiple/></div>
            <DialogFooter><Button disabled={isSubmitting} type="submit"> {isSubmitting && <Loader2 className="animate-spin mr-2" />}
            {editing ? 'Update' : 'Submit'}</Button></DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      </main>
    </div>
  );
}
