import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  phone?: string;
  avatar_url?: string;
  role: 'customer' | 'admin' | 'super_admin';
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  session: Session | null;
  isAdmin: boolean;
  isLoading: boolean;
  signUp: (email: string, password: string, fullName: string, phone: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null; isAdmin?: boolean }>;
  adminSignIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_USER_KEY = 'superdeal_demo_user_v1';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch or setup profile
  const fetchUserProfile = async (userId: string, email: string) => {
    if (!isSupabaseConfigured) return;
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (data && !error) {
        setUserProfile(data as UserProfile);
      } else {
        // Fallback default profile
        setUserProfile({
          id: userId,
          email,
          role: 'customer',
        });
      }
    } catch (e) {
      console.error('Error fetching user profile:', e);
    }
  };

  useEffect(() => {
    if (isSupabaseConfigured) {
      // 1. Initial Session Check
      supabase.auth.getSession().then(({ data: { session: initSession } }) => {
        setSession(initSession);
        setUser(initSession?.user ?? null);
        if (initSession?.user) {
          fetchUserProfile(initSession.user.id, initSession.user.email || '');
        }
        setIsLoading(false);
      });

      // 2. Auth State Change Listener
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        if (currentSession?.user) {
          await fetchUserProfile(currentSession.user.id, currentSession.user.email || '');
        } else {
          setUserProfile(null);
        }
        setIsLoading(false);
      });

      return () => {
        subscription.unsubscribe();
      };
    } else {
      // Fallback local demo mode
      try {
        const saved = localStorage.getItem(LOCAL_USER_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          setUserProfile(parsed);
        }
      } catch (e) {
        console.error('Error loading local user profile', e);
      }
      setIsLoading(false);
    }
  }, []);

  // Customer Signup
  const signUp = async (email: string, password: string, fullName: string, phone: string) => {
    if (!isSupabaseConfigured) {
      const mockProfile: UserProfile = {
        id: `usr-${Date.now()}`,
        email,
        full_name: fullName,
        phone,
        role: 'customer',
      };
      setUserProfile(mockProfile);
      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(mockProfile));
      return { error: null };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone: phone,
            role: 'customer',
          },
        },
      });

      if (error) return { error };

      if (data.user) {
        setUserProfile({
          id: data.user.id,
          email: data.user.email || email,
          full_name: fullName,
          phone,
          role: 'customer',
        });
      }

      return { error: null };
    } catch (e: any) {
      return { error: e };
    }
  };

  // Customer / General Sign In
  const signIn = async (email: string, password: string) => {
    if (!isSupabaseConfigured) {
      const isDemoAdmin = email === 'admin@superdeal.store' && password === 'admin123';
      const role = isDemoAdmin ? 'admin' : 'customer';
      const mockProfile: UserProfile = {
        id: isDemoAdmin ? 'admin-1' : `usr-${Date.now()}`,
        email,
        full_name: isDemoAdmin ? 'Super Deal Administrator' : 'Customer in Qatar',
        role,
      };
      setUserProfile(mockProfile);
      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(mockProfile));
      return { error: null, isAdmin: isDemoAdmin };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) return { error, isAdmin: false };

      if (data.user) {
        // Fetch role from users table
        const { data: profile } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single();

        const role = profile?.role || 'customer';
        const userProf: UserProfile = profile || {
          id: data.user.id,
          email: data.user.email || email,
          role,
        };
        setUserProfile(userProf);

        const isAdmin = role === 'admin' || role === 'super_admin';
        return { error: null, isAdmin };
      }

      return { error: null, isAdmin: false };
    } catch (e: any) {
      return { error: e, isAdmin: false };
    }
  };

  // Admin Sign In
  const adminSignIn = async (email: string, password: string) => {
    const res = await signIn(email, password);
    if (res.error) return { error: res.error };
    
    // Validate if the authenticated user has admin role
    if (!res.isAdmin && isSupabaseConfigured) {
      // Check admins table specifically
      if (user) {
        const { data: adminRecord } = await supabase
          .from('admins')
          .select('*')
          .eq('user_id', user.id)
          .single();
        if (adminRecord) {
          setUserProfile((prev) => prev ? { ...prev, role: 'admin' } : null);
          return { error: null };
        }
      }
      return { error: new Error('Access denied: You do not have administrator privileges.') };
    }

    return { error: null };
  };

  // Sign Out
  const signOut = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setSession(null);
    setUserProfile(null);
    localStorage.removeItem(LOCAL_USER_KEY);
  };

  // Reset Password
  const resetPassword = async (email: string) => {
    if (!isSupabaseConfigured) {
      return { error: null };
    }
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      return { error };
    } catch (e: any) {
      return { error: e };
    }
  };

  const isAdmin = userProfile?.role === 'admin' || userProfile?.role === 'super_admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        session,
        isAdmin,
        isLoading,
        signUp,
        signIn,
        adminSignIn,
        signOut,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
