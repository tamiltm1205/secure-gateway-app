import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Upload as UploadIcon, 
  Image as ImageIcon, 
  X, 
  CheckCircle,
  Loader2,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Upload: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file.",
          variant: "destructive",
        });
        return;
      }

      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
        setAnalysisComplete(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
        setAnalysisComplete(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const clearImage = () => {
    setSelectedImage(null);
    setFileName('');
    setAnalysisComplete(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const analyzeImage = async () => {
    setIsAnalyzing(true);
    
    // Simulate analysis
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    setIsAnalyzing(false);
    setAnalysisComplete(true);
    
    toast({
      title: "Analysis Complete",
      description: "Image has been analyzed successfully.",
    });
  };

  return (
    <div className="min-h-screen cyber-grid">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="font-semibold">Analyze Photo</h1>
            <p className="text-sm text-muted-foreground">Detect fake or AI-generated images</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="glass-card p-6 md:p-8 animate-slide-up">
          {/* Upload Area */}
          {!selectedImage ? (
            <div
              className="border-2 border-dashed border-border rounded-2xl p-8 md:p-12 text-center hover:border-primary/50 transition-colors duration-300 cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
                <UploadIcon className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload an Image</h3>
              <p className="text-muted-foreground mb-6">
                Drag and drop or click to select
              </p>
              <div className="flex flex-wrap gap-2 justify-center text-sm text-muted-foreground">
                <span className="px-3 py-1 bg-secondary rounded-full">WhatsApp</span>
                <span className="px-3 py-1 bg-secondary rounded-full">Instagram</span>
                <span className="px-3 py-1 bg-secondary rounded-full">Facebook</span>
                <span className="px-3 py-1 bg-secondary rounded-full">AI-Generated</span>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          ) : (
            <div className="space-y-6">
              {/* Image Preview */}
              <div className="relative">
                <button
                  onClick={clearImage}
                  className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="relative rounded-xl overflow-hidden bg-secondary">
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="w-full max-h-[400px] object-contain"
                  />
                  {analysisComplete && (
                    <div className="absolute inset-0 bg-success/10 flex items-center justify-center animate-fade-in">
                      <div className="bg-background/90 backdrop-blur-sm rounded-2xl p-6 text-center">
                        <CheckCircle className="w-12 h-12 text-success mx-auto mb-3" />
                        <p className="font-semibold">Analysis Complete</p>
                        <p className="text-sm text-muted-foreground">Image appears authentic</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* File Info */}
              <div className="flex items-center gap-3 p-4 bg-secondary rounded-xl">
                <ImageIcon className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm truncate flex-1">{fileName}</span>
              </div>

              {/* Analysis Button */}
              {!analysisComplete && (
                <Button 
                  variant="glow" 
                  size="lg" 
                  className="w-full"
                  onClick={analyzeImage}
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Analyze Image
                    </>
                  )}
                </Button>
              )}

              {/* Result Actions */}
              {analysisComplete && (
                <div className="flex gap-3 animate-fade-in">
                  <Button variant="outline" className="flex-1" onClick={clearImage}>
                    Upload Another
                  </Button>
                  <Button variant="glow" className="flex-1" onClick={() => navigate('/dashboard')}>
                    Back to Dashboard
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <div className="glass-card p-5 animate-slide-up" style={{ animationDelay: '100ms' }}>
            <h4 className="font-medium mb-2">Supported Sources</h4>
            <p className="text-sm text-muted-foreground">
              Upload images from WhatsApp, Instagram, Facebook, or any AI image generator.
            </p>
          </div>
          <div className="glass-card p-5 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <h4 className="font-medium mb-2">How it Works</h4>
            <p className="text-sm text-muted-foreground">
              Our system analyzes image metadata and visual patterns to detect manipulation.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Upload;
