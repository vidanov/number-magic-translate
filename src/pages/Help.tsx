import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import { useTranslation } from 'react-i18next'; // Import useTranslation

const Help: React.FC = () => {
  const { t } = useTranslation(); // Get the t function

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/50 flex flex-col">
      <Navigation />

      <div className="container max-w-4xl mx-auto px-4 py-8 flex-grow">
        <div className="glass rounded-2xl p-6 sm:p-8 mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gradient mb-6">
            {t('help.majorSystem.title')} {/* Translate title */}
          </h1>

          <section className="mb-10 prose prose-slate max-w-none">
            <h2 className="text-2xl font-semibold text-foreground mb-4">{t('help.majorSystem.whatIsIt.heading')}</h2>

            <p className="text-base text-foreground/90 mb-4">
              {t('help.majorSystem.whatIsIt.p1')}
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">{t('help.majorSystem.howItWorks.heading')}</h3>

            <p className="text-base text-foreground/90 mb-4">
              {t('help.majorSystem.howItWorks.p1')}
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3">{t('help.benefits.heading')}</h3>

            <ul className="list-disc pl-6 mb-6 space-y-1">
              <li><strong>{t('help.benefits.item1.title')}</strong>: {t('help.benefits.item1.desc')}</li>
              <li><strong>{t('help.benefits.item2.title')}</strong>: {t('help.benefits.item2.desc')}</li>
              <li><strong>{t('help.benefits.item3.title')}</strong>: {t('help.benefits.item3.desc')}</li>
              <li><strong>{t('help.benefits.item4.title')}</strong>: {t('help.benefits.item4.desc')}</li>
              <li><strong>{t('help.benefits.item5.title')}</strong>: {t('help.benefits.item5.desc')}</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mb-3">{t('help.practicalUses.heading')}</h3>

            <p className="text-base text-foreground/90">
              {t('help.practicalUses.p1')}
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-1">
              <li>{t('help.practicalUses.item1')}</li>
              <li>{t('help.practicalUses.item2')}</li>
              <li>{t('help.practicalUses.item3')}</li>
              <li>{t('help.practicalUses.item4')}</li>
              <li>{t('help.practicalUses.item5')}</li>
            </ul>
          </section>

          <div className="mt-8 flex justify-center">
            <Link
              to="/"
              className="px-5 py-2.5 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-colors"
            >
              {t('help.tryItButton')} {/* Translate button */}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
