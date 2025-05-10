
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Icon from '@/components/ui/icon';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { toast } from '@/hooks/use-toast';

interface User {
  username: string;
  email: string;
  isLoggedIn: boolean;
}

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse user from localStorage');
      }
    }
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast({
      title: "Вы вышли из аккаунта",
      description: "Возвращайтесь скорее!",
    });
    navigate('/');
  };
  
  const getInitials = (name: string) => {
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <header className="border-b bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and site name */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Icon name="Gamepad2" className="h-8 w-8 text-primary mr-2" />
              <span className="text-xl font-bold">ГеймМаркет</span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md">
              Главная
            </Link>
            <Link to="/player-games" className="text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md">
              Игры пользователей
            </Link>
            <Link to="/robux" className="text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md">
              Robux
            </Link>
          </nav>
          
          {/* User menu (desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{getInitials(user.username)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{user.username}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <Icon name="User" className="mr-2 h-4 w-4" />
                    Мой профиль
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/my-listings')}>
                    <Icon name="ListOrdered" className="mr-2 h-4 w-4" />
                    Мои объявления
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <Icon name="LogOut" className="mr-2 h-4 w-4" />
                    Выйти
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" onClick={() => navigate('/login')}>
                  Войти
                </Button>
                <Button onClick={() => navigate('/register')}>
                  Регистрация
                </Button>
              </>
            )}
          </div>
          
          {/* Mobile menu */}
          <div className="flex md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Icon name="Menu" className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col h-full">
                  <div className="px-4 py-6">
                    <Link to="/" className="flex items-center mb-6">
                      <Icon name="Gamepad2" className="h-6 w-6 text-primary mr-2" />
                      <span className="text-lg font-bold">ГеймМаркет</span>
                    </Link>
                    <nav className="flex flex-col space-y-4">
                      <Link to="/" className="flex items-center px-2 py-1 rounded-md hover:bg-muted">
                        <Icon name="Home" className="mr-2 h-5 w-5" />
                        Главная
                      </Link>
                      <Link to="/player-games" className="flex items-center px-2 py-1 rounded-md hover:bg-muted">
                        <Icon name="Users" className="mr-2 h-5 w-5" />
                        Игры пользователей
                      </Link>
                      <Link to="/robux" className="flex items-center px-2 py-1 rounded-md hover:bg-muted">
                        <Icon name="DollarSign" className="mr-2 h-5 w-5" />
                        Robux
                      </Link>
                    </nav>
                  </div>
                  
                  <div className="mt-auto px-4 py-6 border-t">
                    {user ? (
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarFallback>{getInitials(user.username)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.username}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <Button variant="outline" onClick={() => navigate('/profile')}>
                            <Icon name="User" className="mr-2 h-4 w-4" />
                            Мой профиль
                          </Button>
                          <Button variant="outline" onClick={() => navigate('/my-listings')}>
                            <Icon name="ListOrdered" className="mr-2 h-4 w-4" />
                            Мои объявления
                          </Button>
                          <Button variant="destructive" onClick={handleLogout}>
                            <Icon name="LogOut" className="mr-2 h-4 w-4" />
                            Выйти
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col space-y-2">
                        <Button onClick={() => navigate('/login')}>
                          Войти
                        </Button>
                        <Button variant="outline" onClick={() => navigate('/register')}>
                          Регистрация
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
