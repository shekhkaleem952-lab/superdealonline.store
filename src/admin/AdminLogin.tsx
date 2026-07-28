import React, { useState } from 'react';
import { Lock, Mail, ShieldCheck, ArrowRight, Store, KeyRound } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onBackToStore: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onBackToStore }) => {
  const [email, setEmail] = useState('admin@superdeal.store');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      // Demo validation - allows admin / admin123 or any email with admin password
      if (email.trim() && password.trim()) {
        onLoginSuccess();
      } else {
        setError('Please enter valid administrator credentials.');
      }
      setIsLoading(false);
    }, 600);
  };

  const handleDemoLogin = () => {
    setEmail('admin@superdeal.store');
    setPassword('admin123');
    setIsLoading(true);
    setTimeout(() => {
      onLoginSuccess();
      setIsLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
      {/* Background Subtle Effects */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#0057FF]/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-md w-full space-y-6 z-10">
        {/* Top Header & Brand */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-[#0057FF] text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>Super Deal Admin Portal</span>
          </div>

          <h1 className="text-3xl font-black font-playfair tracking-tight text-white">
            Store Management
          </h1>
          <p className="text-xs text-slate-400">
            Sign in to manage inventory, customer orders, catalog, and settings
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-slate-800/90 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold p-3.5 rounded-2xl flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Admin Email or Username</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@superdeal.store"
                  className="w-full bg-slate-900/90 border border-slate-700 rounded-2xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#0057FF] focus:ring-1 focus:ring-[#0057FF]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-300">Password</label>
                <span className="text-[11px] text-blue-400 font-medium">Default: admin123</span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-900/90 border border-slate-700 rounded-2xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#0057FF] focus:ring-1 focus:ring-[#0057FF]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0057FF] hover:bg-blue-600 text-white font-bold text-xs py-3.5 rounded-2xl shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50 mt-2"
            >
              {isLoading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In to Admin Panel</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="relative border-t border-slate-700/60 pt-4 text-center space-y-3">
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full bg-slate-700/60 hover:bg-slate-700 text-slate-200 border border-slate-600 text-xs font-bold py-2.5 rounded-2xl flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <KeyRound className="w-3.5 h-3.5 text-amber-400" />
              <span>One-Click Demo Admin Login</span>
            </button>

            <button
              type="button"
              onClick={onBackToStore}
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white cursor-pointer transition-colors"
            >
              <Store className="w-3.5 h-3.5" />
              <span>Return to Customer Website</span>
            </button>
          </div>
        </div>

        <p className="text-[11px] text-center text-slate-500">
          Super Deal Online.Store Qatar • Protected Admin Panel
        </p>
      </div>
    </div>
  );
};
