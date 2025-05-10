import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface GameCardProps {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  description?: string;
  isOfficial?: boolean;
  sellerName?: string;
  onContactClick: (gameTitle: string) => void;
}

const GameCard: React.FC<GameCardProps> = ({
  id,
  title,
  price,
  imageUrl,
  description,
  isOfficial = true,
  sellerName,
  onContactClick,
}) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg bg-card h-full flex flex-col">
      <div className="aspect-video w-full overflow-hidden relative">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {isOfficial && (
          <div className="absolute top-2 left-2 bg-primary/80 text-primary-foreground text-xs py-1 px-2 rounded">
            Официальный магазин
          </div>
        )}
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-lg md:text-xl">{title}</CardTitle>
        <CardDescription className="text-base font-semibold text-primary">
          {price.toLocaleString("ru-RU")} ₽
        </CardDescription>
      </CardHeader>
      {description && (
        <CardContent className="px-4 py-0 flex-grow">
          <p className="text-sm text-muted-foreground">{description}</p>
          {!isOfficial && sellerName && (
            <div className="mt-4 flex items-center">
              <Icon
                name="User"
                className="h-4 w-4 mr-2 text-muted-foreground"
              />
              <span className="text-sm text-muted-foreground">
                Продавец: {sellerName}
              </span>
            </div>
          )}
        </CardContent>
      )}
      <CardFooter className="p-4 pt-2">
        <Button
          className="w-full gap-2"
          onClick={() => onContactClick(title)}
          variant={isOfficial ? "default" : "outline"}
        >
          <Icon name={isOfficial ? "Mail" : "MessageSquare"} size={18} />
          {isOfficial ? "Связаться для покупки" : "Связаться с продавцом"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GameCard;
