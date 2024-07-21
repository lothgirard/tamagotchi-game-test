import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useActionList, useActionListDispatch, useProgress, useProgressDispatch, useGameState, useGameStateDispatch } from './GameState';
import { stateCache } from 'expo-router/build/getLinkingConfig';


export function GameDisplay({Styles}) {
    var gameState = useGameState();
    var gameStateDispatch = useGameStateDispatch();

    switch(gameState[0]) {
        case 'stats':
            return stats(gameState);
        case 'collection':
            return collection(gameState);
        case 'credits':
            return credits(gameState);
        default: 
            return ( gameplay(Styles, gameState) );
    }
}


function screenPrompt(gameState: Array<String>) {
    console.log(gameState[0]);
    switch(gameState[0]) {
        case "hatching":
            return "Your egg looks ready to hatch! Are you ready?";
        default: 
            return "";
    }
}

function leftText(gameState: Array<String>) {
    switch(gameState[0]) {
        case "hatching":
            return "YES";
        default: 
            return "";
    }
}

function rightText(gameState: Array<String>) {
    switch(gameState[0]) {
        case "hatching":
            return "NO";
        default: 
            return "";
    }
}

function stats(gameState: Array<String>) {
    return (<View></View>);
}

function collection(gameState: Array<String>) {
    return (<View></View>);
}

function credits(gameState: Array<String>) {
    return (<View></View>);
}

function gameplay(Styles, gameState: Array<String>) {
    return (
    <View style={Styles.screenLayout}>
        <View style={Styles.upperScreen}>
            <Text style={Styles.screenText}> 
                {screenPrompt(gameState)}
            </Text>
        </View>
        <View style={Styles.lowerScreen}>
            <Text style={Styles.leftText}>
                {leftText(gameState)}
            </Text>
            <Image style={Styles.pet} source={{uri: getImage(gameState)}}/>
            <Text style={Styles.rightText}>
                {rightText(gameState)}
            </Text>
        </View>
    </View>
    )
}

function getImage(gameState: Array<String>) {
    var output = 'assets/images/game-images/pets/' + gameState[0] + '.png';
    console.log(gameState);
    switch(gameState[0]) {
        case "hatching":
            output = 'assets/images/game-images/pets/' + gameState[1] + '.png';
        default: 
            return output;
    }
    var output = 'assets/images/game-images/pets/' + gameState[0] + '.png';
    console.log(output);
    return output;
}