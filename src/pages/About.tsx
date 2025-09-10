import { Target, Zap, Award, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  const features = [
    {
      icon: Target,
      title: "Precision Training",
      description: "Advanced aim training algorithms designed to improve your accuracy and muscle memory through consistent practice."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized for minimal input lag and maximum responsiveness. Every millisecond counts in competitive gaming."
    },
    {
      icon: Award,
      title: "Progress Tracking",
      description: "Comprehensive statistics and leaderboards to track your improvement over time and compete with others."
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Built by gamers, for gamers. Our training methods are based on proven techniques used by esports professionals."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About <span className="text-primary">AimTrainer Pro</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            The premier aim training platform trusted by thousands of gamers worldwide. 
            Improve your aim, reaction time, and gaming performance with scientifically-backed training methods.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose AimTrainer Pro?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <feature.icon className="h-8 w-8 text-primary" />
                    <CardTitle>{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-card">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Training Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">95%</div>
              <div className="text-muted-foreground">Average Accuracy Improvement</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">150ms</div>
              <div className="text-muted-foreground">Reaction Time Reduction</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50K+</div>
              <div className="text-muted-foreground">Training Sessions Completed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Our Mission</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We believe that every gamer deserves access to professional-grade training tools. 
            AimTrainer Pro was created to democratize aim training, providing the same techniques 
            used by esports professionals to gamers of all skill levels. Our platform combines 
            cutting-edge technology with proven training methodologies to help you reach your 
            gaming potential.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;