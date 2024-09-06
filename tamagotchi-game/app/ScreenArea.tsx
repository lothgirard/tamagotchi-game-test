import React, { useEffect, useContext, useState } from 'react';
import { ImageBackground, Text, View, Image, Pressable } from 'react-native';
import { useActionList, useActionListDispatch, useProgress, useProgressDispatch, useGameState, useGameStateDispatch, GameStateContext, GameStateDispatchContext } from './GameState';
import { GameDisplay, leftButton, rightButton } from './GameDisplay'; 

type Props = {
    Styles: any,
    GameState: any
    setGameState: any
}

const LeftArrow = (hover: boolean) => hover ? require("../assets/images/game-images/pressed/left.png") : require( "../assets/images/game-images/left-arrow.png");
const RightArrow = (hover: boolean) => hover ? require("../assets/images/game-images/pressed/right.png") : require( "../assets/images/game-images/right-arrow.png");

export function ScreenArea({Styles}) {
    var gameState = useContext(GameStateContext);
    var gameStateDispatch = useContext(GameStateDispatchContext);

    var [leftHover, setLeftHover] = useState(false);
    var [rightHover, setRightHover] = useState(false);
    //console.log("ScreenArea: " + gameState);
    return (
        <View style={Styles.screenArea}> 
            <Pressable style={Styles.arrowPressable} onPress={() => leftButton(gameState, gameStateDispatch)} onHoverIn={() => setLeftHover(true)} onHoverOut={() => setLeftHover(false)}>
                <Image source={LeftArrow(leftHover)} style={ Styles.arrow }/>
            </Pressable>
            <Pressable>
                <ImageBackground source={require( "../assets/images/game-images/window.png")} style={ Styles.screen } resizeMode='contain'>
                    <GameDisplay Styles={Styles}/>
                </ImageBackground>
            </Pressable>
            <Pressable style={Styles.arrowPressable} onPress={() => rightButton(gameState, gameStateDispatch)} onHoverIn={() => setRightHover(true)} onHoverOut={() => setRightHover(false)}>
                <Image source={RightArrow(rightHover)} style={ Styles.arrow }/>
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

