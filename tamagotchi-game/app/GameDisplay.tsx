import React from 'react';
import { ImageBackground, Text, View, Image, Pressable } from 'react-native';
import { useActionList, useActionListDispatch, useProgress, useProgressDispatch, useGameState, useGameStateDispatch } from './GameState';

export function GameDisplay({Styles}) {
    var gameState = useGameState();
    var gameStateDispatch = useGameStateDispatch();

    return (
        <View style={Styles.upperDisplay}> 
            <Pressable onPress={() => leftButton(gameState, gameStateDispatch)}>
                <Image source={{uri: "assets/images/game-images/left-arrow.png"}} style={ Styles.arrow }/>
            </Pressable>
            <Pressable>
                <Image source={{uri: "assets/images/game-images/tamagotchi-screen.png"}} style={ Styles.screen } resizeMode='contain'/>
            </Pressable>
            <Pressable onPress={() => rightButton(gameState, gameStateDispatch)}>
                <Image source={{uri: "assets/images/game-images/right-arrow.png"}} style={ Styles.arrow }/>
            </Pressable>
        </View>
    );
}

function leftButton(gameState: Array<String>, dispatch: any) {
    console.log("left!");
    var action = "";
    switch(gameState[0]) {
        default:
            action = "";
    }
    dispatch(gameState, action);
}

function rightButton(gameState: Array<String>, dispatch: any) {
    console.log("right!");
    var action = "";
    switch(gameState[0]) {
        default:
            action = "";
    }
    dispatch(gameState, action);
}

function selectOption(gameState: Array<String>, dispatch: any) {
    console.log("select!");
    var action = "";
    switch(gameState[0]) {
        default:
            action = "";
    }
    dispatch(gameState, action);
}
