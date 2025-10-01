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
    const currentMode = theme?.endsWith('dark') ? 'dark' : 'light';
    const newTheme = themes.find(t => t.name === newThemeName);
    
    if (newTheme) {
      // remove all other theme classes
      for (const t of themes) {
        document.body.classList.remove(`theme-${t.name}`);
      }
      
      // add the new theme class
      if (newThemeName !== 'default') {
        document.body.classList.add(`theme-${newThemeName}`);
      }

      setTheme(`${newThemeName}-${currentMode}`);
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {themes.map((t) => (
        <div key={t.name} className="space-y-2">
          <button
            onClick={() => handleThemeChange(t.name)}
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
