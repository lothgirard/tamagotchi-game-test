import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, TextInput, ImageBackground } from 'react-native';
import { useActionList, useActionListDispatch, useProgress, useProgressDispatch, useGameState, useGameStateDispatch, GameStateContext, CollScreenNum, BGScreenNum } from './GameState';
import { getActionMap, flavorNum } from './GameButtons';
import { PetImages } from './PetImages';


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
            return changeBackground(Styles, gameState, gameStateDispatch, collected);
        case 'confirmBackground':
            return confirmBackground(Styles, gameState, gameStateDispatch);
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
            return "Congratulations! Your hard work has helped " + gameState.name + " hatch!"; //
        case "confirmEgg":
            return "Would you like to choose this egg?";
        case "collection": 
            return "Collection:";
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
            return "Select a background:";
        case "pickEgg":
            return "Select an egg:";
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

const allowStatCheck = [ "egg", "petHatched", "wasPet", "wasPlay", "wasGift", "wasFeed" ]


function stats(gameState: any, styles, actionList: Array<String>) {
    if(gameState.egg === -1 || !allowStatCheck.includes(gameState.oldState)) {
        return (<View style={styles.upperScreen}>
                <Text style={styles.screenText}>Please pick an egg first.</Text>
            </View>)
    } else {
        var src = getImage(gameState);
        //require('../assets/images/game-images/pets/placeholders/pet_' + String(gameState.pet) + '.png');
        var actionMap = getActionMap(actionList);
        return (<View style={styles.stats}>
            <View style={styles.statsImg}>
                <Image source={PetImages.shadow} style={styles.statsShadow} resizeMode="contain"/>
                <Image source={src} style={styles.statsImg} resizeMode="contain"/>
            </View>
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
    return (
    <View style={Styles.screenLayout}>
        <ImageBackground source={PetImages.background[0]} style={{...Styles.optionsScreen, backgroundBlendMode: 'rgb(244, 252, 238)', opacity: 0.75}}>
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
                </ImageBackground>
        </View>);
}

function miniOutput(collected: Array<number>, num: number, styles) {
    if(num < PetImages.pet.length) {
        var src = !collected.includes(num + 1) ? PetImages.pet_placeholder[num] : PetImages.pet[num];
        return (<Image style={styles.collected} source={src} key={num} />);
    }
}

function collection(gameState: any, Styles, collected: Array<number>) {

    console.log(collected);

    var indexArr = Array.from({length: 6}, (_, index) => index + gameState.collectionScreen * 12);
    var topRow = indexArr.map((v) => {return miniOutput(collected, v, Styles)});
    var bottomRow = indexArr.map((v) => {return miniOutput(collected, v + 6, Styles)});
    const collVal = (gameState.collectionScreen + 1)
    console.log("number of pets:" + PetImages.pet.length);


    const collectionCount = collVal.toString() + "/" + (CollScreenNum).toString();

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
        <View style={Styles.pageCount}>
            <Text style={Styles.pageCountText}>{collectionCount}</Text>
        </View>
    </View>);
}

function credits(gameState: any) {
    return (<View></View>);
}

function miniBackground(collected: Array<number>, v: number, gameState, gameStateDispatch, Styles: any) {
    if (v < PetImages.background.length) {
        const isUnlocked = PetImages.backgroundMappings[v] == -1 || collected.includes(PetImages.backgroundMappings[v]) ;
        var src = isUnlocked
            ? PetImages.background[v] : PetImages.placeholderBackground;
        return <Pressable onPress={() => isUnlocked ? gameStateDispatch({...gameState, newState: "confirmBackground", background: v}) : {}} key={v}>
            <Image style={Styles.miniBackground} source={src}/>
            </Pressable>
    }
}

function changeBackground( Styles: any, gameState: any, gameStateDispatch: any, collected: Array<number>) {
    
    var indexArr = Array.from({length: 3}, (_, index) => index + gameState.backgroundMenu * 6);
    var topRow = indexArr.map((v) => {return miniBackground(collected, v, gameState, gameStateDispatch, Styles)});
    var bottomRow = indexArr.map((v) => {return miniBackground(collected, v + 3, gameState, gameStateDispatch, Styles)});

    const bgVal = (gameState.backgroundMenu + 1)

    const bgCount = bgVal.toString() + "/" + BGScreenNum.toString();

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
        <View style={Styles.pageCount}>
            <Text style={Styles.pageCountText}>{bgCount}</Text>
        </View>
    </View>);
}

