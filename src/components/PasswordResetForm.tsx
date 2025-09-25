import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, Heart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { z } from "zod";

const resetSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export const PasswordResetForm = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const validatedData = resetSchema.parse({ email });
      const { error } = await resetPassword(validatedData.email);
      
      if (error) {
        setErrors({ submit: error.message });
      } else {
        setIsEmailSent(true);
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: { [key: string]: string } = {};
        err.issues.forEach((issue) => {
          if (issue.path && issue.path.length > 0) {
            fieldErrors[String(issue.path[0])] = issue.message;
          }
        });
        setErrors(fieldErrors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isEmailSent) {
    return (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto bg-accent/20 rounded-full flex items-center justify-center">
          <Mail className="h-8 w-8 text-accent-foreground" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Check Your Email</h3>
          <p className="text-sm text-muted-foreground">
            We've sent a password reset link to {email}
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          Follow the instructions in the email to reset your password. 
          The link will expire in 1 hour for security reasons.
        </p>
        <Button
          onClick={() => setIsEmailSent(false)}
          variant="outline"
          className="w-full"
        >
          Send Another Email
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.submit && (
        <Alert className="border-destructive/50 bg-destructive/10">
          <AlertDescription className="text-destructive">{errors.submit}</AlertDescription>
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
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email}</p>
        )}
      </div>

      <div className="text-sm text-muted-foreground">
        <p>Enter the email address associated with your account and we'll send you a link to reset your password.</p>
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-wisdom shadow-gentle hover:shadow-lg transition-all duration-300"
        disabled={isLoading}
      >
        {isLoading ? "Sending..." : "Send Reset Link"}
      </Button>
    </form>
  );
};

export default PasswordResetForm;