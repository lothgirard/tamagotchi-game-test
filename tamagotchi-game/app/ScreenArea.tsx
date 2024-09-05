import React, { useEffect, useContext } from 'react';
import { ImageBackground, Text, View, Image, Pressable } from 'react-native';
import { useActionList, useActionListDispatch, useProgress, useProgressDispatch, useGameState, useGameStateDispatch, GameStateContext, GameStateDispatchContext } from './GameState';
import { GameDisplay, leftButton, rightButton } from './GameDisplay'; 

type Props = {
    Styles: any,
    GameState: any
    setGameState: any
}

export function ScreenArea({Styles}) {
    var gameState = useContext(GameStateContext);
    var gameStateDispatch = useContext(GameStateDispatchContext);

    //console.log("ScreenArea: " + gameState);
    return (
        <View style={Styles.upperDisplay}> 
            <Pressable onPress={() => leftButton(gameState, gameStateDispatch)}>
                <Image source={require( "../assets/images/game-images/left-arrow.png")} style={ Styles.arrow }/>
            </Pressable>
            <Pressable>
                <ImageBackground source={require( "../assets/images/game-images/window.png")} style={ Styles.screen } resizeMode='contain'>
                    <GameDisplay Styles={Styles}/>
                </ImageBackground>
            </Pressable>
            <Pressable onPress={() => rightButton(gameState, gameStateDispatch)}>
                <Image source={require( "../assets/images/game-images/right-arrow.png")} style={ Styles.arrow }/>
            </Pressable>
        </View>
    );
}



// function selectOption(gameState: any, dispatch: any) {
//     //console.log("select!");
//     var action = { ...gameState};
//     switch(gameState.state) {
//         case "options":
//             action.newState = "return";
//         default:
//             action.newState = "options";
   
//     }
//     dispatch(action);
// }

