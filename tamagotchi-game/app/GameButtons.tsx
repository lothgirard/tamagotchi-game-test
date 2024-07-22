import React from 'react';
import { View, Image, Pressable } from 'react-native';
import { useActionList, useActionListDispatch, useProgress, useProgressDispatch, useGameState, useGameStateDispatch } from './GameState';

export function GameButtons({Styles,  GameState, setGameState, actionList, setActionList}) {

    var dispatch = useActionListDispatch();
    var actions = useActionList();

    var gameStateDispatch = useGameStateDispatch();
    var gameState = useGameState();

    return (
        <View style={Styles.buttonColumns}>
                <View style={Styles.buttonRow}>
                    <Pressable onPress={() => froggyFunction("pet", actionList, setActionList, GameState, setGameState)}>
                        <View> 
                            <Image source={{uri: 'assets/images/game-images/pet-button.png'}} style={Styles.bigButton} resizeMode='contain'/>
                        </View>
                    </Pressable>
                    <Pressable onPress={() => froggyFunction("play", actionList, setActionList, GameState, setGameState)}>
                        <Image source={{uri: 'assets/images/game-images/play-button.png'}} style={Styles.bigButton} resizeMode='contain'/>
                    </Pressable>
                </View>
                <View style={Styles.buttonRow}>
                    <Pressable onPress={() => froggyFunction("gift", actionList, setActionList, GameState, setGameState)}>
                        <Image source={{uri: 'assets/images/game-images/gift-button.png'}} style={Styles.bigButton} resizeMode='contain'/>
                    </Pressable>
                    <Pressable onPress={() => froggyFunction( "feed", actionList, setActionList, GameState, setGameState)}>
                        <Image source={{uri: 'assets/images/game-images/feed-button.png'}} style={Styles.bigButton} resizeMode='contain'/>
                    </Pressable>
                </View>
                <View style={Styles.smallButtonRow}>
                    <Pressable onPressOut={() => optionsButton(gameStateDispatch)}>
                        <Image source={{uri: 'assets/images/game-images/options-button.png'}} style={Styles.smallButton} resizeMode='contain'/>
                    </Pressable>
                    <Pressable onPress={() => resetButton(gameStateDispatch)}>
                        <Image source={{uri: 'assets/images/game-images/reset-button.png'}} style={Styles.smallButton} resizeMode='contain'/>
                    </Pressable>
                </View>
        </View>  
    );
}

var currEgg = "";
var hatchAction = "";

function froggyFunction(actionType: string, actionList: any, setActionList: any, gameState: any, setGameState: any) {
    //var dispatch = useActionListDispatch();
    //console.log(actionType);
    if(hatchAction === "") {
        currEgg = "egg_1";
        actionList.push([actionType]);
        setActionList(actionList);
        //setGameState(["test"]);
        if(actionList.length >= 4) {
            //console.log("four actions reached");
            var actionNums = determineHatchAction(actionList);
            //console.log(actionNums);
            const it = actionNums.keys();          
            var max = it.next();
            if(actionNums.size > 1) {
                for(var key = it.next(); !key.done; key = it.next()) {
                    if(actionNums.get(key.value) > max.value) {
                        max = key;
                    }
                }
            }
            hatchAction = max.value;
            //console.log("continued")
        } else {
            return;
        }
    } 
    //hatchTime(dispatch, actionList, currEgg, hatchAction);
    setGameState(["hatching", currEgg, hatchAction]);
}

function hatchTime(dispatch: any, actions: Array<String>, egg: string, frogType: string) {
    //changes the GameState idk
    //console.log("hatching " + egg + " with action type " + frogType);
    
}

function determineHatchAction(actions: Array<String>) {
    var map = new Map();
    for(var i = 0; i < 4; i = i + 1) {
        if(map.has(actions[i])) {
            map.set(actions[i], map.get(actions[i]) + 1);
        } else {
            map.set(actions[i], 0);
        }
    }
    return map;
}

function optionsButton(dispatch: any) {
    dispatch(["options"]);
}

function resetButton(dispatch: any) {
    dispatch(["reset"]);
}