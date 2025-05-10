
import React, { useState } from 'react';
import GameCatalog from '@/components/GameCatalog';
import ContactForm from '@/components/ContactForm';
import FAQ from '@/components/FAQ';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const games = [
  {
    id: "1",
    title: "Grand Theft Auto 5",
    price: 3000,
    imageUrl: "https://images.unsplash.com/photo-1592167604518-33e889c5f6bb?q=80&w=1000&auto=format&fit=crop",
    description: "Один из самых популярных и продаваемых экшн-игр в открытом мире от Rockstar Games."
  },
  {
    id: "2",
    title: "Grand Theft Auto 4",
    price: 1569,
    imageUrl: "https://images.unsplash.com/photo-1600561721406-9a9fc27274d6?q=80&w=1000&auto=format&fit=crop",
    description: "Культовая игра от Rockstar Games, погрузитесь в криминальный мир Либерти-Сити."
  },
  {
    id: "3",
    title: "Red Dead Redemption 2",
    price: 4300,
    imageUrl: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=1000&auto=format&fit=crop",
    description: "Эпическая история из жизни Америки на заре современной эпохи с открытым миром."
  }
];

const Index = () => {
  const [contactFormOpen, setContactFormOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<string>("");

  const handleContactClick = (gameTitle: string) => {
    setSelectedGame(gameTitle);
    setContactFormOpen(true);
  };

  const handleDirectContact = () => {
    setSelectedGame("");
    setContactFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero section */}
      <header className="bg-gradient-to-br from-primary/90 to-purple-800 text-white p-6 md:p-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Магазин Игр</h1>
          <p className="text-xl md:text-2xl mb-6 max-w-2xl">
            Приобретайте популярные игры по выгодным ценам
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90"
              onClick={handleDirectContact}
            >
              <Icon name="Mail" className="mr-2" />
              Связаться для покупки
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/20"
              asChild
            >
              <a href="#games">
                <Icon name="GameController" className="mr-2" />
                Смотреть игры
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Games section */}
      <main className="max-w-7xl mx-auto py-8 px-4" id="games">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Доступные игры</h2>
        <GameCatalog 
          games={games} 
          onContactClick={handleContactClick} 
        />

        <div className="mt-12 text-center">
          <p className="text-lg mb-6">
            Ищете другие игры или хотите узнать о Robux? 
          </p>
          <Button 
            size="lg" 
            onClick={handleDirectContact}
            className="mx-auto"
          >
            <Icon name="Mail" className="mr-2" />
            Напишите нам
          </Button>
        </div>
      </main>

      {/* FAQ section */}
      <section className="bg-muted/50 py-12">
        <FAQ />
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="mb-4">Для всех вопросов и заказов: <a href="mailto:bespalovae2013@gmail.com" className="underline">bespalovae2013@gmail.com</a></p>
          <p className="text-sm opacity-75">© 2024 Магазин Игр. Все права защищены.</p>
        </div>
      </footer>

      {/* Contact Form Dialog */}
      <ContactForm 
        isOpen={contactFormOpen} 
        onClose={() => setContactFormOpen(false)} 
        selectedGame={selectedGame} 
      />
    </div>
  );
};

export default Index;
