// @ts-nocheck
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Search, CalendarPlus, Settings, Users, Info, LogIn, UserPlus, LogOut, LayoutDashboard, Ticket } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Início', icon: LayoutDashboard },
  { href: '/discover-events', label: 'Descobrir Eventos', icon: Search },
  { href: '/create-event', label: 'Criar Evento', icon: CalendarPlus, requiresAuth: true },
  { href: '/manage-events', label: 'Gerenciar Eventos', icon: Settings, requiresAuth: true },
  { href: '/about', label: 'Sobre Nós', icon: Info },
];

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Mock login check, replace with actual auth logic
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedInStatus);
  }, []);

  const handleLogin = () => {
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  const renderNavLinks = (isMobile = false) => {
    const linksToShow = navLinks.filter(link => !link.requiresAuth || isLoggedIn);
    return linksToShow.map((link) => (
      <Link
        key={link.href}
        href={link.href}
        className={`text-sm font-medium transition-colors hover:text-primary ${
          isMobile ? 'flex items-center gap-2 p-2 hover:bg-accent/10 rounded-md' : ''
        }`}
        aria-label={link.label}
      >
        {isMobile && link.icon && <link.icon className="h-5 w-5" />}
        {link.label}
      </Link>
    ));
  };

  if (!isClient) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="font-headline text-2xl font-bold text-primary" aria-label="Beleen Hub Home">
            Beleen Hub
          </Link>
          <div className="h-8 w-24 animate-pulse rounded bg-muted"></div> {/* Placeholder for auth buttons */}
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-headline text-2xl font-bold text-primary" aria-label="Beleen Hub Home">
          Beleen Hub <Ticket className="inline-block h-6 w-6 ml-1 text-accent" />
        </Link>
        <nav className="hidden items-center space-x-6 md:flex">
          {renderNavLinks()}
        </nav>
        <div className="hidden items-center space-x-2 md:flex">
          {isLoggedIn ? (
            <Button onClick={handleLogout} variant="outline" aria-label="Sair">
              <LogOut className="mr-2 h-4 w-4" /> Sair
            </Button>
          ) : (
            <>
              <Button asChild variant="ghost" aria-label="Login">
                <Link href="/login" onClick={handleLogin /* Mock login on click for now*/}>
                  <LogIn className="mr-2 h-4 w-4" /> Login
                </Link>
              </Button>
              <Button asChild aria-label="Registrar">
                <Link href="/register">
                  <UserPlus className="mr-2 h-4 w-4" /> Registrar
                </Link>
              </Button>
            </>
          )}
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Abrir menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4 pt-6">
                {renderNavLinks(true)}
                <div className="mt-6 border-t pt-6">
                  {isLoggedIn ? (
                    <Button onClick={handleLogout} variant="outline" className="w-full justify-start" aria-label="Sair">
                      <LogOut className="mr-2 h-5 w-5" /> Sair
                    </Button>
                  ) : (
                    <>
                      <Button asChild variant="ghost" className="w-full justify-start" aria-label="Login">
                        <Link href="/login" onClick={handleLogin /* Mock login on click for now*/}>
                          <LogIn className="mr-2 h-5 w-5" /> Login
                        </Link>
                      </Button>
                      <Button asChild className="w-full justify-start mt-2" aria-label="Registrar">
                        <Link href="/register">
                          <UserPlus className="mr-2 h-5 w-5" /> Registrar
                        </Link>
                      </Button>
                    </>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
