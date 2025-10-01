
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
  
  const handleThemeChange = (newThemeName: string) => {
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? `${newThemeName}-dark` : `${newThemeName}-light`);
    
    document.body.className = ''; // Clear existing theme classes
    if (isDark) document.body.classList.add('dark');
    if (newThemeName !== 'default') {
      document.body.classList.add(`theme-${newThemeName}`);
    }
  };

  return (
    <div className="grid grid-cols-4 gap-2 py-2">
      {themes.map((t) => {
        const isActive = theme?.startsWith(t.name);
        return (
          <div key={t.name} className="space-y-1">
            <button
              onClick={() => handleThemeChange(t.name)}
              className={cn(
                "relative w-full aspect-square rounded-md border-2 flex items-center justify-center",
                isActive ? "border-primary" : "border-transparent"
              )}
              aria-label={`Select ${t.name} theme`}
            >
              <div className="w-full h-full rounded-sm overflow-hidden">
                  <div className="h-1/2 w-full" style={{ backgroundColor: `hsl(${t.light.background})` }}></div>
                  <div className="h-1/2 w-full" style={{ backgroundColor: `hsl(${t.dark.background})` }}></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center gap-1">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: `hsl(${t.light.primary})` }}></div>
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: `hsl(${t.dark.primary})` }}></div>
              </div>
              {isActive && (
                <div className="absolute top-0.5 right-0.5 bg-primary text-primary-foreground rounded-full p-px">
                  <Check className="w-2.5 h-2.5" />
                </div>
              )}
            </button>
            <p className="text-center text-[10px] capitalize">{t.name.replace('-', ' ')}</p>
          </div>
        )
      })}
    </div>
  );
}
