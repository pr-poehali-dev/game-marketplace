
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface GameCardProps {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  description?: string;
  onContactClick: (gameTitle: string) => void;
}

const GameCard: React.FC<GameCardProps> = ({
  id,
  title,
  price,
  imageUrl,
  description,
  onContactClick
}) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg bg-card h-full flex flex-col">
      <div className="aspect-video w-full overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
        />
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-lg md:text-xl">{title}</CardTitle>
        <CardDescription className="text-base font-semibold text-primary">
          {price.toLocaleString('ru-RU')} ₽
        </CardDescription>
      </CardHeader>
      {description && (
        <CardContent className="px-4 py-0 flex-grow">
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
      )}
      <CardFooter className="p-4 pt-2">
        <Button 
          className="w-full gap-2" 
          onClick={() => onContactClick(title)}
        >
          <Icon name="Mail" size={18} />
          Связаться для покупки
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GameCard;
