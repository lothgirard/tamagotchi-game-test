import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, TextInput } from 'react-native';
import { useActionList, useActionListDispatch, useProgress, useProgressDispatch, useGameState, useGameStateDispatch, GameStateContext } from './GameState';
import { stateCache } from 'expo-router/build/getLinkingConfig';
import { stringifyCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { getActionMap, flavorNum } from './GameButtons';
import { PetImages } from './PetImages';
import DropShadow from 'react-native-drop-shadow';

const AVAILABLE_PETS = 2;

const Animations = {
    "pet": require('../assets/images/game-images/animations/petting.gif'),
    "feed": require('../assets/images/game-images/animations/food.gif'),
    "gift": require('../assets/images/game-images/animations/heart.gif'),
    "play": require('../assets/images/game-images/animations/toy.gif'),
    "hatching": require('../assets/images/game-images/animations/sparkle.gif'),
    "eggWiggle": require('../assets/images/game-images/animations/egg.gif'),
}

const AnimTime = 2000; 

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
        case 'selectBackground':
            return changeBackground(Styles, gameState, gameStateDispatch);
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
        
        case "wasPet":
            return PetQuotes(gameState.name)[flavorNum];
        
        case "wasFeed":
            return FeedQuotes(gameState.name)[flavorNum];
        
        case "wasGift":
            return GiftQuotes(gameState.name)[flavorNum];
        
        case "wasPlay":
            return PlayQuotes(gameState.name)[flavorNum];
        case "selectBackground":
            return "Pick a background and click to confirm!";
        case "petAnim":
        case "playAnim":
        case "giftAnim":
        case "feedAnim":
            return "";
        default: 
            if(gameState.oldState === "pickName" || gameState.oldState === "egg") {
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
                    <Pressable style={Styles.option} onPress={() => gameStateDispatch({... gameState, newState: 'selectBackground'})}>
                        <Text style={Styles.optionText}>Back-grounds!</Text>
                    </Pressable>
                </View>
            </View>);
}

function miniOutput(collected: Array<number>, num: number, styles) {
    var src = num >= AVAILABLE_PETS ? PetImages.pet_placeholder[num] : PetImages.pet[num];
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

function changeBackground( Styles: any, gameState: any, gameStateDispatch: any) {
    return (
        <View style={Styles.screenLayout}>
            <View style={Styles.upperScreen}>
                <Text style={Styles.screenText}> 
                    {screenPrompt(gameState)}
                </Text>
            </View>
            <View style={Styles.lowerScreen}>

                <Pressable style={Styles.confirmBg} onPress={() => gameStateDispatch({...gameState, newState: "return"})}>
                    <Image style={Styles.transparentClickable} src={PetImages.background[gameState.background]} />
                </Pressable>

            </View>
        </View>);
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
                <Pressable style={Styles.confirmName} onPress={() => confirmName(gameState, gameStateDispatch)}>
                    <Text style={Styles.confirmName}>
                        {leftText(gameState)}
                    </Text>
                </Pressable>
                <TextInput style={Styles.enterName}
                    onChangeText={(text) => {name = text}}
                    keyboardType="default"
                    placeholder={name}
                    
                />
                <Pressable style={Styles.confirmName} onPress={resetName}>
                    <Text style={Styles.confirmName}>
                        {rightText(gameState)}
                    </Text>
                </Pressable>
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
    const [eggOne, setEggOne] = useState(false);
    const [eggTwo, setEggTwo] = useState(false);
    const [eggThree, setEggThree] = useState(false);

    return (
        <View style={Styles.eggSelectView}>
            <Pressable onPress={() => gameStateDispatch({...gameState, egg: 1, newState: 'eggPicked'})} onHoverIn={() => setEggOne(true)} onHoverOut={() => setEggOne(false)}>
                <Image source={require( '../assets/images/game-images/pets/egg_1.png')} style={eggOne ? Styles.eggSelectWithShadow : Styles.eggSelect} resizeMode='contain'/>
            </Pressable>
            <Pressable onPress={() => gameStateDispatch({...gameState, egg: 2, newState: 'eggPicked'})} onHoverIn={() => setEggTwo(true)} onHoverOut={() => setEggTwo(false)}>
                <Image source={require( '../assets/images/game-images/pets/egg_2.png')} style={eggTwo ? Styles.eggSelectWithShadow : Styles.eggSelect} resizeMode='contain'/>
            </Pressable>
            <Pressable onPress={() => gameStateDispatch({...gameState, egg: 3, newState: 'eggPicked'})} onHoverIn={() => setEggThree(true)} onHoverOut={() => setEggThree(false)}>
                <Image source={require( '../assets/images/game-images/pets/egg_3.png')} style={eggThree ? Styles.eggSelectWithShadow : Styles.eggSelect} resizeMode='contain'/>
            </Pressable>
        </View>
    )
}


function getAnim(gameState: any, gameStateDispatch: any) {
    var img = require('../assets/images/game-images/transparent.png');
    switch(gameState.state) {
        case "petAnim":
            img = Animations.pet;
            setTimeout(() => {gameStateDispatch({...gameState, newState: "wasPet"})}, AnimTime);
            break;
        case "playAnim":
            img = Animations.play;
            setTimeout(() => {gameStateDispatch({...gameState, newState: "wasPlay"})}, AnimTime);
            break;
        case "giftAnim":
            img = Animations.gift;
            setTimeout(() => {gameStateDispatch({...gameState, newState: "wasGift"})}, AnimTime);
            break;
        case "feedAnim":
            img = Animations.feed;
            setTimeout(() => {gameStateDispatch({...gameState, newState: "wasFeed"})}, AnimTime);
            break;
        case "hatchingAnim":
            setTimeout(() => {gameStateDispatch({...gameState, newState: "hatched", egg: gameState.egg, hatchAction: gameState.hatchAction})}, AnimTime);
        case "hatching":
            img = Animations.hatching;
            break; 
    }
    return img;
}

function gameplay(Styles, gameState: any, gameStateDispatch: any) {
    var img = getImage(gameState, gameStateDispatch);

    const Anim = () => {
        if(gameState.state.slice(-4) === "Anim" || gameState.state === "hatching") {
            return <Image source={getAnim(gameState, gameStateDispatch)} style={Styles.animation}/> 
        }
    }
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
            {Anim()}
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
    if(gameState.state !== "hatching" && !gameState.eggHatched) { return output; } 
    switch(gameState.state) {
        // case "confirmEgg":
        // case "egg":
        //     output = PetImages.egg[gameState.egg-1];
        //     break;
        case "hatching":
            output = PetImages.egg_wiggle[gameState.egg-1];
            break;
        case "hatchingAnim":
            output = PetImages.egg_broken[gameState.egg-1];
            break;
        case "petAnim":
        case "playAnim":
        case "feedAnim":
        case "giftAnim":
            output = gameState.pet > AVAILABLE_PETS ? PetImages.pet_placeholder[gameState.pet-1] : PetImages.actionPet[gameState.pet-1];
            break;
        case "petHatched":
        default: 
            output = gameState.pet > AVAILABLE_PETS ? PetImages.pet_placeholder[gameState.pet-1] : PetImages.pet[gameState.pet-1];
            break;
        

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
        case "selectBackground":
            action.background = (action.background - 1) % PetImages.background.length;
            action.newState = "backgroundChanged";
            break;
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
        case "selectBackground":
            action.background = (action.background + 1) % PetImages.background.length;
            action.newState = "backgroundChanged";
            break;
        default:
            return;
    }
    dispatch(action);
}