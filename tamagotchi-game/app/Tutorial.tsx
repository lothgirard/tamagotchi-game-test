import React from 'react';
import { View, Image, Text } from 'react-native';


export function Tutorial({Styles, isVisible}) {
    if(!isVisible) { return <View/>; }
    return (<View style={Styles.tutorial}>
        <Text style={Styles.tutorialText}>
        <div>
            1. Select an egg by tapping or clicking on the screen!
        </div>
        <div>
            2. Navigate through choices and menus using <Image source={require('../assets/images/game-images/left-arrow.png')} style={Styles.tutorialArrows} resizeMode='contain'/> <Image source={require('../assets/images/game-images/right-arrow.png')} style={Styles.tutorialArrows} resizeMode='contain' />
        </div>
        <div>
            3.  <Image source={require('../assets/images/game-images/tamagotchi-screen.png')} style={Styles.tutorialScreenshot} resizeMode='contain'/> are used to interact with your chosen pet.
        </div>
        <div>
            4.  <Image source={require('../assets/images/game-images/reset-button.png')} style={Styles.tutorialButtonImage} resizeMode='contain'/> to pick a new egg.
        </div>
        <div>
            5.  <Image source={require('../assets/images/game-images/options-button.png')} style={Styles.tutorialButtonImage} resizeMode='contain'/> to view stats and more.
        </div>
        <div>
            6. Have fun!
        </div>
        </Text>
    </View>)
}