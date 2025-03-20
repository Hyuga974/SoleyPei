import { Stack } from 'expo-router';

export default function SearchLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#121B41',
        },
        headerTintColor: '#fff',
      }}
    >
      {/* Écran principal de recherche */}
      <Stack.Screen
        name="index"
        options={{
          title: 'Search a city',
          headerShown: false,
        }}
      />

      {/* Écran de détails */}
      <Stack.Screen
        name="cityInfo"
        options={{
          title: 'Details',
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}