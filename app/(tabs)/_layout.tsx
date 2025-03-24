import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View, StatusBar, StyleSheet } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() { 
  const colorScheme = useColorScheme();

  return (
    <>
      <View
          style={[
            styles.statusBarContainer,
            { backgroundColor: colorScheme === 'dark' ? '#333' : '#ffffff' }
          ]}
      ></View>
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'To-Do App',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Credits',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
    </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  statusBarContainer: {
    height: Platform.OS === 'ios' ? 44 : StatusBar.currentHeight,
  },
})
