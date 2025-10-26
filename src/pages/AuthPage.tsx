import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

interface AuthPageProps {
  activeTab?: 'login' | 'signup' | 'reset';
}
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoginForm } from '@/components/LoginForm';
import { SignupForm } from '@/components/SignupForm';
import { PasswordResetForm } from '@/components/PasswordResetForm';
import { useAuth } from '@/contexts/AuthContext';

export const AuthPage: React.FC<AuthPageProps> = ({ activeTab = 'login' }) => {
  const [tab, setTab] = useState<'login' | 'signup' | 'reset'>(activeTab);
  const { user, loading } = useAuth();

  // Only redirect after successful authentication, not on initial load
  // Remove unconditional redirect to dashboard

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-secondary/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Murata</h1>
          <p className="text-muted-foreground">Culturally Grounded Rehabilitation Support</p>
        </div>
        <Card className="backdrop-blur-sm bg-card/95 shadow-xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome</CardTitle>
            <CardDescription>
              Access your rehabilitation support platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={tab} onValueChange={setTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
                <TabsTrigger value="reset">Reset</TabsTrigger>
              </TabsList>
              <TabsContent value="login" className="mt-6">
                <LoginForm />
              </TabsContent>
              <TabsContent value="signup" className="mt-6">
                <SignupForm />
              </TabsContent>
              <TabsContent value="reset" className="mt-6">
                <PasswordResetForm />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground italic">
            "Mũtumia ũtarĩ kĩhooto ndangĩrũgamĩra mũthuri" <br />
            <span className="text-xs">(A person without wisdom cannot lead)</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;