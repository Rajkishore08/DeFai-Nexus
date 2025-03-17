
import { CirclePlus, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface PlaceholderContentProps {
  title: string;
  description: string;
  imageSrc?: string;
}

const PlaceholderContent = ({ title, description, imageSrc }: PlaceholderContentProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-5rem)] px-4">
      <div className="max-w-2xl w-full text-center">
        {imageSrc ? (
          <img 
            src={imageSrc} 
            alt={title}
            className="w-24 h-24 mx-auto mb-6 opacity-70" 
          />
        ) : (
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-defi-gradient/30 flex items-center justify-center">
            <AlertCircle className="h-12 w-12 text-white/50" />
          </div>
        )}
        
        <h1 className="text-3xl font-bold mb-4 text-white">{title}</h1>
        
        <p className="text-white/70 mb-8">
          {description}
        </p>
        
        <Alert className="bg-defi-blue/10 border border-defi-blue/30 mb-8">
          <AlertTitle className="text-defi-teal">Coming Soon</AlertTitle>
          <AlertDescription className="text-white/70">
            This feature is currently under development. Check back soon for updates!
          </AlertDescription>
        </Alert>
        
        <Link to="/">
          <Button 
            className="bg-button-gradient hover:opacity-90 transition-opacity text-white font-medium"
          >
            <CirclePlus className="mr-2 h-4 w-4" /> Return to Homepage
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PlaceholderContent;
