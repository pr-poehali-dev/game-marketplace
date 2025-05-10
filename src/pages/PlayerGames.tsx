
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import ContactForm from '@/components/ContactForm';
import { 
  PlayerGamesHeader, 
  PlayerGamesList, 
  EmptyTabContent,
  AddListingCTA,
  PlayerGame
} from '@/components/PlayerGamesComponents';

// Моковые данные игр от пользователей
const playerGamesData: PlayerGame[] = [
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

/**
 * Страница с играми от пользователей
 */
const PlayerGames: React.FC = () => {
  const navigate = useNavigate();
  const [contactFormOpen, setContactFormOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<string>("");
  
  // Проверяем авторизацию пользователя
  const isLoggedIn = !!localStorage.getItem('user');

  /**
   * Обработчик кнопки "Связаться с продавцом"
   */
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

  /**
   * Обработчик кнопки "Добавить объявление"
   */
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

  /**
   * Обработчик кнопки "Вернуться в официальный магазин"
   */
  const navigateToHome = () => navigate('/');

  return (
    <div className="min-h-screen bg-background">
      {/* Заголовок секции */}
      <PlayerGamesHeader 
        handleAddListing={handleAddListing} 
        navigateToHome={navigateToHome} 
      />

      {/* Основной контент */}
      <main className="max-w-7xl mx-auto py-8 px-4">
        <Tabs defaultValue="all" className="w-full mb-8">
          {/* Фильтры и сортировка */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
            <TabsList>
              <TabsTrigger value="all">Все игры</TabsTrigger>
              <TabsTrigger value="pc">ПК</TabsTrigger>
              <TabsTrigger value="console">Консоли</TabsTrigger>
              <TabsTrigger value="other">Другое</TabsTrigger>
            </TabsList>
            
            {/* Фильтры и сортировка (будут реализованы в будущем) */}
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
          
          {/* Вкладка "Все игры" */}
          <TabsContent value="all">
            <PlayerGamesList 
              games={playerGamesData} 
              onContactClick={handleContactClick} 
            />
          </TabsContent>
          
          {/* Пустые вкладки для будущего наполнения */}
          <EmptyTabContent 
            value="pc" 
            message="Скоро здесь появятся игры для ПК от пользователей!" 
          />
          
          <EmptyTabContent 
            value="console" 
            message="Скоро здесь появятся консольные игры от пользователей!" 
          />
          
          <EmptyTabContent 
            value="other" 
            message="Скоро здесь появятся другие предложения от пользователей!" 
          />
        </Tabs>
        
        <Separator className="my-8" />
        
        {/* CTA блок с призывом к действию */}
        <AddListingCTA handleAddListing={handleAddListing} />
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
