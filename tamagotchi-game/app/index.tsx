import { useState } from 'react';
import { ImageBackground, Text, View, useWindowDimensions, } from "react-native";
import { GameStateContextProvider } from "./GameState";
import { GenerateStyles } from "./styles"; 
import { ScreenArea } from "./ScreenArea";
import { GameButtons } from "./GameButtons";

export default function Index() {
  const [gameState, setGameState] = useState(['egg_1']);
  const {width, height} = useWindowDimensions();
  const Styles = GenerateStyles(width, height); 
  console.log("index: " + gameState);
  return (
    <GameStateContextProvider>
      <View style={Styles.outerView}>
        <ImageBackground source={{uri: 'assets/images/game-images/tamagotchi-egg.png'}} style={Styles.egg} resizeMode="contain">
          <ScreenArea Styles={Styles} GameState={gameState} setGameState={setGameState}/>
          <GameButtons Styles={Styles} GameState={gameState} setGameState={setGameState} />
        </ImageBackground>
      </View>
    </GameStateContextProvider>
  );
}
