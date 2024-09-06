import { useState } from 'react';
import { ImageBackground, Text, View, useWindowDimensions, Pressable, Image } from "react-native";
import { GameStateContextProvider } from "./GameState";
import { GenerateStyles } from "./styles"; 
import { ScreenArea } from "./ScreenArea";
import { GameButtons } from "./GameButtons";
import { Tutorial } from "./Tutorial";
import { stringifyCookie } from 'next/dist/compiled/@edge-runtime/cookies';

const TutorialButton = (hover: boolean) => hover ? require('../assets/images/game-images/tutorial-button-pressed.png') : require('../assets/images/game-images/tutorial-button.png');
const TutorialButtonX = (hover: boolean) => hover ? require('../assets/images/game-images/tutorial-button-x-pressed.png') : require('../assets/images/game-images/tutorial-button-x.png');
const TutorialButtonImage = (tutorialState:boolean, hover: boolean) => tutorialState ? TutorialButtonX(hover) : TutorialButton(hover);

export default function Index() {
  const [gameState, setGameState] = useState(['egg_1']);
  const [tutorialState, setTutorialState] = useState(false);
  const [tutorialHover, setTutorialHover] = useState(false);
  const {width, height} = useWindowDimensions();
  const Styles = GenerateStyles(width, height); 

  var buttonSource = require('../assets/images/game-images/tutorial-button.png');
  if(typeof tutorialState != 'undefined') { TutorialButtonImage(tutorialState, tutorialHover) };


  //var buttonSource = tutorialState ? 'assets/images/game-images/tutorial-button-x.png' : 'assets/images/game-images/tutorial-button.png';
  console.log("index: " + gameState);
  return (
    <GameStateContextProvider>
      <View style={Styles.outerView}>
        <ImageBackground source={require( '../assets/images/game-images/tamagotchi-egg.png')} style={Styles.egg} resizeMode="contain">
          <ScreenArea Styles={Styles}/>
          <GameButtons Styles={Styles}/>
          <Tutorial Styles={Styles} isVisible={tutorialState}/>
          <Pressable style={Styles.tutorialButtonLocation} onPress={() => { setTutorialState(!tutorialState); }} onHoverIn={() => setTutorialHover(true)} onHoverOut={() => setTutorialHover(false)}>           
            <Image style={Styles.tutorialButton} source={TutorialButtonImage(tutorialState, tutorialHover)} resizeMode='contain' />
          </Pressable>
        </ImageBackground>
      </View>
    </GameStateContextProvider>
  );
}

function tutorialScreen(state: boolean, setState: any, styles: any) {
  return (
    <View style={styles.tutorial}>
    <Pressable>
      <Image style={styles.tutorialButton} source={require( '../assets/images/game-images/options-button.png')}/>
    </Pressable>
    </View>
  );
}
