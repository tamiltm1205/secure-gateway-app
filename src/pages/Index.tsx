import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ArrowRight, Image, Link2, Lock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Index: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const features = [
    {
      icon: Image,
      title: 'Fake Photo Detection',
      description: 'Analyze images from social media to detect AI-generated or manipulated content.',
    },
    {
      icon: Link2,
      title: 'Malicious Link Scanner',
      description: 'Report and analyze suspicious links from WhatsApp, SMS, and social platforms.',
    },
    {
      icon: Lock,
      title: 'Secure & Private',
      description: 'Your data is encrypted and never shared. Stay protected with confidence.',
    },
  ];

  return (
    <div className="min-h-screen cyber-grid">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <span className="font-bold text-xl gradient-text">CyberShield</span>
        </div>
        <Button variant="cyber" onClick={() => navigate('/auth')}>
          Get Started
        </Button>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 py-20 md:py-32">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Protection</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-up">
            Protect Yourself From{' '}
            <span className="gradient-text">Digital Threats</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-10 animate-slide-up" style={{ animationDelay: '100ms' }}>
            Detect fake photos, AI-generated images, and malicious links. 
            Stay safe in the digital world with our advanced security tools.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '200ms' }}>
            <Button variant="glow" size="xl" onClick={() => navigate('/auth')}>
              Start Protecting Now
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="xl" onClick={() => navigate('/auth')}>
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-card p-8 text-center group hover:border-primary/50 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${(index + 3) * 100}ms` }}
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 py-20">
        <div className="glass-card p-8 md:p-12 text-center gradient-border animate-slide-up">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Secure Your Digital Life?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of users who trust CyberShield to protect them from 
            fake content and malicious links.
          </p>
          <Button variant="glow" size="lg" onClick={() => navigate('/auth')}>
            Create Free Account
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border py-8 mt-20">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <span className="font-medium">CyberShield</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 CyberShield. Stay safe online.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
