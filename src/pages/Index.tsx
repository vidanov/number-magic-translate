
import React from "react";
import NumberTranslator from "../components/NumberTranslator";
import Navigation from "../components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/50 flex flex-col">
      <Navigation />
      <div className="flex-grow flex flex-col items-center justify-center py-10">
        <NumberTranslator />
      </div>
    </div>
  );
};

export default Index;
