
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import ContactForm from '@/components/ContactForm';

// Имитация данных игр от игроков
const playerGames = [
  {
    id: "p1",
    title: "FIFA 23",
    price: 2500,
    sellerName: "GameMaster",
    imageUrl: "https://images.unsplash.com/photo-1587155096103-1a32d7a0f5b5?q=80&w=1000&auto=format&fit=crop",
    description: "Футбольный симулятор от Electronic Arts. Использовалась менее месяца."
  },
  {
    id: "p2",
    title: "Cyberpunk 2077",
    price: 2800,
    sellerName: "CyberPlayer",
    imageUrl: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=1000&auto=format&fit=crop",
    description: "Ролевая игра от CD Projekt Red. Установка через GOG без привязки."
  },
  {
    id: "p3",
    title: "Elden Ring",
    price: 3800,
    sellerName: "SoulsLover",
    imageUrl: "https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?q=80&w=1000&auto=format&fit=crop",
    description: "Популярная ролевая игра от FromSoftware. Новая, не использовалась."
  },
];

const PlayerGames = () => {
  const navigate = useNavigate();
  const [contactFormOpen, setContactFormOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<string>("");
  const isLoggedIn = !!localStorage.getItem('user');

  const handleContactClick = (gameTitle: string) => {
    if (!isLoggedIn) {
      toast({
        title: "Требуется авторизация",
        description: "Чтобы связаться с продавцом, необходимо войти в аккаунт",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }
    
    setSelectedGame(gameTitle);
    setContactFormOpen(true);
  };

  const handleAddListing = () => {
    if (!isLoggedIn) {
      toast({
        title: "Требуется авторизация",
        description: "Чтобы добавить объявление, необходимо войти в аккаунт",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }
    
    toast({
      title: "Функция в разработке",
      description: "Возможность добавления объявлений скоро будет доступна",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Заголовок секции */}
      <header className="bg-accent py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Игры от пользователей</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Тут вы можете найти игры, которые продают другие пользователи нашей платформы
          </p>
          <div className="flex justify-center gap-4">
            <Button onClick={handleAddListing}>
              <Icon name="PlusCircle" className="mr-2" />
              Добавить свое объявление
            </Button>
            <Button variant="outline" onClick={() => navigate('/')}>
              <Icon name="Store" className="mr-2" />
              Вернуться в официальный магазин
            </Button>
          </div>
        </div>
      </header>

      {/* Основной контент */}
      <main className="max-w-7xl mx-auto py-8 px-4">
        <Tabs defaultValue="all" className="w-full mb-8">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="all">Все игры</TabsTrigger>
              <TabsTrigger value="pc">ПК</TabsTrigger>
              <TabsTrigger value="console">Консоли</TabsTrigger>
              <TabsTrigger value="other">Другое</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Icon name="SlidersHorizontal" className="h-4 w-4 mr-2" />
                Фильтры
              </Button>
              <Button variant="outline" size="sm">
                <Icon name="ArrowUpDown" className="h-4 w-4 mr-2" />
                Сортировка
              </Button>
            </div>
          </div>
          
          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {playerGames.map((game) => (
                <Card key={game.id} className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="aspect-video w-full overflow-hidden">
                    <img 
                      src={game.imageUrl} 
                      alt={game.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                    />
                  </div>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">{game.title}</CardTitle>
                    <CardDescription className="text-base font-semibold text-primary">
                      {game.price.toLocaleString('ru-RU')} ₽
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-4 pb-0 flex-grow">
                    <p className="text-sm text-muted-foreground">{game.description}</p>
                    <div className="mt-4 flex items-center">
                      <Icon name="User" className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Продавец: {game.sellerName}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-2">
                    <Button 
                      className="w-full gap-2" 
                      variant="outline"
                      onClick={() => handleContactClick(game.title)}
                    >
                      <Icon name="MessageSquare" size={18} />
                      Связаться с продавцом
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="pc">
            <div className="py-8 text-center">
              <p className="text-muted-foreground">Скоро здесь появятся игры для ПК от пользователей!</p>
            </div>
          </TabsContent>
          
          <TabsContent value="console">
            <div className="py-8 text-center">
              <p className="text-muted-foreground">Скоро здесь появятся консольные игры от пользователей!</p>
            </div>
          </TabsContent>
          
          <TabsContent value="other">
            <div className="py-8 text-center">
              <p className="text-muted-foreground">Скоро здесь появятся другие предложения от пользователей!</p>
            </div>
          </TabsContent>
        </Tabs>
        
        <Separator className="my-8" />
        
        <div className="bg-muted p-6 rounded-lg mt-8">
          <h2 className="text-xl font-semibold mb-4">Хотите продать свою игру?</h2>
          <p className="mb-4">Вы можете разместить объявление о продаже ваших игр на нашей платформе и найти покупателей.</p>
          <Button onClick={handleAddListing}>
            <Icon name="PlusCircle" className="mr-2" />
            Добавить объявление
          </Button>
        </div>
      </main>
      
      {/* Форма связи с продавцом */}
      <ContactForm 
        isOpen={contactFormOpen} 
        onClose={() => setContactFormOpen(false)} 
        selectedGame={selectedGame} 
      />
    </div>
  );
};

export default PlayerGames;
