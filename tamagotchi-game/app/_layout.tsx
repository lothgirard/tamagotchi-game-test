import { Stack } from "expo-router";
import { useFonts } from "expo-font";

export default function RootLayout() 
{
  const [loaded, error] = useFonts({
    'Tama-Connect': require('../assets/fonts/tamaconnecttype.ttf'),
  });
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
