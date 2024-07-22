import React, { useEffect, useContext } from 'react';
import { ImageBackground, Text, View, Image, Pressable } from 'react-native';
import { useActionList, useActionListDispatch, useProgress, useProgressDispatch, useGameState, useGameStateDispatch, GameStateContext, GameStateDispatchContext } from './GameState';
import { GameDisplay } from './GameDisplay'; 

type Props = {
    Styles: any,
    GameState: any
    setGameState: any
}

export function ScreenArea({Styles, GameState, setGameState}: Props) {
    var gameState = useContext(GameStateContext);
    var gameStateDispatch = useContext(GameStateDispatchContext);

    console.log("ScreenArea: " + GameState);


    useEffect(() => { 
        if(gameState[0] === "hatchingAnim") {
            console.log("bleep");
        } else {
            console.log("bloop");
        }
    }, [gameState]);
    //console.log(GameState)
    return (
        <View style={Styles.upperDisplay}> 
            <Pressable onPress={() => leftButton(GameState, setGameState)}>
                <Image source={{uri: "assets/images/game-images/left-arrow.png"}} style={ Styles.arrow }/>
            </Pressable>
            <Pressable>
                <ImageBackground source={{uri: "assets/images/game-images/window.png"}} style={ Styles.screen } resizeMode='contain'>
                    <GameDisplay Styles={Styles} GameState={GameState} setGameState={setGameState}/>
                </ImageBackground>
            </Pressable>
            <Pressable onPress={() => rightButton(GameState, setGameState)}>
                <Image source={{uri: "assets/images/game-images/right-arrow.png"}} style={ Styles.arrow }/>
            </Pressable>
        </View>
    );
}

function leftButton(gameState: Array<String>, setGameState: any) {
    console.log("left!");
    var action = gameState.slice();
    switch(gameState[0]) {
        case "hatching":
            action[0] = "hatchingAnim";
        default:
            setGameState(action);
    }
}

function rightButton(gameState: Array<String>, setGameState: any) {
    //console.log("right!");
    var action = gameState.slice();
    switch(gameState[0]) {
        case "hatching":
            action[0] = "unhatched";
        default:
            setGameState(action);
    }
}

function selectOption(gameState: Array<String>, setGameState: any) {
    //console.log("select!");
    var action = "";
    switch(gameState[0]) {
        default:
            action = "";
    }
    setGameState(gameState);
}

