import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, Rocket, Handshake } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <section className="text-center py-12 bg-gradient-to-br from-primary/10 via-background to-accent/10 rounded-lg shadow-inner">
        <Users className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="font-headline text-5xl font-bold mb-4">Sobre o Beleen Hub</h1>
        <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
          Conectando paixões, ideias e pessoas através de eventos memoráveis.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="font-headline text-3xl font-semibold mb-4 text-primary">Nossa Missão <Target className="inline ml-2 h-7 w-7"/></h2>
          <p className="text-lg text-foreground/80 mb-4 leading-relaxed">
            No Beleen Hub, nossa missão é simplificar a forma como as pessoas descobrem, criam e gerenciam eventos.
            Acreditamos que cada evento é uma oportunidade única de aprendizado, networking e celebração.
            Queremos ser a ponte que une organizadores talentosos a um público engajado, fomentando uma comunidade vibrante e colaborativa.
          </p>
          <p className="text-lg text-foreground/80 leading-relaxed">
            Buscamos capacitar indivíduos e organizações a transformar suas visões em realidade, oferecendo ferramentas intuitivas e um espaço acolhedor para todos os tipos de eventos, desde workshops íntimos a grandes conferências.
          </p>
        </div>
        <div className="rounded-lg overflow-hidden shadow-xl">
          <Image 
            src="https://placehold.co/600x400" 
            alt="Equipe Beleen Hub trabalhando" 
            width={600} 
            height={400}
            className="w-full h-auto object-cover"
            data-ai-hint="team collaboration"
          />
        </div>
      </section>

      <section>
        <h2 className="font-headline text-3xl font-semibold mb-8 text-center">Nossos Valores <Handshake className="inline ml-2 h-7 w-7"/></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Rocket className="h-10 w-10 text-accent mb-3" />
              <CardTitle className="font-headline">Inovação</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/70">Buscamos constantemente novas maneiras de melhorar a experiência de eventos para todos.</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Users className="h-10 w-10 text-accent mb-3" />
              <CardTitle className="font-headline">Comunidade</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/70">Fomentamos um ambiente inclusivo e colaborativo onde todos se sentem bem-vindos.</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Target className="h-10 w-10 text-accent mb-3" />
              <CardTitle className="font-headline">Excelência</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/70">Comprometemo-nos com a mais alta qualidade em nossa plataforma e suporte.</p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <section className="text-center py-10">
        <h2 className="font-headline text-3xl font-semibold mb-6">Junte-se a Nós!</h2>
        <p className="text-lg text-foreground/80 mb-6 max-w-2xl mx-auto">
            Seja você um organizador procurando divulgar seu próximo grande evento ou alguém em busca de novas experiências, o Beleen Hub é o seu lugar.
        </p>
         {/* Placeholder for future team section or contact info */}
      </section>
    </div>
  );
}
