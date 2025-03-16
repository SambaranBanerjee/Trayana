import { Stack } from "expo-router";

export default function RootLayout() {
  return (
  <Stack>
    <Stack.Screen
      name="(tabs)"
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="index"
      options={{
        title: "Disaster Management System",
      }}
    />
    <Stack.Screen
      name="search"
      options={{
        title: "Search for NGOs",
      }}
    />
  </Stack>
    )}
