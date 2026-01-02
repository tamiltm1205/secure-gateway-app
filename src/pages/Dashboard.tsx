import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  Upload, 
  Link2, 
  LogOut, 
  Image as ImageIcon, 
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You've been successfully logged out.",
    });
    navigate('/auth');
  };

  const stats = [
    { icon: ImageIcon, label: 'Photos Analyzed', value: '0', color: 'text-primary' },
    { icon: Link2, label: 'Links Checked', value: '0', color: 'text-primary' },
    { icon: AlertTriangle, label: 'Threats Found', value: '0', color: 'text-warning' },
    { icon: CheckCircle, label: 'Safe Items', value: '0', color: 'text-success' },
  ];

  const features = [
    {
      icon: Upload,
      title: 'Analyze Photo',
      description: 'Upload images from gallery to detect AI-generated or fake content',
      action: () => navigate('/upload'),
      buttonText: 'Upload Photo',
    },
    {
      icon: Link2,
      title: 'Report Spam Link',
      description: 'Submit suspicious links from WhatsApp, Instagram, SMS, or web',
      action: () => navigate('/report'),
      buttonText: 'Report Link',
    },
  ];

  return (
    <div className="min-h-screen cyber-grid">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <span className="font-bold text-xl gradient-text">CyberShield</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">{user?.username}</span>
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, <span className="gradient-text">{user?.username}</span>
          </h1>
          <p className="text-muted-foreground">
            Protect yourself from fake content and malicious links.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="glass-card p-5 flex flex-col items-center text-center animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <stat.icon className={`w-8 h-8 ${stat.color} mb-3`} />
              <span className="text-2xl font-bold">{stat.value}</span>
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="glass-card p-6 group hover:border-primary/50 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${(index + 4) * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground mb-5">{feature.description}</p>
              <Button variant="cyber" onClick={feature.action} className="w-full">
                {feature.buttonText}
              </Button>
            </div>
          ))}
        </div>

        {/* Activity Section */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Recent Activity</h2>
          </div>
          <div className="text-center py-10">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">No activity yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Start by uploading a photo or reporting a suspicious link
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
