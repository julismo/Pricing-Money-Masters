import { Phone, TrendingUp } from 'lucide-react';

export function Header() {
  return (
    <header className="relative overflow-hidden bg-primary py-16 md:py-24">
      {/* Background decoration */}
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/header-bg.png')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="container relative">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-accent/20 px-4 py-2 text-sm font-medium text-accent">
            <TrendingUp className="h-4 w-4" />
            Simulador de Lucro
          </div>

          {/* Main heading */}
          <h1 className="mb-6 text-3xl font-extrabold leading-tight tracking-tight text-primary-foreground md:text-5xl lg:text-6xl">
            Atenda Clientes, <br />
            <span className="text-accent">Não O Telefone.</span>
          </h1>

          {/* Subheading */}
          <p className="mx-auto max-w-2xl text-lg text-primary-foreground/80 md:text-xl">
            Descubra quanto a automação coloca no seu bolso hoje mesmo.
          </p>
        </div>
      </div>
    </header>
  );
}
