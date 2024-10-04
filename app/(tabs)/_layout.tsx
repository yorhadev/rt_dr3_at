import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useTheme } from "react-native-paper";

export default function TabsLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurface,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="home"
              size={24}
              color={focused ? theme.colors.primary : theme.colors.onSurface}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="bookmark"
        options={{
          title: "Bookmark",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="bookmark"
              size={24}
              color={focused ? theme.colors.primary : theme.colors.onSurface}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="plus-circle"
              size={24}
              color={focused ? theme.colors.primary : theme.colors.onSurface}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="user"
              size={24}
              color={focused ? theme.colors.primary : theme.colors.onSurface}
            />
          ),
        }}
      />
    </Tabs>
  );
}
