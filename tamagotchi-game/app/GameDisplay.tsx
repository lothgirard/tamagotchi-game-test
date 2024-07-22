import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useActionList, useActionListDispatch, useProgress, useProgressDispatch, useGameState, useGameStateDispatch } from './GameState';
import { stateCache } from 'expo-router/build/getLinkingConfig';
import { waitUntilSymbol } from 'next/dist/server/web/spec-extension/fetch-event';


type Props = {
    Styles: any,
    GameState: any
    setGameState: any
}

export function GameDisplay({Styles, GameState, setGameState}: Props) {
    // const gameState = useGameState();
    // const gameStateDispatch = useGameStateDispatch();


    var output = 'assets/images/game-images/pets/' + GameState[0] + '.png';
    console.log(GameState);
    switch(GameState[0]) {
        case "hatched":
        case "hatching":
            output = 'assets/images/game-images/pets/' + GameState[1] + '.png';
            break;
            //return output; 
        case "hatchingAnim":
            output = 'assets/images/game-images/pets/' + GameState[1] + '_broken.png';
            break;
            //console.log();
            //return output; 
        default: 
            //console.log(gameState[0]);
            //return output;
    }

    // var gameplay = (image) => 
    //     {
    //         console.log("output is " + output);
    //     return (
    //     <View style={Styles.screenLayout}>
    //         <View style={Styles.upperScreen}>
    //             <Text style={Styles.screenText} adjustsFontSizeToFit={true}> 
    //                 {screenPrompt(gameState)}
    //             </Text>
    //         </View>
    //         <View style={Styles.lowerScreen}>
    //             <Text style={Styles.leftText} adjustsFontSizeToFit={true}>
    //                 {leftText(gameState)}
    //             </Text>
    //             <Image style={Styles.pet} source={{uri: image}}/>
    //             <Text style={Styles.rightText} adjustsFontSizeToFit={true}>
    //                 {rightText(gameState)}
    //             </Text>
    //         </View>
    //     </View>
    //     )
    // }

    switch(GameState[0]) {
        case 'stats':
            return stats(GameState);
        case 'collection':
            return collection(GameState);
        case 'credits':
            return credits(GameState);
        default: 
            return gameplay(Styles, GameState, output);
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

function timeHatchAnim(gameState: Array<String>, dispatch: any) {

    
    // useEffect(() => {
    //     if(gameState[0] === "hatchingAnim") {
    //         var action = gameState;
    //         action[0] = "hatched";
    //         console.log(action)
    //         dispatch(action);
    //         const timeOut = setTimeout(() => dispatch(action), 0);

    //         return () => clearTimeout(timeOut);
    //         }
    //     }, [dispatch, gameState]);
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

function gameplay(Styles: any, gameState: any, output: string) {
    return (
    <View style={Styles.screenLayout}>
        <View style={Styles.upperScreen}>
            <Text style={Styles.screenText} adjustsFontSizeToFit={true}> 
                {screenPrompt(gameState)}
            </Text>
        </View>
        <View style={Styles.lowerScreen}>
            <Text style={Styles.leftText} adjustsFontSizeToFit={true}>
                {leftText(gameState)}
            </Text>
            <Image style={Styles.pet} source={{uri: output}}/>
            <Text style={Styles.rightText} adjustsFontSizeToFit={true}>
                {rightText(gameState)}
            </Text>
        </View>
    </View>
    )
}

function getImage(gameState: Array<String>) {
    var output = 'assets/images/game-images/pets/' + gameState[0] + '.png';
    //console.log(gameState);
    switch(gameState[0]) {
        case "hatched":
        case "hatching":
            output = 'assets/images/game-images/pets/' + gameState[1] + '.png';
            return output; 
        case "hatchingAnim":
            output = 'assets/images/game-images/pets/' + gameState[1] + '_broken.png';
            //console.log();
            return output; 
        default: 
            //console.log(gameState[0]);
            return output;
    }
    var output = 'assets/images/game-images/pets/' + gameState[0] + '.png';
    console.log(output);
    return output;
}


