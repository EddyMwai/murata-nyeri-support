import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const Dashboard = () => {
  const { user, profile, signOut } = useAuth();

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin': return 'destructive';
      case 'counselor': return 'secondary';
      default: return 'default';
    }
  };

  const getWelcomeMessage = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Manage users, content, and system settings from your admin dashboard.';
      case 'counselor':
        return 'Access counseling tools and support resources for your clients.';
      default:
        return 'Begin your journey with culturally grounded rehabilitation support.';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-secondary/20">
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-primary">Murata Dashboard</h1>
            <p className="text-sm text-muted-foreground">Welcome back, {profile?.full_name || user?.email}</p>
          </div>
          <div className="flex items-center gap-4">
            {profile && (
              <Badge variant={getRoleBadgeVariant(profile.role)} className="capitalize">
                {profile.role}
              </Badge>
            )}
            <Button variant="outline" onClick={signOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-full">
            <CardHeader>
              <CardTitle>Welcome to Murata</CardTitle>
              <CardDescription>
                {profile && getWelcomeMessage(profile.role)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-secondary/50 p-4 rounded-lg">
                  <p className="text-sm font-medium mb-2">Today's Proverb</p>
                  <p className="text-foreground italic">
                    "Mũndũ ũtarĩ ngwatanĩro ndangĩrũgamĩra andũ"
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    (A person without unity cannot lead people)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {profile?.role === 'admin' && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Manage system users and roles</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" disabled>
                    Manage Users
                    <span className="text-xs ml-2">(Coming Soon)</span>
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Content Management</CardTitle>
                  <CardDescription>Manage proverbs and stories</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" disabled>
                    Manage Content
                    <span className="text-xs ml-2">(Coming Soon)</span>
                  </Button>
                </CardContent>
              </Card>
            </>
          )}

          {profile?.role === 'counselor' && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Client Sessions</CardTitle>
                  <CardDescription>View and manage client sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" disabled>
                    View Sessions
                    <span className="text-xs ml-2">(Coming Soon)</span>
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Resources</CardTitle>
                  <CardDescription>Access counseling resources</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" disabled>
                    View Resources
                    <span className="text-xs ml-2">(Coming Soon)</span>
                  </Button>
                </CardContent>
              </Card>
            </>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Chat with Murata</CardTitle>
              <CardDescription>Start a conversation with your AI counselor</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" disabled>
                Start Chat
                <span className="text-xs ml-2">(Coming Soon)</span>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Progress Tracking</CardTitle>
              <CardDescription>View your rehabilitation progress</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" disabled>
                View Progress
                <span className="text-xs ml-2">(Coming Soon)</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};