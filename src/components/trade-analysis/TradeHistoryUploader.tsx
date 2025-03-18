
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileText, Check, X } from 'lucide-react';
import { toast } from 'sonner';

const supportedExchanges = [
  { name: 'Uniswap', logo: '🦄' },
  { name: 'SushiSwap', logo: '🍣' },
  { name: 'dYdX', logo: 'dYdX' },
  { name: 'PancakeSwap', logo: '🥞' },
  { name: 'GMX', logo: 'GMX' },
  { name: '1inch', logo: '1inch' },
];

const TradeHistoryUploader = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setUploadComplete(false);
    }
  };
  
  const handleUpload = () => {
    if (!selectedFile) return;
    
    setIsUploading(true);
    
    // Simulate upload and processing
    setTimeout(() => {
      setIsUploading(false);
      setUploadComplete(true);
      toast.success('Trade history uploaded successfully');
    }, 2000);
  };
  
  return (
    <Card className="bg-black/20 border border-white/10">
      <CardContent className="pt-6">
        <h3 className="text-xl font-medium text-white mb-4">Upload Trade History</h3>
        
        <div className="rounded-lg border border-dashed border-white/20 p-6 mb-6">
          <div className="flex flex-col items-center justify-center">
            {!selectedFile ? (
              <>
                <Upload className="h-12 w-12 text-white/40 mb-4" />
                <p className="text-white/80 text-center mb-2">
                  Drag & drop your trade history file here, or click to browse
                </p>
                <p className="text-white/50 text-sm text-center">
                  Supports CSV, JSON exports from major exchanges
                </p>
              </>
            ) : (
              <>
                <FileText className="h-12 w-12 text-defi-teal mb-4" />
                <p className="text-white font-medium text-center mb-1">
                  {selectedFile.name}
                </p>
                <p className="text-white/50 text-sm text-center">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
                {uploadComplete && (
                  <div className="flex items-center text-green-500 mt-2">
                    <Check className="h-4 w-4 mr-1" />
                    <span>File processed successfully</span>
                  </div>
                )}
              </>
            )}
            
            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept=".csv,.json"
              onChange={handleFileSelect}
            />
          </div>
        </div>
        
        <div className="mb-6">
          <p className="text-white/80 mb-2">Supported Exchanges:</p>
          <div className="flex flex-wrap gap-3">
            {supportedExchanges.map((exchange) => (
              <div 
                key={exchange.name}
                className="flex items-center bg-white/5 rounded-md px-3 py-1 text-sm"
              >
                <span className="mr-1">{exchange.logo}</span>
                <span className="text-white/80">{exchange.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          <Button
            onClick={handleUpload}
            disabled={!selectedFile || isUploading || uploadComplete}
            className="w-full bg-defi-gradient hover:opacity-90"
          >
            {isUploading ? 'Processing...' : uploadComplete ? 'Processed Successfully' : 'Upload & Analyze Trades'}
            {uploadComplete ? (
              <Check className="ml-2 h-4 w-4" />
            ) : (
              <Upload className={`ml-2 h-4 w-4 ${isUploading ? 'animate-spin' : ''}`} />
            )}
          </Button>
          
          <label htmlFor="file-upload">
            <Button
              type="button"
              variant="outline"
              className="w-full border-white/20 text-white hover:bg-white/10"
            >
              Browse Files
            </Button>
          </label>
        </div>
      </CardContent>
    </Card>
  );
};

export default TradeHistoryUploader;
