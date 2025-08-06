import { Button } from "@/components/ui/button"
import { Shirt, User, Layers } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

export const Header = () => {
  const location = useLocation()
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between p-4 max-w-4xl mx-auto">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Shirt className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold bg-gradient-primary bg-clip-text text-transparent">
            My Wardrobe
          </span>
        </Link>
        
        <div className="flex items-center gap-2">
          <Link to="/wardrobe">
            <Button 
              variant="icon" 
              size="icon-lg"
              className={location.pathname === '/wardrobe' ? 'bg-primary text-primary-foreground' : ''}
            >
              <Layers className="w-5 h-5" />
            </Button>
          </Link>
          <Link to="/upload">
            <Button 
              variant="icon" 
              size="icon-lg"
              className={location.pathname === '/upload' ? 'bg-primary text-primary-foreground' : ''}
            >
              <Shirt className="w-5 h-5" />
            </Button>
          </Link>
          <Link to="/profile">
            <Button 
              variant="icon" 
              size="icon-lg"
              className={location.pathname === '/profile' ? 'bg-primary text-primary-foreground' : ''}
            >
              <User className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}