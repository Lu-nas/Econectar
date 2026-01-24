import { ReactNode } from "react";
import fundo from "../assets/fundo.png";
import NavBar from '../components/NavBar/NavBar';
import Footer from '../components/Footer/Footer';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: { children: React.ReactNode })  {
  return (
      <>
      <NavBar />
      <main className="min-h-[80vh]">{children}</main>
      <Footer />
    </>
  );
}
