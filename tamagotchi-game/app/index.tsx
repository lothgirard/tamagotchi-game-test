import { ImageBackground, Text, View, useWindowDimensions } from "react-native";
import { GameStateContextProvider } from "./GameState";
import { GenerateStyles } from "./styles"; 
import { GameDisplay } from "./GameDisplay";
import { GameButtons } from "./GameButtons";

export default function Index() {
  const {width, height} = useWindowDimensions();
  const Styles = GenerateStyles(width, height); 
  return (
    //<View style={Styles.outerView}> 
    <GameStateContextProvider>
      <View style={Styles.outerView}>
        <ImageBackground source={{uri: 'assets/images/game-images/tamagotchi-egg.png'}} style={Styles.egg} resizeMode="contain">
          <GameDisplay Styles={Styles} />
          <GameButtons Styles={Styles} />
        </ImageBackground>
      </View>
    </GameStateContextProvider>
    //</View>
  );
}
