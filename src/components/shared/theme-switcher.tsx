"use client"

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { themes } from "@/app/lib/themes";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  
  const handleThemeChange = (newTheme: string, newMode: 'light' | 'dark') => {
    const selectedTheme = themes.find(t => t.name === newTheme);
    if (selectedTheme) {
      document.body.classList.remove('theme-rose'); // Remove default if present
      document.body.classList.remove(...themes.map(t => `theme-${t.name}`));
      document.body.classList.add(`theme-${newTheme}`);

      if (newMode === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      const colors = newMode === 'dark' ? selectedTheme.dark : selectedTheme.light;
      
      Object.entries(colors).forEach(([key, value]) => {
          document.documentElement.style.setProperty(`--${key}`, value);
      });
      
      setTheme(`${newTheme}-${newMode}`);
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {themes.map((t) => (
        <div key={t.name} className="space-y-2">
          <button
            onClick={() => handleThemeChange(t.name, theme?.endsWith('dark') ? 'dark' : 'light')}
            className={cn(
              "relative w-full aspect-[4/3] rounded-lg border-2 flex items-center justify-center",
              theme?.startsWith(t.name) ? "border-primary" : "border-transparent"
            )}
          >
             <div className="w-full h-full rounded-md overflow-hidden">
                <div className="h-1/2 w-full" style={{ backgroundColor: `hsl(${t.light.background})` }}></div>
                <div className="h-1/2 w-full" style={{ backgroundColor: `hsl(${t.dark.background})` }}></div>
             </div>
             <div className="absolute inset-0 flex items-center justify-center gap-1">
                 <div className="h-5 w-5 rounded-full" style={{ backgroundColor: `hsl(${t.light.primary})` }}></div>
                 <div className="h-5 w-5 rounded-full" style={{ backgroundColor: `hsl(${t.dark.primary})` }}></div>
             </div>
            {theme?.startsWith(t.name) && (
              <div className="absolute top-1 right-1 bg-primary text-primary-foreground rounded-full p-0.5">
                <Check className="w-3 h-3" />
              </div>
            )}
          </button>
          <p className="text-center text-xs capitalize">{t.name.replace('-', ' ')}</p>
        </div>
      ))}
    </div>
  );
}
