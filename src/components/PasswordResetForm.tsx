import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, ArrowLeft, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PasswordResetFormProps {
  onBack: () => void;
  onClose: () => void;
}

const PasswordResetForm = ({ onBack, onClose }: PasswordResetFormProps) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Placeholder for password reset logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsEmailSent(true);
      toast({
        title: "Reset link sent",
        description: "Check your email for password reset instructions.",
      });
    } catch (err) {
      setError("Failed to send reset email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isEmailSent) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-warm border-0 bg-gradient-to-br from-card to-accent/10">
          <CardHeader className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-accent/20 rounded-full flex items-center justify-center">
              <Mail className="h-8 w-8 text-accent-foreground" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-foreground">Check Your Email</CardTitle>
              <CardDescription className="text-muted-foreground">
                We've sent a password reset link to {email}
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Follow the instructions in the email to reset your password. 
              The link will expire in 1 hour for security reasons.
            </p>
            <p className="text-xs text-muted-foreground">
              Didn't receive the email? Check your spam folder or try again.
            </p>
          </CardContent>

          <CardFooter className="flex flex-col space-y-3">
            <Button
              onClick={() => setIsEmailSent(false)}
              variant="outline"
              className="w-full border-accent text-accent hover:bg-accent/5"
            >
              Send Another Email
            </Button>
            <button
              onClick={onClose}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Back to Login
            </button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-warm border-0 bg-gradient-to-br from-card to-accent/10">
        <CardHeader className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-accent/20 rounded-full flex items-center justify-center">
            <Heart className="h-8 w-8 text-accent-foreground" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-foreground">Reset Password</CardTitle>
            <CardDescription className="text-muted-foreground">
              We'll send you a link to reset your password
            </CardDescription>
          </div>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {error && (
              <Alert className="border-destructive/50 bg-destructive/10">
                <AlertDescription className="text-destructive">{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground font-medium">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 border-border focus:ring-accent"
                  required
                />
              </div>
            </div>

            <div className="text-sm text-muted-foreground space-y-2">
              <p>Enter the email address associated with your account and we'll send you a link to reset your password.</p>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full bg-gradient-wisdom shadow-gentle hover:shadow-lg transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </Button>

            <div className="flex items-center justify-center space-x-2">
              <ArrowLeft className="h-4 w-4 text-muted-foreground" />
              <button
                type="button"
                onClick={onBack}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Back to Login
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Cancel
            </button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default PasswordResetForm;