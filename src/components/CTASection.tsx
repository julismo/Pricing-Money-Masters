import { ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CTASection() {
  return (
    <section className="animate-fade-in-up rounded-2xl bg-gradient-to-br from-primary to-primary/80 p-8 text-center md:p-12">
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-4 text-2xl font-bold text-primary-foreground md:text-3xl">
          Números não mentem.
        </h2>
        <p className="mb-8 text-lg text-primary-foreground/90">
          Recupere esse valor agora.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            variant="accent"
            size="xl"
            className="w-full sm:w-auto"
            onClick={() => console.log('CTA Clicked')} // TODO: Add real link
          >
            <MessageCircle className="h-5 w-5" />
            Automatizar Agora
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
