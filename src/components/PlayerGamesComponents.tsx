import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // Добавлен импорт Button
import Icon from "@/components/ui/icon"; // Добавлен импорт Icon
import { TabsContent } from "@/components/ui/tabs";

// Типизация данных игры
export interface PlayerGame {
  id: string;
  title: string;
  price: number;
  sellerName: string;
  imageUrl: string;
  description: string;
}

// Компонент заголовка раздела игр от пользователей
export const PlayerGamesHeader: React.FC<{
  handleAddListing: () => void;
  navigateToHome: () => void;
}> = ({ handleAddListing, navigateToHome }) => (
  <header className="bg-accent py-8">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Игры от пользователей</h1>
      <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
        Тут вы можете найти игры, которые продают другие пользователи нашей
        платформы
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Button onClick={handleAddListing}>
          <Icon name="PlusCircle" className="mr-2" />
          Добавить свое объявление
        </Button>
        <Button variant="outline" onClick={navigateToHome}>
          <Icon name="Store" className="mr-2" />
          Вернуться в официальный магазин
        </Button>
      </div>
    </div>
  </header>
);

// Компонент карточки игры от пользователя
export const PlayerGameCard: React.FC<{
  game: PlayerGame;
  onContactClick: (gameTitle: string) => void;
}> = ({ game, onContactClick }) => (
  <Card
    key={game.id}
    className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
  >
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
        {game.price.toLocaleString("ru-RU")} ₽
      </CardDescription>
    </CardHeader>
    <CardContent className="px-4 pb-0 flex-grow">
      <p className="text-sm text-muted-foreground">{game.description}</p>
      <div className="mt-4 flex items-center">
        <Icon name="User" className="h-4 w-4 mr-2 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          Продавец: {game.sellerName}
        </span>
      </div>
    </CardContent>
    <CardFooter className="p-4 pt-2">
      <Button
        className="w-full gap-2"
        variant="outline"
        onClick={() => onContactClick(game.title)}
      >
        <Icon name="MessageSquare" size={18} />
        Связаться с продавцом
      </Button>
    </CardFooter>
  </Card>
);

// Компонент списка игр пользователей
export const PlayerGamesList: React.FC<{
  games: PlayerGame[];
  onContactClick: (gameTitle: string) => void;
}> = ({ games, onContactClick }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {games.map((game) => (
      <PlayerGameCard
        key={game.id}
        game={game}
        onContactClick={onContactClick}
      />
    ))}
  </div>
);

// Компонент содержимого вкладки
export const EmptyTabContent: React.FC<{
  value: string;
  message?: string;
}> = ({ value, message = "Скоро здесь появятся игры от пользователей!" }) => (
  <TabsContent value={value}>
    <div className="py-8 text-center">
      <p className="text-muted-foreground">{message}</p>
    </div>
  </TabsContent>
);

// Компонент CTA-блока
export const AddListingCTA: React.FC<{
  handleAddListing: () => void;
}> = ({ handleAddListing }) => (
  <div className="bg-muted p-6 rounded-lg mt-8">
    <h2 className="text-xl font-semibold mb-4">Хотите продать свою игру?</h2>
    <p className="mb-4">
      Вы можете разместить объявление о продаже ваших игр на нашей платформе и
      найти покупателей.
    </p>
    <Button onClick={handleAddListing}>
      <Icon name="PlusCircle" className="mr-2" />
      Добавить объявление
    </Button>
  </div>
);
