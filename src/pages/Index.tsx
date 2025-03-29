
import React from "react";
import NumberTranslator from "../components/NumberTranslator";
import Navigation from "../components/Navigation";

const Index = () => {
  return (
    // Use white background for the whole page now, consistent with nav change
    <div className="min-h-screen bg-white flex flex-col">
      <Navigation />
      {/* Use a max-width container, add standard padding */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-8 md:py-12">
        <NumberTranslator />
      </main>
    </div>
  );
};

export default Index;
