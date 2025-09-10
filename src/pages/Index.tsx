import { AimTrainer } from "@/components/AimTrainer";

const Index = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center py-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Professional <span className="text-primary">Aim Training</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Improve your gaming accuracy and reaction time with our scientifically-designed training modes. 
          Used by thousands of gamers worldwide to enhance their FPS skills.
        </p>
      </div>
      <AimTrainer />
    </div>
  );
};

export default Index;
