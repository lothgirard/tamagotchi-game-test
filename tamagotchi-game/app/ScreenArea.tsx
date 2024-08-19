import React, { useEffect, useContext } from 'react';
import { ImageBackground, Text, View, Image, Pressable } from 'react-native';
import { useActionList, useActionListDispatch, useProgress, useProgressDispatch, useGameState, useGameStateDispatch, GameStateContext, GameStateDispatchContext } from './GameState';
import { confirmName, resetName, GameDisplay } from './GameDisplay'; 

type Props = {
    Styles: any,
    GameState: any
    setGameState: any
}

export function ScreenArea({Styles}) {
    var gameState = useContext(GameStateContext);
    var gameStateDispatch = useContext(GameStateDispatchContext);

    console.log("ScreenArea: " + gameState);


    useEffect(() => { 
        if(gameState.state === "hatchingAnim") {
            console.log("bleep");
        } else {
            console.log("bloop");
        }
    }, [gameState]);
    //console.log(GameState)
    return (
        <View style={Styles.upperDisplay}> 
            <Pressable onPress={() => leftButton(gameState, gameStateDispatch)}>
                <Image source={{uri: "assets/images/game-images/left-arrow.png"}} style={ Styles.arrow }/>
            </Pressable>
            <Pressable>
                <ImageBackground source={{uri: "assets/images/game-images/window.png"}} style={ Styles.screen } resizeMode='contain'>
                    <GameDisplay Styles={Styles}/>
                </ImageBackground>
            </Pressable>
            <Pressable onPress={() => rightButton(gameState, gameStateDispatch)}>
                <Image source={{uri: "assets/images/game-images/right-arrow.png"}} style={ Styles.arrow }/>
            </Pressable>
        </View>
    );
}

function leftButton(gameState: any, dispatch: any) {
    console.log("left!");
    var action = { ...gameState};
    switch(gameState.state) {
        case "hatching":
            action.newState = "hatchingAnim";
            break;
        case "confirmEgg":
            action.newState = "eggConfirmed";
            break; 
        case "pickName":
            return confirmName(gameState, dispatch);
        default: 
            return;          
    }
    dispatch(action);
}


function rightButton(gameState: any, dispatch: any) {
    console.log("right!");
    var action = { ...gameState};
    switch(gameState.state) {
        case "hatching":
            action.newState = "unhatched";
            break;
        case "confirmEgg":
            action.newState = "eggRejected";
            break;
        case "pickName":
            return resetName();
        default:
            return;
    }
    dispatch(action);
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

