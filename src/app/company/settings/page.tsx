
import { Suspense } from 'react';
import { SettingsTabs } from '@/components/company/settings-tabs';
import Loading from './loading';

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>
      <Suspense fallback={<Loading />}>
        <SettingsTabs />
      </Suspense>
    </div>
  );
}
