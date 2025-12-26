import { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.85), rgba(255,255,255,0.85)), url('/src/assets/fundo.png')",
      }}
    >
      {children}
    </div>
  );
}