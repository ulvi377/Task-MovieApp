import { MoviesProvider } from "@/context/MoviesContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <MoviesProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#0f172a",
          },
          headerTintColor: "#fff",
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="movie/[id]"
          options={{
            title: "Movie Details",
            headerBackTitle: "Back",
          }}
        />
      </Stack>
    </MoviesProvider>
  );
}