function confirmBackground(Style: any, gameState: any, gameStateDispatch: any) {
    return (
    <View style={Style.confirmBg}>
        <Pressable onPress={() => gameStateDispatch({...gameState, newState: "backgroundChanged"})} style={Style.yesPressable}>
            <Image source={PetImages.yes} style={Style.yesnoImage}/>
        </Pressable>
        <Pressable onPress={() => gameStateDispatch({...gameState, newState: "backgroundDenied"})} style={Style.noPressable}>
            <Image source={PetImages.no} style={Style.yesnoImage}/>
        </Pressable>
    </View>
    );
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
                    <Text style={Styles.confirmNameText}>
                        {leftText(gameState)}
                    </Text>
                </Pressable>
                <View style={Styles.nameEnterView}>
                    <TextInput style={Styles.enterName}
                    onChangeText={(text) => {name = text}}
                    keyboardType="default"
                    placeholder={name}
                    maxLength = {10}
                />
                </View>
                <Pressable style={Styles.confirmName} onPress={resetName}>
                    <Text style={Styles.confirmNameText}>
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

const maxPages = Math.ceil((PetImages.egg.length + 1) / 3);
function pickEggs(Styles, gameState: any, gameStateDispatch: any) {
    const [eggOne, setEggOne] = useState(false);
    const [eggTwo, setEggTwo] = useState(false);
    const [eggThree, setEggThree] = useState(false);

    const leftEgg = gameState.focusedEgg;
    const order = gameState.shuffleOrder;

    const twoEggs = (leftEgg == PetImages.egg.length - 1) ;
    const midEgg = (leftEgg + 1) % PetImages.egg.length;
    const rightEgg = (midEgg + 1) % PetImages.egg.length;

    const currPage = Math.ceil((leftEgg - (leftEgg % 3)) / 3);
    const pageCount = (currPage + 1).toString() + " / " + maxPages.toString();
    
    if(!twoEggs) {
    return (
        <View style={Styles.screenLayout}>
                <View style={Styles.upperScreen}>
                    <Text style={Styles.screenText}> 
                        {screenPrompt(gameState)}
                    </Text>
                </View>
            <View style={Styles.eggSelectView}>
            <Pressable onPress={() => gameStateDispatch({...gameState, egg: order[leftEgg] + 1, newState: 'eggPicked'})} onHoverIn={() => setEggOne(true)} onHoverOut={() => setEggOne(false)}>
                <View style={Styles.eggSelect}>
                    <Image source={PetImages.shadow} style={Styles.eggSelectShadow} resizeMode="contain"/>
                    <Image source={PetImages.egg[order[leftEgg]]} style={eggOne ? Styles.eggSelectWithShadow : Styles.eggSelect} resizeMode="contain"/>
                </View>
            </Pressable>
            <Pressable onPress={() => gameStateDispatch({...gameState, egg: order[midEgg] + 1, newState: 'eggPicked'})} onHoverIn={() => setEggTwo(true)} onHoverOut={() => setEggTwo(false)}>
                <View style={Styles.eggSelect}>
                    <Image source={PetImages.shadow} style={Styles.eggSelectShadow} resizeMode="contain"/>
                    <Image source={PetImages.egg[order[midEgg]]} style={eggTwo ? Styles.eggSelectWithShadow : Styles.eggSelect} resizeMode="contain"/>
                </View> 
            </Pressable>
            <Pressable onPress={() => gameStateDispatch({...gameState, egg: order[rightEgg] + 1, newState: 'eggPicked'})} onHoverIn={() => setEggThree(true)} onHoverOut={() => setEggThree(false)}>
                <View style={Styles.eggSelect}>
                    <Image source={PetImages.shadow} style={Styles.eggSelectShadow} resizeMode="contain"/>
                    <Image source={PetImages.egg[order[rightEgg]]} style={eggThree ? Styles.eggSelectWithShadow : Styles.eggSelect} resizeMode="contain"/>
                </View>
            </Pressable>
            </View>
            {/* <View style={Styles.eggCount}>
                <Text style={Styles.pageCountText}>{pageCount}</Text> 
            </View> */}
        </View>
    )
    } else {
        return (
        <View style={Styles.screenLayout}>
            <View style={Styles.upperScreen}>
                <Text style={Styles.screenText}> 
                    {screenPrompt(gameState)}
                </Text>
            </View>
            <View style={Styles.eggSelectView}>
            <Pressable onPress={() => gameStateDispatch({...gameState, egg: order[leftEgg] + 1, newState: 'eggPicked'})} onHoverIn={() => setEggOne(true)} onHoverOut={() => setEggOne(false)}>
                <View style={Styles.eggSelect}>
                    <Image source={PetImages.shadow} style={Styles.eggSelectShadow} resizeMode="contain"/>
                    <Image source={PetImages.egg[order[leftEgg]]} style={eggOne ? Styles.eggSelectWithShadow : Styles.eggSelect} resizeMode="contain"/>
                </View>
            </Pressable>
            <Pressable onPress={() => gameStateDispatch({...gameState, egg: order[midEgg] + 1, newState: 'eggPicked'})} onHoverIn={() => setEggTwo(true)} onHoverOut={() => setEggTwo(false)}>
                <View style={Styles.eggSelect}>
                    <Image source={PetImages.shadow} style={Styles.eggSelectShadow} resizeMode="contain"/>
                    <Image source={PetImages.egg[order[midEgg]]} style={eggTwo ? Styles.eggSelectWithShadow : Styles.eggSelect} resizeMode="contain"/>
                </View>
            </Pressable>
            </View>
            <View style={Styles.eggCount}>
                <Text style={Styles.pageCountText}>{pageCount}</Text> 
            </View>
        </View>)
    }
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
        // case "hatching":
        //     img = Animations.hatching;
            break; 
    }
    return img;
}

