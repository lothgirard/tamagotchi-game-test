import React from 'react';
import { View, Image, Pressable } from 'react-native';
import { useActionList, useActionListDispatch, useProgress, useProgressDispatch, useGameState, useGameStateDispatch } from './GameState';

export function GameButtons({Styles,  GameState, setGameState}) {

    var dispatch = useActionListDispatch();
    var actions = useActionList();

    var gameStateDispatch = useGameStateDispatch();
    var gameState = useGameState();
    currEgg = gameState.egg;

    var active = gameState.state !== "pickEgg" && gameState.state !== "confirmEgg" && gameState.state !== "hatching" && gameState.state !== "hatchingAnim";
    return (
        <View style={Styles.buttonColumns}>
                <View style={Styles.buttonRow}>
                    <Pressable onPress={() => froggyFunction(dispatch, actions, "pet", gameStateDispatch, active, gameState)}>
                        <View> 
                            <Image source={{uri: 'assets/images/game-images/pet-button.png'}} style={Styles.bigButton} resizeMode='contain'/>
                        </View>
                    </Pressable>
                    <Pressable onPress={() => froggyFunction(dispatch, actions, "play", gameStateDispatch, active, gameState)}>
                        <Image source={{uri: 'assets/images/game-images/play-button.png'}} style={Styles.bigButton} resizeMode='contain'/>
                    </Pressable>
                </View>
                <View style={Styles.buttonRow}>
                    <Pressable onPress={() => froggyFunction(dispatch, actions, "gift", gameStateDispatch, active, gameState)}>
                        <Image source={{uri: 'assets/images/game-images/gift-button.png'}} style={Styles.bigButton} resizeMode='contain'/>
                    </Pressable>
                    <Pressable onPress={() => froggyFunction(dispatch, actions, "feed", gameStateDispatch, active, gameState)}>
                        <Image source={{uri: 'assets/images/game-images/feed-button.png'}} style={Styles.bigButton} resizeMode='contain'/>
                    </Pressable>
                </View>
                <View style={Styles.smallButtonRow}>
                    <Pressable onPressOut={() => optionsButton(gameState, gameStateDispatch)}>
                        <Image source={{uri: 'assets/images/game-images/options-button.png'}} style={Styles.smallButton} resizeMode='contain'/>
                    </Pressable>
                    <Pressable onPress={() => resetButton(gameStateDispatch, dispatch)}>
                        <Image source={{uri: 'assets/images/game-images/reset-button.png'}} style={Styles.smallButton} resizeMode='contain'/>
                    </Pressable>
                </View>
        </View>  
    );
}

var currEgg = 0;
var hatchAction = "";

function froggyFunction(dispatch: any, actionList: Array<String>, actionType: string, gameStateDispatch: any, active: boolean, gameState: any) {
    //play the action animation here first too, then dispatch any state changes
    if(!active) {
        return;
    }
    console.log("we are performing ", actionType);
    dispatch(actionType);
    if(hatchAction === "") {
        
        if(actionList.length >= 3) {
            var actionNums = getActionMap(actionList.slice(0, 4));

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
    if(gameState.state === "egg") {
        gameStateDispatch({...gameState, 
            newState: "hatching", 
            egg: currEgg, 
            hatchAction: hatchAction});
    }
}

function hatchTime(dispatch: any, actions: Array<String>, egg: string, frogType: string) {
    //changes the GameState idk
    //console.log("hatching " + egg + " with action type " + frogType);
    
}

export function getActionMap(actions: Array<String>) {
    var map = new Map();
    map.set('pet', 0);
    map.set('play', 0);
    map.set('gift', 0);
    map.set('feed', 0);
    for(var i = 0; i < actions.length; i = i + 1) {
        map.set(actions[i], map.get(actions[i]) + 1);
    }
    return map;
}

function optionsButton(gameState: any, dispatch: any) {
    var action = { ...gameState};
    switch(gameState.state) {
        case "stats":
        case "collection":
        case "credits":
        case "options":
            action.newState = "return";
            break;
        default:
            action.newState = "options"; 
            break;  
    }
    dispatch(action);
}

function resetButton(dispatch: any, actionListDispatch: any) {
    dispatch({newState: "reset"});
    //actionListDispatch(["reset"]);
    hatchAction = "";
    currEgg = 0;
}