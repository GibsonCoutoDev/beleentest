export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Beleen Hub. Todos os direitos reservados.</p>
        <p className="mt-1">Uma plataforma para conectar pessoas e eventos.</p>
      </div>
    </footer>
  );
}
