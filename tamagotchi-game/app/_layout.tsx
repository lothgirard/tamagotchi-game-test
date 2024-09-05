import { Stack } from "expo-router";
import { useFonts } from "expo-font";

export default function RootLayout() 
{
  const [loaded, error] = useFonts({
    'Tama-Connect': require('../assets/fonts/tamaconnecttype.ttf'),
    //'Redensek': require('../assets/fonts/REDENSEK.TTF'),
    'Press-Start': require('../assets/fonts/PressStart2P-Regular.ttf')
  });
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
