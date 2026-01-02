import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Link2,
  MessageSquare,
  Globe,
  Send,
  Loader2,
  CheckCircle,
  AlertTriangle,
  Smartphone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

type SourceType = 'whatsapp' | 'instagram' | 'facebook' | 'sms' | 'web';

const Report: React.FC = () => {
  const [source, setSource] = useState<SourceType>('whatsapp');
  const [linkUrl, setLinkUrl] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const navigate = useNavigate();
  const { toast } = useToast();

  const sources: { id: SourceType; label: string; icon: React.ElementType }[] = [
    { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
    { id: 'instagram', label: 'Instagram', icon: MessageSquare },
    { id: 'facebook', label: 'Facebook', icon: MessageSquare },
    { id: 'sms', label: 'SMS', icon: Smartphone },
    { id: 'web', label: 'Web URL', icon: Globe },
  ];

  const validateUrl = (url: string): boolean => {
    if (!url) return true; // Optional field
    try {
      new URL(url);
      return true;
    } catch {
      // Check if it's a partial URL
      if (url.includes('.') && !url.includes(' ')) {
        try {
          new URL(`https://${url}`);
          return true;
        } catch {
          return false;
        }
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!linkUrl && !message) {
      newErrors.general = 'Please provide a link or message to report';
    }

    if (linkUrl && !validateUrl(linkUrl)) {
      newErrors.linkUrl = 'Please enter a valid URL';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    toast({
      title: "Report Submitted",
      description: "Thank you for keep helping the community safe.",
    });
  };

  const resetForm = () => {
    setLinkUrl('');
    setMessage('');
    setIsSubmitted(false);
    setSource('whatsapp');
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen cyber-grid flex items-center justify-center p-4">
        <div className="glass-card p-8 max-w-md w-full text-center animate-slide-up">
          <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-success" />
          </div>
          <h2 className="text-2xl font-bold mb-3">Report Submitted!</h2>
          <p className="text-muted-foreground mb-8">
            Your report has been received. Our team will analyze the submitted content.
          </p>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={resetForm}>
              Report Another
            </Button>
            <Button variant="glow" className="flex-1" onClick={() => navigate('/dashboard')}>
              Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen cyber-grid">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] bg-warning/5 rounded-full blur-[100px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="font-semibold">Report Suspicious Link</h1>
            <p className="text-sm text-muted-foreground">Help us identify malicious content</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="glass-card p-6 md:p-8 animate-slide-up">
          {/* Warning Banner */}
          <div className="flex items-start gap-3 p-4 bg-warning/10 border border-warning/20 rounded-xl mb-8">
            <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-warning">Safety Notice</p>
              <p className="text-sm text-muted-foreground">
                Never click on suspicious links. Copy and paste them directly into the field below.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Source Selection */}
            <div>
              <label className="block text-sm font-medium mb-3">
                Where did you receive this?
              </label>
              <div className="flex flex-wrap gap-2">
                {sources.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSource(s.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-all duration-200 ${source === s.id
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-secondary border-border hover:border-primary/50'
                      }`}
                  >
                    <s.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* URL Input */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Suspicious Link (URL)
              </label>
              <div className="relative">
                <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="https://suspicious-link.com/..."
                  value={linkUrl}
                  onChange={(e) => {
                    setLinkUrl(e.target.value);
                    if (errors.linkUrl) setErrors(prev => ({ ...prev, linkUrl: '' }));
                  }}
                  className="pl-11"
                />
              </div>
              {errors.linkUrl && (
                <p className="text-destructive text-sm mt-1">{errors.linkUrl}</p>
              )}
            </div>

            {/* Message Input */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Original Message (Optional)
              </label>
              <Textarea
                placeholder="Paste the full message you received here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Including the original message helps us better analyze the threat.
              </p>
            </div>

            {errors.general && (
              <p className="text-destructive text-sm text-center">{errors.general}</p>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              variant="glow"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting Report...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Submit Report
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Tips Section */}
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          {[
            { title: 'Copy, Don\'t Click', desc: 'Always copy suspicious links instead of clicking them.' },
            { title: 'Check the Domain', desc: 'Look for misspellings or unusual domain names.' },
            { title: 'Report Everything', desc: 'When in doubt, report. Better safe than sorry.' },
          ].map((tip, index) => (
            <div
              key={index}
              className="glass-card p-5 animate-slide-up"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <h4 className="font-medium mb-2">{tip.title}</h4>
              <p className="text-sm text-muted-foreground">{tip.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Report;
