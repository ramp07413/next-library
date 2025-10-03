"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SettingsTabs() {
  return (
    <Tabs defaultValue="profile">
      <TabsList>
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <p>Profile settings will be displayed here.</p>
      </TabsContent>
      <TabsContent value="account">
        <p>Account settings will be displayed here.</p>
      </TabsContent>
      <TabsContent value="notifications">
        <p>Notification settings will be displayed here.</p>
      </TabsContent>
    </Tabs>
  );
}
