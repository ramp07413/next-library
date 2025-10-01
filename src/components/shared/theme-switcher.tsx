
"use client"

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { themes } from "@/app/lib/themes";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export function ThemeSwitcher() {
  const { theme: activeTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  
  const handleThemeChange = (newThemeName: string) => {
    const isDark = activeTheme?.includes('dark');
    setTheme(isDark ? `${newThemeName}-dark` : newThemeName);
  };

  const getBaseTheme = (theme: string | undefined) => {
    return theme?.split('-')[0] || 'default';
  }

  return (
    <div className="grid grid-cols-4 gap-2 py-2">
      {themes.map((t) => {
        const isActive = getBaseTheme(activeTheme) === t.name;
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
              <div className="w-full h-full rounded-sm overflow-hidden flex items-center justify-center" style={{ backgroundColor: `hsl(${t.light.background})` }}>
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: `hsl(${t.light.primary})` }}></div>
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
