import { Stack } from 'expo-router';

export default function SearchLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1e90ff',
        },
        headerTintColor: '#fff',
      }}
    >
      {/* Écran principal de recherche */}
      <Stack.Screen
        name="index"
        options={{
          title: 'Recherche de villes',
          headerShown: false,
        }}
      />

      {/* Écran de détails */}
      <Stack.Screen
        name="cityInfo"
        options={{
          title: 'Détails de la ville',
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}