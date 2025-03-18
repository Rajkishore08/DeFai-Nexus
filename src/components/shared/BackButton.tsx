
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="ghost"
      size="sm"
      className="flex items-center text-white/70 hover:text-white hover:bg-white/10"
      onClick={() => navigate(-1)}
    >
      <ChevronLeft className="h-4 w-4 mr-1" />
      Back
    </Button>
  );
};

export default BackButton;
