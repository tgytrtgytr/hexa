import { Stack } from "expo-router";

export const options = {
  headerShown: false,
};

export default function RootLayout() {
  return (
      <Stack
          screenOptions={{
            headerShown: false, // <-- Globally hides all headers
          }}
      />
  );
}
