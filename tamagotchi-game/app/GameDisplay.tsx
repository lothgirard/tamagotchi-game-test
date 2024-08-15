import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useActionList, useActionListDispatch, useProgress, useProgressDispatch, useGameState, useGameStateDispatch } from './GameState';
import { stateCache } from 'expo-router/build/getLinkingConfig';
import { stringifyCookie } from 'next/dist/compiled/@edge-runtime/cookies';


export function GameDisplay({Styles}) {
    var gameState = useGameState();
    var gameStateDispatch = useGameStateDispatch();

    switch(gameState[0]) {
        case 'stats':
            return stats(gameState);
        case 'collection':
            return collection(gameState, Styles);
        case 'credits':
            return credits(gameState);
        default: 
            return ( gameplay(Styles, gameState, gameStateDispatch) );
    }
}


function screenPrompt(gameState: Array<String>) {
    //console.log(gameState[0]);
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

function miniOutput(collected: Array<Number>, num: number, styles) {
    if(collected.includes(num)) {
        return (<Image style={styles.collected} source={{uri: 'assets/images/game-images/pets/pet_' + String(num)}} />);
    } else {
        return (<Image style={styles.notCollected} source={{uri: 'assets/images/game-images/pets/pet_' + String(num)}} />);
    }
}

function collection(gameState: Array<String>, styles) {

    return (<View></View>);
}

function credits(gameState: Array<String>) {
    return (<View></View>);
}

function gameplay(Styles, gameState: Array<String>, gameStateDispatch: any) {
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
            <Image style={Styles.pet} source={{uri: getImage(gameState, gameStateDispatch)}}/>
            <Text style={Styles.rightText}>
                {rightText(gameState)}
            </Text>
        </View>
    </View>
    )
}

function getImage(gameState: Array<String>, gameStateDispatch: any) {
    var output = 'assets/images/game-images/pets/' + gameState[0] + '.png';
    //console.log(gameState);
    switch(gameState[0]) {
        case "hatching":
            output = 'assets/images/game-images/pets/' + gameState[1] + '.png';
            break;
        case "hatchingAnim":
            output = 'assets/images/game-images/pets/' + gameState[1] + '_broken.png';
            var action = gameState.slice();
            action[0] = "hatched";
            setTimeout(() => {gameStateDispatch(action)}, 0);
            break;
        default: 

    }
    return output;
    // var output = 'assets/images/game-images/pets/' + gameState[0] + '.png';
    // console.log(output);
    // return output;
}