function gameplay(Styles, gameState: any, gameStateDispatch: any) {
    var img = getImage(gameState);

    const Anim = () => {
        if(gameState.state.slice(-4) === "Anim") {
            return <Image source={getAnim(gameState, gameStateDispatch)} style={Styles.animation}/> 
        } else if (gameState.state === "hatching") {
            return <Image source={getAnim(gameState, gameStateDispatch)} style={Styles.animation}/> 
        }
    }

    const left = leftText(gameState);
    const right = rightText(gameState);
    const top = screenPrompt(gameState);
    return (
    <View style={Styles.screenLayout}>
        <View style={{...Styles.upperScreen, opacity: top == "" ? 0 : 1}}>
            <Text style={Styles.screenText}> 
                {top}
            </Text>
        </View>
        <View style={Styles.lowerScreen}>
            <Pressable style={{...Styles.textPressable, opacity: left == "" ? 0 : 1}} onPress={() => {leftButton(gameState, gameStateDispatch)}}>
            <Text style={Styles.leftText}>
                {left}
            </Text>
            </Pressable>
            <View style={Styles.pet}>
                    <Image source={PetImages.shadow} style={Styles.petShadow} resizeMode="contain"/>
                    <Image source={img} style={Styles.pet} resizeMode="contain"/>
            </View>
            {Anim()}
            <Pressable style={{...Styles.textPressable, opacity: right == "" ? 0 : 1}}  onPress={() => {rightButton(gameState, gameStateDispatch)}}>
            <Text style={Styles.rightText}>
                {right}
            </Text>
            </Pressable>
        </View>
    </View>
    )
}

function getImage(gameState: any) {
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
        case "petAnim":
        case "playAnim":
        case "feedAnim":
        case "giftAnim":
            output = PetImages.actionPet[gameState.pet-1];
            break;
        case "hatchingAnim":
        case "petHatched":
        default: 
            output = PetImages.pet[gameState.pet-1];
            break;
        

    }
    console.log(output);
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
            action.newState = "leftBG";
            break;
        case "pickEgg":
            action.newState = "leftEgg";
            break;
        case "collection":
            action.newState = "leftColl";
            break;
        case "stats":
            action.newState = "options";
            break;
        default: 
            return;          
    }
    dispatch(action);
}


export function rightButton(gameState: any, dispatch: any) {
    console.log("right!");
    var action; //= { ...gameState};
    switch(gameState.state) {
        case "hatching":
            action = {...gameState, newState: "unhatched"}
            //action.newState = "unhatched";
            break;
        case "confirmEgg":
            action = {...gameState, newState: "eggRejected"}
            //action.newState = "eggRejected";
            break;
        case "pickName":
            return resetName();
        case "selectBackground":
            action = {...gameState, newState: "rightBG"}
            //action.newState = "rightBG";
            break;
        case "pickEgg":
            action = {...gameState, newState: "rightEgg"}
            //action.newState = "rightEgg";
            break;
        case "collection":
            action = {...gameState, newState: "rightColl"}
            //action.newState = "rightColl";
            break;
        case "stats":
            action = {...gameState, newState: "options"};
            break;
        default:
            return;
    }
    console.log(action);
    dispatch(action);
}