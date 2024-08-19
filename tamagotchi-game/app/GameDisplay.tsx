import React from 'react';
import { View, Text, Image, StyleSheet, Pressable, TextInput } from 'react-native';
import { useActionList, useActionListDispatch, useProgress, useProgressDispatch, useGameState, useGameStateDispatch } from './GameState';
import { stateCache } from 'expo-router/build/getLinkingConfig';
import { stringifyCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { getActionMap } from './GameButtons';

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


function screenPrompt(gameState: any) {
    //console.log(gameState[0]);
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
        var src = ""
        if(!(gameState.pet > 0)) {
            src = 'assets/images/game-images/pets/egg_' + gameState.egg + '.png';
        } else {
            console.log("current pet is ", gameState.pet);
            src = 'assets/images/game-images/pets/placeholders/pet_' + gameState.pet + '.png';
        }
        var actionMap = getActionMap(actionList);
        return (<View style={styles.stats}>
            <Image source={{uri: src}} style={styles.statsImg}/>
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
    if(collected.includes(num+1)) {
        return (<Image style={styles.collected} source={{uri: 'assets/images/game-images/pets/placeholders/pet_' + String(num+1) + '.png'}} key={num} />);
    } else {
        return (<Image style={styles.notCollected} source={{uri: 'assets/images/game-images/pets/placeholders/pet_' + String(num+1) + '.png'}} key={num} />);
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
                <Image source={{uri: 'assets/images/game-images/pets/egg_1.png'}} style={Styles.eggSelect}/>
            </Pressable>
            <Pressable onPress={() => gameStateDispatch({...gameState, egg: 2, newState: 'eggPicked'})}>
                <Image source={{uri: 'assets/images/game-images/pets/egg_2.png'}} style={Styles.eggSelect}/>
            </Pressable>
            <Pressable onPress={() => gameStateDispatch({...gameState, egg: 3, newState: 'eggPicked'})}>
                <Image source={{uri: 'assets/images/game-images/pets/egg_1.png'}} style={Styles.eggSelect}/>
            </Pressable>
        </View>
    )
}

function gameplay(Styles, gameState: any, gameStateDispatch: any) {
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

function getImage(gameState: any, gameStateDispatch: any) {
    var output = 'assets/images/game-images/pets/pet_' + gameState.pet + '.png';
    console.log("the current state is ", gameState);
    //console.log(gameState);
    switch(gameState.state) {
        case "confirmEgg":
        case "hatching":
        case "egg":
            output = 'assets/images/game-images/pets/egg_' + gameState.egg + '.png';
            break;
        case "hatchingAnim":
            output = 'assets/images/game-images/pets/egg_' + gameState.egg + '_broken.png';
            setTimeout(() => {gameStateDispatch({newState: "hatched", egg: gameState.egg, hatchAction: gameState.hatchAction})}, 0);
            break;
        case "petHatched":
            output = 'assets/images/game-images/pets/placeholders/pet_' + gameState.pet + '.png';
            break;
        default: 

    }
    return output;
    // var output = 'assets/images/game-images/pets/' + gameState[0] + '.png';
    // console.log(output);
    // return output;
}