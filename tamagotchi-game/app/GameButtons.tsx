import React from 'react';
import { View, Image, Pressable } from 'react-native';
import { useActionList, useActionListDispatch, useProgress, useProgressDispatch, useGameState, useGameStateDispatch } from './GameState';

export function GameButtons({Styles}) {

    var dispatch = useActionListDispatch();
    var actions = useActionList();

    return (
        <View style={Styles.buttonColumns}>
                <View style={Styles.buttonRow}>
                    <Pressable onPress={() => froggyFunction(dispatch, actions, "pet")}>
                        <View> 
                            <Image source={{uri: 'assets/images/game-images/pet-button.png'}} style={Styles.bigButton} resizeMode='contain'/>
                        </View>
                    </Pressable>
                    <Pressable onPress={() => froggyFunction(dispatch, actions, "play")}>
                        <Image source={{uri: 'assets/images/game-images/play-button.png'}} style={Styles.bigButton} resizeMode='contain'/>
                    </Pressable>
                </View>
                <View style={Styles.buttonRow}>
                    <Pressable onPress={() => froggyFunction(dispatch, actions, "gift")}>
                        <Image source={{uri: 'assets/images/game-images/gift-button.png'}} style={Styles.bigButton} resizeMode='contain'/>
                    </Pressable>
                    <Pressable onPress={() => froggyFunction(dispatch, actions, "feed")}>
                        <Image source={{uri: 'assets/images/game-images/feed-button.png'}} style={Styles.bigButton} resizeMode='contain'/>
                    </Pressable>
                </View>
                <View style={Styles.smallButtonRow}>
                    <Pressable onPressOut={() => optionsButton(dispatch, actions)}>
                        <Image source={{uri: 'assets/images/game-images/options-button.png'}} style={Styles.smallButton} resizeMode='contain'/>
                    </Pressable>
                    <Pressable onPress={() => resetButton(dispatch, actions)}>
                        <Image source={{uri: 'assets/images/game-images/reset-button.png'}} style={Styles.smallButton} resizeMode='contain'/>
                    </Pressable>
                </View>
        </View>  
    );
}

var currEgg = "";
var hatchAction = "";

function froggyFunction(dispatch: any, actionList: Array<String>, actionType: string) {
    //var dispatch = useActionListDispatch();
    console.log("froggyFunction!");
    dispatch(actionType);
    if(hatchAction === "") {
        console.log(actionList.length);
        //var actions = useActionList();
        if(actionList.length >= 4) {
            console.log("four actions reached");
            var actionNums = actionList.slice(0, 4).reduce((accumulator, currVal) => { accumulator.has(currVal) ? 
                        accumulator.set(currVal, accumulator.get(currVal)+1) : accumulator.set(currVal, 1); 
                        return accumulator }, new Map());
            const it = actionNums.keys()            
            var max = it.next();
            if(actionNums.size > 1) {
                for(var key = it.next(); !key.done; key = it.next()) {
                    if(actionNums.get(key.value) > max.value) {
                        max = key;
                    }
                }
            }
            hatchAction = max.value;
        } else {
            return;
        }
    } 
    hatchTime(dispatch, actionList, currEgg, hatchAction);
}

function hatchTime(dispatch: any, actions: Array<String>, egg: string, frogType: string) {
    //changes the GameState idk
    console.log("hatching " + egg + " with action type " + frogType);
    dispatch(actions, "hatched");
}

function optionsButton(dispatch: any, actions: Array<String>) {
    dispatch(actions, "options");
}

function resetButton(dispatch: any, actions: Array<String>) {
    dispatch(actions, "reset");
}