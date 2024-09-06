import React, { useState } from 'react';
import { View, Image, Pressable } from 'react-native';
import { useActionList, useActionListDispatch, useProgress, useProgressDispatch, useGameState, useGameStateDispatch } from './GameState';

const PetButton = (hover: boolean) => hover ? require("../assets/images/game-images/pressed/pet.png") : require( "../assets/images/game-images/pet-button.png");
const PlayButton = (hover: boolean) => hover ? require("../assets/images/game-images/pressed/play.png") : require( "../assets/images/game-images/play-button.png");
const GiftButton = (hover: boolean) => hover ? require("../assets/images/game-images/pressed/gift.png") : require( "../assets/images/game-images/gift-button.png");
const FeedButton = (hover: boolean) => hover ? require("../assets/images/game-images/pressed/feed.png") : require( "../assets/images/game-images/feed-button.png");
const OptionsButton = (hover: boolean) => hover ? require("../assets/images/game-images/pressed/options.png") : require( "../assets/images/game-images/options-button.png");
const ResetButton = (hover: boolean) => hover ? require("../assets/images/game-images/pressed/reset.png") : require( "../assets/images/game-images/reset-button.png");

const BlockProg = [ "pickEgg", "confirmEgg", "hatching", "pickName", "hatchingAnim", "petAnim", "playAnim", "giftAnim", "feedAnim" ]
export function GameButtons({Styles}) {

    var dispatch = useActionListDispatch();
    var actions = useActionList();

    var gameStateDispatch = useGameStateDispatch();
    var gameState = useGameState();
    currEgg = gameState.egg;

    var [petHover, setPetHover] = useState(false);
    var [playHover, setPlayHover] = useState(false);
    var [giftHover, setGiftHover] = useState(false);
    var [feedHover, setFeedHover] = useState(false);
    var [optionsHover, setOptionsHover] = useState(false);
    var [resetHover, setResetHover] = useState(false);


    var active = !BlockProg.includes(gameState.state);
    return (
        <View style={Styles.buttonColumns}>
                <View style={Styles.buttonRow}>
                    <Pressable style={Styles.bigButton} onPress={() => froggyFunction(dispatch, actions, "pet", gameStateDispatch, active, gameState)} onHoverIn={() => setPetHover(true)} onHoverOut={() => setPetHover(false)}>
                        <View> 
                            <Image source={PetButton(petHover)} style={Styles.bigButton} resizeMode='contain'/>
                        </View>
                    </Pressable>
                    <Pressable style={Styles.bigButton} onPress={() => froggyFunction(dispatch, actions, "play", gameStateDispatch, active, gameState)} onHoverIn={() => setPlayHover(true)} onHoverOut={() => setPlayHover(false)}>
                        <Image source={PlayButton(playHover)} style={Styles.bigButton} resizeMode='contain'/>
                    </Pressable>
                </View>
                <View style={Styles.buttonRow}>
                    <Pressable style={Styles.bigButton} onPress={() => froggyFunction(dispatch, actions, "gift", gameStateDispatch, active, gameState)} onHoverIn={() => setGiftHover(true)} onHoverOut={() => setGiftHover(false)}>
                        <Image source={GiftButton(giftHover)} style={Styles.bigButton} resizeMode='contain'/>
                    </Pressable>
                    <Pressable style={Styles.bigButton} onPress={() => froggyFunction(dispatch, actions, "feed", gameStateDispatch, active, gameState)} onHoverIn={() => setFeedHover(true)} onHoverOut={() => setFeedHover(false)}>
                        <Image source={FeedButton(feedHover)} style={Styles.bigButton} resizeMode='contain'/>
                    </Pressable>
                </View>
                <View style={Styles.smallButtonRow}>
                    <Pressable style={Styles.smallButton} onPressOut={() => optionsButton(gameState, gameStateDispatch)} onHoverIn={() => setOptionsHover(true)} onHoverOut={() => setOptionsHover(false)}>
                        <Image source={OptionsButton(optionsHover)} style={Styles.smallButton} resizeMode='contain'/>
                    </Pressable>
                    <Pressable style={Styles.smallButton} onPress={() => resetButton(gameStateDispatch, dispatch)} onHoverIn={() => setResetHover(true)} onHoverOut={() => setResetHover(false)}>
                        <Image source={ResetButton(resetHover)} style={Styles.smallButton} resizeMode='contain'/>
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
            actionList.push(actionType);
            var actionNums = getActionMap(actionList.slice(0, 4));

            const it = actionNums.keys();          
            var max = it.next();
            if(actionNums.size > 1) {
                for(var key = it.next(); !key.done; key = it.next()) {
                    if(actionNums.get(key.value) > actionNums.get(max.value)) {
                        max = key;
                    }
                }
            }
            hatchAction = max.value;
        } else {
            console.log("do we go here for some reason?");
            gameStateDispatch({...gameState, newState: actionType + "Anim"});
            return;
        }
    } else {
        gameStateDispatch({...gameState, newState: actionType + "Anim"});
        return;
    }
    if(!gameState.eggHatched) {
        console.log("we are dispatching the hatching");
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