import { createContext, useContext, useState, ReactNode } from "react";

export type StoreTheme = "modern" | "minimal" | "classic" | "vibrant";

interface StoreThemeContextType {
  theme: StoreTheme;
  setTheme: (theme: StoreTheme) => void;
  heroConfig: {
    title: string;
    subtitle: string;
    bannerImage: string;
    showBanner: boolean;
  };
  setHeroConfig: (config: Partial<StoreThemeContextType["heroConfig"]>) => void;
}

const StoreThemeContext = createContext<StoreThemeContextType | undefined>(undefined);

export function StoreThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<StoreTheme>("modern");
  const [heroConfig, setHeroConfigState] = useState({
    title: "স্বাগতম আমাদের অনলাইন স্টোরে",
    subtitle: "সেরা মানের পণ্য • সাশ্রয়ী মূল্য • দ্রুত ডেলিভারি",
    bannerImage: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=80",
    showBanner: true,
  });

  const setHeroConfig = (config: Partial<typeof heroConfig>) => {
    setHeroConfigState(prev => ({ ...prev, ...config }));
  };

  return (
    <StoreThemeContext.Provider value={{ theme, setTheme, heroConfig, setHeroConfig }}>
      {children}
    </StoreThemeContext.Provider>
  );
}

export function useStoreTheme() {
  const context = useContext(StoreThemeContext);
  if (!context) {
    throw new Error("useStoreTheme must be used within StoreThemeProvider");
  }
  return context;
}
