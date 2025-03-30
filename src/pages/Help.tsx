import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import { useTranslation } from 'react-i18next';
import { languages } from "../utils/numToCodes";

const Help: React.FC = () => {
  const { t, i18n } = useTranslation();

  const renderTranslationTable = (language: typeof languages[0]) => {
    const numbers = Object.keys(language.dictionary).sort((a, b) => parseInt(a) - parseInt(b));
    
    return (
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-accent/20">
              <th className="px-2 py-1 text-left font-medium text-accent">Number</th>
              <th className="px-2 py-1 text-left font-medium text-accent">Word</th>
            </tr>
          </thead>
          <tbody>
            {numbers.map((num) => (
              <tr key={num} className="border-b border-gray-100 last:border-0">
                <td className="px-2 py-1.5 font-mono text-accent/90">{num}</td>
                <td className="px-2 py-1.5 font-medium">{language.dictionary[num]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Get the current language
  const currentLangCode = i18n.language.split('-')[0];
  const currentLanguage = languages.find(lang => lang.id === currentLangCode) || languages[0];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navigation />

      <div className="container max-w-4xl mx-auto px-4 py-8 flex-grow">
        <div className="bg-white rounded-2xl p-6 sm:p-8 mb-8 shadow-sm">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
            {t('help.majorSystem.title')}
          </h1>

          <section className="mb-10 prose prose-slate max-w-none">
            <h2 className="text-2xl font-semibold text-foreground mb-4">{t('help.majorSystem.whatIsIt.heading')}</h2>

            <p className="text-base text-muted-foreground mb-4">
              {t('help.majorSystem.whatIsIt.p1')}
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">{t('help.majorSystem.howItWorks.heading')}</h3>

            <p className="text-base text-muted-foreground mb-4">
              {t('help.majorSystem.howItWorks.p1')}
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3">{t('help.benefits.heading')}</h3>

            <ul className="list-disc pl-6 mb-6 space-y-1 text-muted-foreground">
              <li><strong className="text-foreground">{t('help.benefits.item1.title')}</strong>: {t('help.benefits.item1.desc')}</li>
              <li><strong className="text-foreground">{t('help.benefits.item2.title')}</strong>: {t('help.benefits.item2.desc')}</li>
              <li><strong className="text-foreground">{t('help.benefits.item3.title')}</strong>: {t('help.benefits.item3.desc')}</li>
              <li><strong className="text-foreground">{t('help.benefits.item4.title')}</strong>: {t('help.benefits.item4.desc')}</li>
              <li><strong className="text-foreground">{t('help.benefits.item5.title')}</strong>: {t('help.benefits.item5.desc')}</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mb-3">{t('help.practicalUses.heading')}</h3>

            <p className="text-base text-muted-foreground">
              {t('help.practicalUses.p1')}
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-1 text-muted-foreground">
              <li>{t('help.practicalUses.item1')}</li>
              <li>{t('help.practicalUses.item2')}</li>
              <li>{t('help.practicalUses.item3')}</li>
              <li>{t('help.practicalUses.item4')}</li>
              <li>{t('help.practicalUses.item5')}</li>
            </ul>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Translation Table</h2>
            <div className="bg-secondary/50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">{currentLanguage.name}</h3>
              {renderTranslationTable(currentLanguage)}
            </div>
          </section>

          <div className="flex justify-center mt-8">
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              {t('help.tryItButton')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
