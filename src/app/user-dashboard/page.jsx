"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { UserButton, useUser } from "@clerk/clerk-react";
import { Plus, Search, List, ClipboardList, Clock } from "lucide-react";

export default function UserDashboard() {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <Input
            placeholder="Search tools..."
            className="max-w-xs"
            icon={<Search size={20} />}
          />
          <UserButton />
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
              <p className="text-3xl font-bold">12</p>
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
              <p className="text-3xl font-bold">4</p>
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
              <p className="text-3xl font-bold">3</p>
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
              <Button variant="outline" className="w-full">
                <Plus size={16} className="mr-2" />
                Add New Tool
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for Tools */}
        <Tabs defaultValue="active-listings" className="space-y-4">
          <TabsList>
            <TabsTrigger value="active-listings">My Tools</TabsTrigger>
            <TabsTrigger value="pending-requests">Requests</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="active-listings">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tool</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Available</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Example row */}
                <TableRow>
                  <TableCell>Electric Drill</TableCell>
                  <TableCell>Available</TableCell>
                  <TableCell>Yes</TableCell>
                  <TableCell>
                    <Button size="sm" variant="ghost">Edit</Button>
                    <Button size="sm" variant="destructive" className="ml-2">Remove</Button>
                  </TableCell>
                </TableRow>
                {/* Map your real data here */}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="pending-requests">
            <p>No pending requests at the moment.</p>
          </TabsContent>

          <TabsContent value="history">
            <p>Borrow/Share history will appear here.</p>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}


