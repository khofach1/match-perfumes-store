"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { User, Session } from "@supabase/supabase-js";
import { supabaseClient } from "@/lib/supabase-client";

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  /** True only briefly on /account while the session is being read from storage.
   *  Cart, checkout, and all other store pages never need to check this. */
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // Read the stored session (from localStorage — no network request).
    // Always resolves quickly; the .catch() ensures loading never hangs.
    supabaseClient.auth
      .getSession()
      .then(({ data: { session } }) => {
        if (!mounted) return;
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      })
      .catch(() => {
        // Supabase unavailable or misconfigured — unblock loading so the
        // account page shows the login form instead of an infinite spinner.
        if (!mounted) return;
        setLoading(false);
      });

    // Stay in sync with sign-in / sign-out events.
    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      setSession(session);
      setUser(session?.user ?? null);
      // Also clears loading if onAuthStateChange fires before getSession resolves.
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });
    return { error: error?.message ?? null };
  };

  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password,
    });
    if (error) return { error: error.message };
    // When email confirmation is enabled in Supabase, signUp returns no session.
    // Signal the caller to show a "check your email" message.
    if (!data.session) return { error: "CHECK_EMAIL" };
    return { error: null };
  };

  const signOut = async () => {
    await supabaseClient.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
