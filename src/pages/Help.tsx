
import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";

const Help: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/50 flex flex-col">
      <Navigation />
      
      <div className="container max-w-4xl mx-auto px-4 py-8 flex-grow">
        <div className="glass rounded-2xl p-6 sm:p-8 mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gradient mb-6">
            Understanding the Major System
          </h1>
          
          <section className="mb-10 prose prose-slate max-w-none">
            <h2 className="text-2xl font-semibold text-foreground mb-4">What is the Major System?</h2>
            
            <p className="text-base text-foreground/90 mb-4">
              The Major System (also called the Major Method or phonetic number system) is a mnemonic technique used to aid in memorizing numbers. 
              It works by converting numbers into consonant sounds, then into words by adding vowels.
            </p>
            
            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">How the System Works</h3>
            
            <p className="text-base text-foreground/90 mb-4">
              Each digit from 0-9 is associated with specific consonant sounds:
            </p>
            
            <ul className="list-disc pl-6 mb-6 space-y-1">
              <li><strong>0</strong>: "s", "z" - Sounds like "z" has zero voiced consonants</li>
              <li><strong>1</strong>: "t", "d" - Letter "t" has one downstroke</li>
              <li><strong>2</strong>: "n" - Letter "n" has two downstrokes</li>
              <li><strong>3</strong>: "m" - Letter "m" has three downstrokes</li>
              <li><strong>4</strong>: "r" - Last letter of "four"</li>
              <li><strong>5</strong>: "l" - Roman numeral "L" = 50</li>
              <li><strong>6</strong>: "j", "sh", "ch" - Letter "j" reversed looks like 6</li>
              <li><strong>7</strong>: "k", "g" - Letter "k" contains two 7s</li>
              <li><strong>8</strong>: "f", "v" - Cursive "f" looks like 8</li>
              <li><strong>9</strong>: "p", "b" - Letter "p" is mirror image of 9</li>
            </ul>
            
            <h3 className="text-xl font-semibold text-foreground mb-3">Russian System (БЦК - Буквенно-Цифровой Код)</h3>
            
            <p className="text-base text-foreground/90 mb-4">
              In the Russian system, known as БЦК (Буквенно-Цифровой Код or Letter-Numerical Code), a similar approach is used but adapted to the Cyrillic alphabet:
            </p>
            
            <ul className="list-disc pl-6 mb-6 space-y-1">
              <li><strong>0</strong>: "Н", "М" (N, M)</li>
              <li><strong>1</strong>: "Г", "Ж" (G, ZH)</li>
              <li><strong>2</strong>: "Д", "Т" (D, T)</li>
              <li><strong>3</strong>: "К", "Х" (K, KH)</li>
              <li><strong>4</strong>: "Ч", "Щ" (CH, SHCH)</li>
              <li><strong>5</strong>: "П", "Б" (P, B)</li>
              <li><strong>6</strong>: "Ш", "Л" (SH, L)</li>
              <li><strong>7</strong>: "С", "З" (S, Z)</li>
              <li><strong>8</strong>: "В", "Ф" (V, F)</li>
              <li><strong>9</strong>: "Р", "Ц" (R, TS)</li>
            </ul>
            
            <h3 className="text-xl font-semibold text-foreground mb-3">Benefits of Using the Major System</h3>
            
            <ul className="list-disc pl-6 mb-6 space-y-1">
              <li><strong>Enhanced Memory</strong>: Converts abstract numbers into concrete, visualizable words</li>
              <li><strong>Long-term Retention</strong>: Images created from words are easier to remember than sequences of digits</li>
              <li><strong>Faster Learning</strong>: Memorize long number sequences in significantly less time</li>
              <li><strong>Mental Exercise</strong>: Provides excellent mental workout and can improve overall cognitive function</li>
              <li><strong>Practical Applications</strong>: Useful for remembering phone numbers, PINs, important dates, and historical facts</li>
            </ul>
            
            <h3 className="text-xl font-semibold text-foreground mb-3">Practical Uses</h3>
            
            <p className="text-base text-foreground/90">
              Memory athletes use this system to memorize:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-1">
              <li>Pi to thousands of digits</li>
              <li>Long credit card numbers</li>
              <li>Phone directories</li>
              <li>Historical dates</li>
              <li>Mathematical constants</li>
            </ul>
          </section>
          
          <div className="mt-8 flex justify-center">
            <Link
              to="/"
              className="px-5 py-2.5 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-colors"
            >
              Try It Yourself
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
