import React from 'react';
import { ImageBackground, Text, View, Image, Pressable } from 'react-native';
import { useActionList, useActionListDispatch, useProgress, useProgressDispatch, useGameState, useGameStateDispatch } from './GameState';
import { GameDisplay } from './GameDisplay'; 

export function ScreenArea({Styles}) {
    var gameState = useGameState();
    var gameStateDispatch = useGameStateDispatch();

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

function leftButton(gameState: Array<String>, dispatch: any) {
    console.log("left!");
    var action = gameState;
    switch(gameState[0]) {
        case "hatching":
            action[0] = "hatched";
        default:
            dispatch(action);
    }
}

function rightButton(gameState: Array<String>, dispatch: any) {
    console.log("right!");
    var action = gameState;
    switch(gameState[0]) {
        case "hatching":
            action[0] = "unhatched";
        default:
            dispatch(action);
    }
}

function selectOption(gameState: Array<String>, dispatch: any) {
    console.log("select!");
    var action = "";
    switch(gameState[0]) {
        default:
            action = "";
    }
    dispatch(action);
}

