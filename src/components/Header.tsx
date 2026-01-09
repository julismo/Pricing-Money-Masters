import { Phone, TrendingUp } from 'lucide-react';

export function Header() {
  return (
    <header className="relative overflow-hidden bg-primary py-16 md:py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="container relative">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-accent/20 px-4 py-2 text-sm font-medium text-accent">
            <TrendingUp className="h-4 w-4" />
            Calculadora de ROI - Sistema Automático
          </div>

          {/* Main heading */}
          <h1 className="mb-6 text-3xl font-extrabold leading-tight tracking-tight text-primary-foreground md:text-5xl lg:text-6xl">
            Estás a perder dinheiro cada vez que o{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-accent">telefone toca</span>
              <Phone className="absolute -right-8 -top-2 h-6 w-6 animate-pulse text-accent md:-right-10 md:h-8 md:w-8" />
            </span>
            ?
          </h1>

          {/* Subheading */}
          <p className="mx-auto max-w-2xl text-lg text-primary-foreground/80 md:text-xl">
            Descobre em 30 segundos quanto o teu negócio está a perder sem
            automação — e quanto podes ganhar.
          </p>
        </div>
      </div>
    </header>
  );
}
