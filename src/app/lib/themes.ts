export type Theme = {
  name: string;
  light: Record<string, string>;
  dark: Record<string, string>;
};

export const themes: Theme[] = [
  {
    name: 'default',
    light: {
      background: '210 40% 98%',
      foreground: '222.2 84% 4.9%',
      primary: '224 100% 58%',
      'primary-foreground': '210 40% 98%',
    },
    dark: {
      background: '222.2 84% 4.9%',
      foreground: '210 40% 98%',
      primary: '224 100% 58%',
      'primary-foreground': '210 40% 98%',
    },
  },
  {
    name: 'rose',
    light: {
      background: '0 0% 100%',
      foreground: '0 0% 3.9%',
      primary: '346.8 77.2% 49.8%',
      'primary-foreground': '0 0% 98%',
    },
    dark: {
      background: '0 0% 3.9%',
      foreground: '0 0% 98%',
      primary: '346.8 77.2% 49.8%',
      'primary-foreground': '0 0% 98%',
    },
  },
  {
    name: 'green',
    light: {
      background: '148 39% 96%',
      foreground: '145 25% 10%',
      primary: '142.1 76.2% 36.3%',
      'primary-foreground': '142.1 76.2% 96.3%',
    },
    dark: {
      background: '145 25% 10%',
      foreground: '148 39% 96%',
      primary: '142.1 76.2% 36.3%',
      'primary-foreground': '142.1 76.2% 96.3%',
    },
  },
  {
    name: 'blue',
    light: {
      background: '205 100% 97%',
      foreground: '215 40% 10%',
      primary: '217.2 91.2% 59.8%',
      'primary-foreground': '210 40% 98%',
    },
    dark: {
      background: '215 40% 10%',
      foreground: '205 100% 97%',
      primary: '217.2 91.2% 59.8%',
      'primary-foreground': '210 40% 98%',
    },
  },
  {
    name: 'orange',
    light: {
      background: '30 100% 97%',
      foreground: '25 35% 10%',
      primary: '24.6 95% 53.1%',
      'primary-foreground': '60 9.1% 97.8%',
    },
    dark: {
      background: '25 35% 10%',
      foreground: '30 100% 97%',
      primary: '24.6 95% 53.1%',
      'primary-foreground': '60 9.1% 97.8%',
    },
  },
  {
    name: 'violet',
    light: {
      background: '260 100% 98%',
      foreground: '265 45% 12%',
      primary: '262.1 83.3% 57.8%',
      'primary-foreground': '210 40% 98%',
    },
    dark: {
      background: '265 45% 12%',
      foreground: '260 100% 98%',
      primary: '262.1 83.3% 57.8%',
      'primary-foreground': '210 40% 98%',
    },
  },
  {
    name: 'teal',
    light: {
      background: '170 60% 97%',
      foreground: '175 40% 10%',
      primary: '173.5 80.4% 39.8%',
      'primary-foreground': '180 100% 97%',
    },
    dark: {
      background: '175 40% 10%',
      foreground: '170 60% 97%',
      primary: '173.5 80.4% 39.8%',
      'primary-foreground': '180 100% 97%',
    },
  },
  {
    name: 'cyan',
    light: {
      background: '190 80% 97%',
      foreground: '195 50% 10%',
      primary: '192.1 93.3% 49.8%',
      'primary-foreground': '200 100% 97%',
    },
    dark: {
      background: '195 50% 10%',
      foreground: '190 80% 97%',
      primary: '192.1 93.3% 49.8%',
      'primary-foreground': '200 100% 97%',
    },
  },
  {
    name: 'slate',
    light: {
      background: '215 30% 97%',
      foreground: '220 20% 10%',
      primary: '220 13% 46%',
      'primary-foreground': '210 40% 98%',
    },
    dark: {
      background: '220 20% 10%',
      foreground: '215 30% 97%',
      primary: '210 10% 63%',
      'primary-foreground': '222.2 47.4% 11.2%',
    },
  },
  {
    name: 'stone',
    light: {
      background: '40 10% 97%',
      foreground: '30 10% 10%',
      primary: '30 6% 45%',
      'primary-foreground': '40 10% 98%',
    },
    dark: {
      background: '30 10% 10%',
      foreground: '40 10% 97%',
      primary: '40 5% 65%',
      'primary-foreground': '30 10% 15%',
    },
  },
  {
    name: 'gray',
    light: {
      background: '220 10% 97%',
      foreground: '220 10% 10%',
      primary: '220 9% 46%',
      'primary-foreground': '210 40% 98%',
    },
    dark: {
      background: '220 10% 10%',
      foreground: '220 10% 97%',
      primary: '210 9% 64%',
      'primary-foreground': '222.2 47.4% 11.2%',
    },
  },
  {
    name: 'zinc',
    light: {
      background: '240 6% 97%',
      foreground: '240 6% 10%',
      primary: '240 5.2% 46.1%',
      'primary-foreground': '240 5.9% 98%',
    },
    dark: {
      background: '240 6% 10%',
      foreground: '240 6% 97%',
      primary: '240 5.2% 65.1%',
      'primary-foreground': '240 5.9% 10%',
    },
  },
  {
    name: 'neutral',
    light: {
      background: '0 0% 97%',
      foreground: '0 0% 9%',
      primary: '0 0% 45.1%',
      'primary-foreground': '0 0% 98%',
    },
    dark: {
      background: '0 0% 9%',
      foreground: '0 0% 97%',
      primary: '0 0% 63.9%',
      'primary-foreground': '0 0% 10%',
    },
  },
  {
    name: 'red',
    light: {
      background: '0 80% 97%',
      foreground: '0 50% 10%',
      primary: '0 72.2% 50.6%',
      'primary-foreground': '0 85.7% 97.3%',
    },
    dark: {
      background: '0 50% 10%',
      foreground: '0 80% 97%',
      primary: '0 72.2% 50.6%',
      'primary-foreground': '0 85.7% 97.3%',
    },
  },
  {
    name: 'yellow',
    light: {
      background: '50 100% 97%',
      foreground: '45 50% 10%',
      primary: '47.9 95.8% 53.1%',
      'primary-foreground': '26 83.3% 14.1%',
    },
    dark: {
      background: '45 50% 10%',
      foreground: '50 100% 97%',
      primary: '47.9 95.8% 53.1%',
      'primary-foreground': '26 83.3% 14.1%',
    },
  },
  {
    name: 'lime',
    light: {
      background: '90 100% 97%',
      foreground: '85 50% 10%',
      primary: '83.3 81.6% 41.2%',
      'primary-foreground': '40 90% 98%',
    },
    dark: {
      background: '85 50% 10%',
      foreground: '90 100% 97%',
      primary: '83.3 81.6% 41.2%',
      'primary-foreground': '40 90% 98%',
    },
  },
  {
    name: 'emerald',
    light: {
      background: '150 100% 97%',
      foreground: '145 50% 10%',
      primary: '145.1 82.2% 36.3%',
      'primary-foreground': '150 90% 98%',
    },
    dark: {
      background: '145 50% 10%',
      foreground: '150 100% 97%',
      primary: '145.1 82.2% 36.3%',
      'primary-foreground': '150 90% 98%',
    },
  },
  {
    name: 'indigo',
    light: {
      background: '225 100% 97%',
      foreground: '230 50% 10%',
      primary: '221.2 83.2% 53.3%',
      'primary-foreground': '220 90% 98%',
    },
    dark: {
      background: '230 50% 10%',
      foreground: '225 100% 97%',
      primary: '221.2 83.2% 53.3%',
      'primary-foreground': '220 90% 98%',
    },
  },
  {
    name: 'fuchsia',
    light: {
      background: '320 100% 97%',
      foreground: '315 50% 10%',
      primary: '322.2 83.2% 53.3%',
      'primary-foreground': '320 90% 98%',
    },
    dark: {
      background: '315 50% 10%',
      foreground: '320 100% 97%',
      primary: '322.2 83.2% 53.3%',
      'primary-foreground': '320 90% 98%',
    },
  },
  {
    name: 'pink',
    light: {
      background: '340 100% 97%',
      foreground: '335 50% 10%',
      primary: '340.2 83.2% 53.3%',
      'primary-foreground': '340 90% 98%',
    },
    dark: {
      background: '335 50% 10%',
      foreground: '340 100% 97%',
      primary: '340.2 83.2% 53.3%',
      'primary-foreground': '340 90% 98%',
    },
  },
];
