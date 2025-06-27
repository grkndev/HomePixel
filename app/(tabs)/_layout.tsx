import TabBarComponent from '@/components/ui/Tabbar';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (

    <Tabs
      tabBar={(props) => <TabBarComponent {...props} />}

      screenOptions={{
        animation: "fade",
        sceneStyle: { backgroundColor: "#09090b" },

        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: "#FA0250",

        headerShown: false,
        tabBarStyle: {
          height: 64,
          alignItems: 'center',
          justifyContent: 'center',
        },
      }} />

  );
}