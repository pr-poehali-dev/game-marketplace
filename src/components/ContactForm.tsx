import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import Icon from "@/components/ui/icon";

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
  selectedGame?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({
  isOpen,
  onClose,
  selectedGame,
}) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      try {
        const userData = JSON.parse(userString);
        if (userData.email) {
          setEmail(userData.email);
        }
      } catch (e) {
        console.error("Failed to parse user data");
      }
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, введите корректный email",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      toast({
        title: "Запрос отправлен",
        description: "Мы свяжемся с вами в ближайшее время",
      });

      const subject = encodeURIComponent(
        `Покупка игры: ${selectedGame || "Не указано"}`,
      );
      const body =
        encodeURIComponent(`Здравствуйте, я хотел бы приобрести ${selectedGame || "игру"}.
      
${message}

С уважением, ${email}`);

      window.location.href = `mailto:bespalovae2013@gmail.com?subject=${subject}&body=${body}`;

      setMessage("");
      onClose();
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="ShoppingCart" size={20} />
            Купить игру
          </DialogTitle>
          <DialogDescription>
            {selectedGame
              ? `Оформление заказа на игру "${selectedGame}"`
              : "Оставьте контактные данные для связи"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="email" className="text-right text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="ваш@email.com"
                className="col-span-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label
                htmlFor="message"
                className="text-right text-sm font-medium"
              >
                Сообщение
              </label>
              <Textarea
                id="message"
                placeholder="Напишите дополнительные пожелания или вопросы"
                className="col-span-3"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="w-full sm:w-auto"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                  Отправка...
                </>
              ) : (
                "Отправить заявку"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactForm;
