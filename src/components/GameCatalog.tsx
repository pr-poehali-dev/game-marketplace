
import React from 'react';
import GameCard from './GameCard';
import { useToast } from '@/hooks/use-toast';

interface Game {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  description?: string;
}

interface GameCatalogProps {
  games: Game[];
  onContactClick: (gameTitle: string) => void;
}

const GameCatalog: React.FC<GameCatalogProps> = ({ games, onContactClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 md:p-6">
      {games.map((game) => (
        <GameCard
          key={game.id}
          id={game.id}
          title={game.title}
          price={game.price}
          imageUrl={game.imageUrl}
          description={game.description}
          onContactClick={onContactClick}
        />
      ))}
    </div>
  );
};

export default GameCatalog;
