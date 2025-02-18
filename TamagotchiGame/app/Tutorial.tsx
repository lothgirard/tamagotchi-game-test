import React from 'react';
import { View, Image, Text } from 'react-native';


export function Tutorial({Styles, isVisible}) {
    if(!isVisible) { return <View/>; }
    return (<View style={Styles.tutorial}>
        <Text style={Styles.tutorialText}>
            1. Select an egg by tapping or clicking on the screen!
        </Text>
        <Text style={Styles.tutorialText}>
            2. Navigate through menus and choices with:
        </Text> 
        <View style={Styles.tutorialArrowsView}>
            <Image source={require('../assets/images/game-images/left-arrow.png')} style={Styles.tutorialArrows} resizeMode='contain'/>
            <Image source={require('../assets/images/game-images/right-arrow.png')} style={Styles.tutorialArrows} resizeMode='contain' />  
        </View>
        <Text style={Styles.tutorialText}>
            3. Interact with your chosen pet by using 
        </Text>
        <Image source={require('../assets/images/game-images/buttons-for-tutorial.png')} style={Styles.tutorialScreenshot} resizeMode='contain'/>
        <Text style={Styles.tutorialText}>
            4. Pick a new egg by pressing
        </Text>
        <Image source={require('../assets/images/game-images/reset-button.png')} style={Styles.tutorialButtonImage} resizeMode='contain'/>
        <Text style={Styles.tutorialText}>
            5. To view stats, change the screen background, and more:
        </Text>
        <Image source={require('../assets/images/game-images/options-button.png')} style={Styles.tutorialButtonImage} resizeMode='contain'/>
        <Text style={Styles.tutorialText}>
            6. Have fun!
        </Text>
        <Text style={Styles.tutorialText}>
            Credits: @fincho, @cro, @logthatdata, <div/> <a href='https://frogpon.art/petsim/credits/' style={{color: 'white'}}>and all these wonderful artists!</a>
        </Text>
    </View>)
}