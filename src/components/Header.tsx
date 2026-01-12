import { TrendingUp } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b bg-background py-6">
      <div className="container flex flex-col items-center gap-2 text-center md:flex-row md:justify-between md:text-left">
        <div className="flex items-center gap-2 font-bold text-xl text-primary">
          <div className="flex h-10 w-10 items-center justify-center">
            <img src="/logo.png" alt="Logo" className="h-full w-full object-contain" />
          </div>
          Calculadora de ROI
        </div>
        <p className="text-sm text-muted-foreground">
          Descobre quanto dinheiro estás a perder sem automação
        </p>
      </div>
    </header>
  );
}
