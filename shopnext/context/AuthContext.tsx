"use client";

import { createContext, useContext, useEffect, useState } from "react";

/* ─── Types ─────────────────────────────────────────────── */
export interface ShippingInfo {
  fullName: string;
  phone: string;
  address: string;
  ward: string;
  district: string;
  city: string;
}

export interface User {
  id: string;
  name: string;
  email: string;        // also used as username key
  avatar: string;       // emoji
  phone: string;
  role: "admin" | "user";
  shippingInfo?: ShippingInfo;
}

interface StoredAccount extends User {
  password: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (emailOrUsername: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  loginWithSocial: (provider: "google" | "facebook") => void;
  register: (name: string, email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  updateShipping: (info: ShippingInfo) => void;
}

/* ─── Seed accounts ─────────────────────────────────────── */
const SEED_ACCOUNTS: StoredAccount[] = [
  { id: "admin-1", name: "Administrator", email: "admin",             avatar: "🛡️", phone: "", role: "admin", password: "admin" },
  { id: "admin-2", name: "Administrator", email: "admin@shopnext.vn", avatar: "🛡️", phone: "", role: "admin", password: "admin" },
  { id: "demo-1",  name: "Demo User",     email: "demo@shopnext.vn",  avatar: "🛍️", phone: "", role: "user",  password: "demo123" },
  { id: "u-khoa",  name: "Hoàng Thái Đăng Khoa", email: "khoa@shopnext.vn",  avatar: "👨‍💻", phone: "", role: "user", password: "123456" },
  { id: "u-thai",  name: "Tạ Đình Quốc Thái",    email: "thai@shopnext.vn",  avatar: "👨‍💻", phone: "", role: "user", password: "123456" },
  { id: "u-hoang", name: "Nguyễn Huy Hoàng",     email: "hoang@shopnext.vn", avatar: "👨‍💻", phone: "", role: "user", password: "123456" },
];

const ACCOUNTS_KEY = "shopnext_accounts";
const USER_KEY     = "shopnext_user";

function loadAccounts(): StoredAccount[] {
  if (typeof window === "undefined") return SEED_ACCOUNTS;
  const raw = localStorage.getItem(ACCOUNTS_KEY);
  const stored: StoredAccount[] = raw ? JSON.parse(raw) : [];
  // Merge seed accounts (by id) with user-registered ones
  const ids = new Set(stored.map((a) => a.id));
  const merged = [...SEED_ACCOUNTS.filter((s) => !ids.has(s.id)), ...stored];
  return merged;
}

function saveAccounts(accounts: StoredAccount[]) {
  // Only persist non-seed (registered) accounts
  const seeds = new Set(SEED_ACCOUNTS.map((s) => s.id));
  const toSave = accounts.filter((a) => !seeds.has(a.id));
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(toSave));
}

/* ─── Context ────────────────────────────────────────────── */
const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser]       = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem(USER_KEY);
    if (raw) setUser(JSON.parse(raw));
    setIsLoading(false);
  }, []);

  const persistUser = (u: User) => {
    localStorage.setItem(USER_KEY, JSON.stringify(u));
    setUser(u);
  };

  /* Login with email/username + password */
  const login = async (emailOrUsername: string, password: string): Promise<{ ok: boolean; error?: string }> => {
    await new Promise((r) => setTimeout(r, 700));
    const accounts = loadAccounts();
    const match = accounts.find(
      (a) =>
        (a.email.toLowerCase() === emailOrUsername.toLowerCase() ||
         a.email.split("@")[0].toLowerCase() === emailOrUsername.toLowerCase()) &&
        a.password === password
    );
    if (!match) return { ok: false, error: "Email/tên đăng nhập hoặc mật khẩu không đúng" };
    const { password: _pw, ...userData } = match;
    persistUser(userData);
    return { ok: true };
  };

  /* Social mock login */
  const loginWithSocial = (provider: "google" | "facebook") => {
    const names = {
      google:   ["Google User", "Người dùng Google"],
      facebook: ["Facebook User", "Người dùng Facebook"],
    };
    const name   = names[provider][Math.floor(Math.random() * 2)];
    const avatar = provider === "google" ? "🔵" : "📘";
    const u: User = {
      id: `${provider}-${Date.now()}`,
      name,
      email: `${provider}_${Date.now()}@social.vn`,
      avatar,
      phone: "",
      role: "user",
    };
    persistUser(u);
  };

  /* Register */
  const register = async (name: string, email: string, password: string): Promise<{ ok: boolean; error?: string }> => {
    await new Promise((r) => setTimeout(r, 600));
    const accounts = loadAccounts();
    const exists = accounts.some((a) => a.email.toLowerCase() === email.toLowerCase());
    if (exists) return { ok: false, error: "Email này đã được đăng ký" };

    const newAccount: StoredAccount = {
      id: `u-${Date.now()}`,
      name,
      email,
      avatar: "🙂",
      phone: "",
      role: "user",
      password,
    };
    const updated = [...accounts, newAccount];
    saveAccounts(updated);
    const { password: _pw, ...userData } = newAccount;
    persistUser(userData);
    return { ok: true };
  };

  /* Update profile */
  const updateProfile = (data: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    persistUser(updated);

    // Also update in accounts store if registered user
    const accounts = loadAccounts();
    const idx = accounts.findIndex((a) => a.id === user.id);
    if (idx !== -1) {
      accounts[idx] = { ...accounts[idx], ...data };
      saveAccounts(accounts);
    }
  };

  /* Update shipping info */
  const updateShipping = (info: ShippingInfo) => {
    if (!user) return;
    const updated = { ...user, shippingInfo: info };
    persistUser(updated);
  };

  const logout = () => {
    localStorage.removeItem(USER_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, loginWithSocial, register, logout, updateProfile, updateShipping }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
