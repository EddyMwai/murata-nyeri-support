import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, BookOpen, ChevronRight } from "lucide-react";

const kikuyuProverbs = [
  {
    kikuyu: "Mũtĩ ndũrũgagwo na kĩhoto kĩa mũruhí.",
    english: "A tree is not bent by its own shadow.",
    meaning: "Don't let your past struggles define your future."
  },
  {
    kikuyu: "Mũndũ ni mũndũ nĩ ũndũ wa andũ.",
    english: "A person is a person because of other people.",
    meaning: "We heal together through community support."
  },
  {
    kikuyu: "Kĩrĩa kĩmenyetwo nĩ kĩria kĩrekĩre.",
    english: "What is known is what has passed.",
    meaning: "Learn from the past but don't live in it."
  },
  {
    kikuyu: "Mũkuũ ndaguĩte ũhoro ũgatigwo.",
    english: "An old person has heard stories that were left behind.",
    meaning: "Wisdom from elders guides our healing journey."
  }
];

const LandingPage = () => {
  const [currentProverb, setCurrentProverb] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProverb((prev) => (prev + 1) % kikuyuProverbs.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-secondary/20">
      {/* Header */}
      <header className="px-6 py-4 bg-card/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">Murata</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/auth?tab=login')}
            >
              Sign In
            </Button>
            <Button
              variant="default"
              className="bg-gradient-primary shadow-warm"
              onClick={() => navigate('/auth?tab=signup')}
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Healing Through
                  <span className="block bg-gradient-primary bg-clip-text text-transparent">
                    Cultural Wisdom
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  A culturally grounded rehabilitation platform that combines Kikuyu wisdom, 
                  traditional proverbs, and modern support systems to guide your journey to recovery.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-primary shadow-warm hover:shadow-lg transition-all duration-300"
                >
                  Start Your Journey
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-primary text-primary hover:bg-primary/5"
                >
                  Learn More
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Lives Touched</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-muted-foreground">Support Available</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">95%</div>
                  <div className="text-sm text-muted-foreground">Success Rate</div>
                </div>
              </div>
            </div>

            {/* Right Column - Proverb Card */}
            <div className="flex justify-center">
              <Card className="w-full max-w-md bg-gradient-healing shadow-gentle border-0 overflow-hidden">
                <CardContent className="p-8 text-center space-y-6">
                  <div className="w-16 h-16 mx-auto bg-accent/20 rounded-full flex items-center justify-center">
                    <BookOpen className="h-8 w-8 text-accent" />
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-lg font-medium text-foreground italic">
                      "{kikuyuProverbs[currentProverb].kikuyu}"
                    </p>
                    <p className="text-base text-muted-foreground">
                      {kikuyuProverbs[currentProverb].english}
                    </p>
                    <p className="text-sm text-secondary-foreground font-medium">
                      {kikuyuProverbs[currentProverb].meaning}
                    </p>
                  </div>

                  <div className="flex justify-center space-x-2">
                    {kikuyuProverbs.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentProverb ? 'bg-accent' : 'bg-muted'
                        }`}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="px-6 py-16 bg-card/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-foreground">
              Healing Through Community & Culture
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform combines traditional Kikuyu wisdom with modern therapeutic approaches
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 hover:shadow-gentle transition-shadow duration-300">
              <CardContent className="space-y-4">
                <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Cultural Stories</h3>
                <p className="text-muted-foreground">
                  Learn from Kikuyu proverbs, stories, and traditional wisdom that guides healing
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-gentle transition-shadow duration-300">
              <CardContent className="space-y-4">
                <div className="w-12 h-12 mx-auto bg-secondary/20 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-secondary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Community Support</h3>
                <p className="text-muted-foreground">
                  Connect with counselors and peers who understand your cultural background
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-gentle transition-shadow duration-300">
              <CardContent className="space-y-4">
                <div className="w-12 h-12 mx-auto bg-accent/20 rounded-lg flex items-center justify-center">
                  <Heart className="h-6 w-6 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Personalized Care</h3>
                <p className="text-muted-foreground">
                  AI-powered support tailored to your journey and cultural context
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;