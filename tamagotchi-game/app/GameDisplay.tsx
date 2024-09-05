import React from 'react';
import { View, Text, Image, StyleSheet, Pressable, TextInput } from 'react-native';
import { useActionList, useActionListDispatch, useProgress, useProgressDispatch, useGameState, useGameStateDispatch, GameStateContext } from './GameState';
import { stateCache } from 'expo-router/build/getLinkingConfig';
import { stringifyCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { getActionMap } from './GameButtons';
import { PetImages } from './PetImages';

export function GameDisplay({Styles}) {
    var gameState = useGameState();
    var gameStateDispatch = useGameStateDispatch();

    var actionList = useActionList();

    var collected = useProgress();


    //return pickEggs(Styles, gameState, gameStateDispatch);

    switch(gameState.state) {
        case 'stats':
            return stats(gameState, Styles, actionList);
        case 'collection':
            return collection(gameState, Styles, collected);
        case 'credits':
            return credits(gameState);
        case 'options':
            return options(Styles, gameState, gameStateDispatch);
        case 'pickEgg':
            return pickEggs(Styles, gameState, gameStateDispatch);
        case 'pickName':
            return pickName(Styles, gameState, gameStateDispatch);
        default: 
            return gameplay(Styles, gameState, gameStateDispatch);
    }
}

const PetQuotes = (name: string) => [
    name + " really likes a head scratch",
    "You gently pet " + name,
    name + " is happy to be petted"
]

const FeedQuotes = (name: string) => [
    "Wow! " + name + " really likes Generic Brand Food!",
    "*munch munch munch*",
    "It's dinner time, " + name
]

const GiftQuotes = (name: string) => [
    name + " is delighted to have a gift",
    "Amazing, it's exactly what " + name + " wanted for Christmas!",
    name + " looks at the gift with glee"
]

const PlayQuotes = (name: string) => [
    name + " loves this game!",
    name + " loves playing with you",
    "You play with " + name + " for a bit"
]


function screenPrompt(gameState: any) {
    //console.log(gameState[0]);
    const flavorNum = Math.floor(Math.random() * 3);

    switch(gameState.state) {
        case "hatching":
            return gameState.name + " looks ready to hatch! Are you ready?";
        case "hatchingAnim":
            return "Congratulations, " + gameState.name + " has hatched into a pet!"; //
        case "confirmEgg":
            return "Would you like to choose this egg?";
        case "collection": 
            return "Past Pets:";
        case "options":
            return "Options:";
        case "pickName": 
            return "Pick a name for your new egg!";
        case "petAnim":
            return PetQuotes(gameState.name)[flavorNum];
        case "feedAnim":
            return FeedQuotes(gameState.name)[flavorNum];
        case "giftAnim":
            return GiftQuotes(gameState.name)[flavorNum];
        case "playAnim":
            return PlayQuotes(gameState.name)[flavorNum];
        default: 
            if(gameState.oldState === "pickName") {
                return gameState.name + " is feeling apprehensive about their new home...";
            }
            return "";
    }
}

function leftText(gameState: any) {
    switch(gameState.state) {
        case "confirmEgg":
        case "hatching":
            return "YES";
        case "pickName":
            return "CON-FIRM";
        default: 
            return "";
    }
}

function rightText(gameState: any) {
    switch(gameState.state) {
        case "confirmEgg":
        case "hatching":
            return "NO";
        case "pickName":
            return "RESET NAME";
        default: 
            return "";
    }
}

function stats(gameState: any, styles, actionList: Array<String>) {
    if(gameState.egg === -1) {
        return (<View style={styles.stats}>
                <Text style={styles.screenText}>Please pick an egg first.</Text>
            </View>)
    } else {
        var src = PetImages.egg[gameState.egg-1];
        //require('../assets/images/game-images/pets/placeholders/pet_' + String(gameState.pet) + '.png');
        if(gameState.pet > 0) {
            src = PetImages.pet_placeholder[gameState.pet-1];
        } else {
            //console.log("current pet is ", gameState.pet);
        }
        var actionMap = getActionMap(actionList);
        return (<View style={styles.stats}>
            <Image source={src} style={styles.statsImg}/>
            <View style={styles.info}> 
                <Text style={styles.stat}>Name: {gameState.name}</Text>
                <Text style={styles.stat}>Age: {gameState.age}</Text>
                <View style={styles.statRow}>
                    <Text style={styles.stat}>Pet: {actionMap.get("pet")}</Text>
                    <Text style={styles.stat}>Play: {actionMap.get("play")}</Text>
                </View>
                <View style={styles.statRow}>                    
                    <Text style={styles.stat}>Gift: {actionMap.get("gift")}</Text>
                    <Text style={styles.stat}>Feed: {actionMap.get("feed")}</Text>
                </View>
            </View>
        </View>);
    }

}

function options(Styles, gameState: any, gameStateDispatch: any) {
    return (<View style={Styles.screenLayout}>
                <View style={Styles.upperScreen}>
                    <Text style={Styles.screenText}> 
                        {screenPrompt(gameState)}
                    </Text>
                </View>
                <View style={Styles.options}> 
                    <Pressable style={Styles.option} onPress={() => gameStateDispatch({... gameState, newState: 'stats'})}>
                        <Text style={Styles.optionText}>Stats!</Text>
                    </Pressable>
                    <Pressable style={Styles.option} onPress={() => gameStateDispatch({... gameState, newState: 'collection'})}>
                        <Text style={Styles.optionText}>Collec-tion!</Text>
                    </Pressable>
                    <Pressable style={Styles.option} onPress={() => gameStateDispatch({... gameState, newState: 'credits'})}>
                        <Text style={Styles.optionText}>Credits!</Text>
                    </Pressable>
                </View>
            </View>);
}

function miniOutput(collected: Array<number>, num: number, styles) {
    var src = PetImages.pet_placeholder[num];
    if(collected.includes(num+1)) {
        return (<Image style={styles.collected} source={src} key={num} />);
    } else {
        return (<Image style={styles.notCollected} source={src} key={num} />);
    }
}

function collection(gameState: any, Styles, collected: Array<number>) {

    console.log(collected);

    var indexArr = Array.from({length: 6}, (_, index) => index);
    var topRow = indexArr.map((v) => {return miniOutput(collected, v, Styles)});
    var bottomRow = indexArr.map((v) => {return miniOutput(collected, v + 6, Styles)});

    return (<View style={Styles.screenLayout}>
        <View style={Styles.upperScreen}>
            <Text style={Styles.screenText}> 
                {screenPrompt(gameState)}
            </Text>
        </View>
        <View style={Styles.collection}> 
            <View style={Styles.upperRowColl}>
                {topRow}
            </View>
            <View style={Styles.bottomRowColl}>
                {bottomRow}
            </View>
        </View>
    </View>);
}

function credits(gameState: any) {
    return (<View></View>);
}

var name = "name";

function pickName(Styles, gameState: any, gameStateDispatch: any) {
    return (
        <View style={Styles.screenLayout}>
            <View style={Styles.upperScreen}>
                <Text style={Styles.screenText}> 
                    {screenPrompt(gameState)}
                </Text>
            </View>
            <View style={Styles.selectName}>
                <Text style={Styles.confirmName}>
                    {leftText(gameState)}
                </Text>
                <TextInput style={Styles.enterName}
                    onChangeText={(text) => {name = text}}
                    keyboardType="default"
                    placeholder={name}
                    
                />
                <Text style={Styles.confirmName}>
                    {rightText(gameState)}
                </Text>
            </View>
        </View>);
}

export function confirmName(gameState: any, gameStateDispatch: any) {
    gameStateDispatch({...gameState, newState:'eggNamed', name: name}); 
}

export function resetName() {
    name = "";
}
function pickEggs(Styles, gameState: any, gameStateDispatch: any) {

    return (
        <View style={Styles.eggSelectView}>
            <Pressable onPress={() => gameStateDispatch({...gameState, egg: 1, newState: 'eggPicked'})}>
                <Image source={require( '../assets/images/game-images/pets/egg_1.png')} style={Styles.eggSelect}/>
            </Pressable>
            <Pressable onPress={() => gameStateDispatch({...gameState, egg: 2, newState: 'eggPicked'})}>
                <Image source={require( '../assets/images/game-images/pets/egg_2.png')} style={Styles.eggSelect}/>
            </Pressable>
            <Pressable onPress={() => gameStateDispatch({...gameState, egg: 3, newState: 'eggPicked'})}>
                <Image source={require( '../assets/images/game-images/pets/egg_1.png')} style={Styles.eggSelect}/>
            </Pressable>
        </View>
    )
}

function gameplay(Styles, gameState: any, gameStateDispatch: any) {
    var img = getImage(gameState, gameStateDispatch);
    return (
    <View style={Styles.screenLayout}>
        <View style={Styles.upperScreen}>
            <Text style={Styles.screenText}> 
                {screenPrompt(gameState)}
            </Text>
        </View>
        <View style={Styles.lowerScreen}>
            <Pressable onPress={() => {leftButton(gameState, gameStateDispatch)}}>
            <Text style={Styles.leftText}>
                {leftText(gameState)}
            </Text>
            </Pressable>
            <Image style={Styles.pet} source={img}/>
            <Pressable onPress={() => {rightButton(gameState, gameStateDispatch)}}>
            <Text style={Styles.rightText}>
                {rightText(gameState)}
            </Text>
            </Pressable>
        </View>
    </View>
    )
}

function getImage(gameState: any, gameStateDispatch: any) {
    var output = PetImages.egg[gameState.egg-1];
    console.log("the current state is ", gameState);
    //console.log(gameState);
    if(!gameState.eggHatched) { return output; } 
    switch(gameState.state) {
        case "confirmEgg":
        case "hatching":
        case "egg":
            output = PetImages.egg[gameState.egg-1];
            break;
        case "hatchingAnim":
            output = PetImages.egg_broken[gameState.egg-1];
            setTimeout(() => {gameStateDispatch({newState: "hatched", egg: gameState.egg, hatchAction: gameState.hatchAction})}, 0);
            break;
        case "petAnim":
        case "playAnim":
        case "feedAnim":
        case "giftAnim":
        case "petHatched":
            output = PetImages.pet_placeholder[gameState.pet-1];
            break;
        default: 

    }
    return output;
    // var output = 'assets/images/game-images/pets/' + gameState[0] + '.png';
    // console.log(output);
    // return output;
}

export function leftButton(gameState: any, dispatch: any) {
    console.log("left!");
    var action = { ...gameState};
    switch(gameState.state) {
        case "hatching":
            action.newState = "hatchingAnim";
            break;
        case "confirmEgg":
            action.newState = "eggConfirmed";
            break; 
        case "pickName":
            return confirmName(gameState, dispatch);
        default: 
            return;          
    }
    dispatch(action);
}


export function rightButton(gameState: any, dispatch: any) {
    console.log("right!");
    var action = { ...gameState};
    switch(gameState.state) {
        case "hatching":
            action.newState = "unhatched";
            break;
        case "confirmEgg":
            action.newState = "eggRejected";
            break;
        case "pickName":
            return resetName();
        default:
            return;
    }
    dispatch(action);
}