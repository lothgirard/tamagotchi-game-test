import { isAbsoluteUrl } from 'next/dist/shared/lib/utils';
import { StyleSheet, Dimensions, Platform } from 'react-native';
import { configureLayoutAnimationBatch } from 'react-native-reanimated/lib/typescript/reanimated2/core';



export function GenerateStyles(winWidth: number, winHeight: number) {


    //egg ratio: 146 x 178 (or 73 x 89)
    function calculateEggDims() {
        var eggRatio = 146 / 178;
        if(winWidth/ winHeight >= eggRatio) {
            var height = Platform.OS !== 'android' && Platform.OS !== 'ios' ? winHeight / 1.5 : winHeight;
            var width = height * eggRatio;

        } else {
            var width = Platform.OS !== 'android' && Platform.OS !== 'ios' ? winWidth / 1.5 :  winWidth ;
            var height = width / eggRatio;
        }
        return {width: width, height: height};
    }

    const eggDims = calculateEggDims();

    //screen ratio: 102 x 69, in original aspect ratio the screen would be 36 pixels from the top 
    function calculateScreenDims() {
        var ratio = eggDims.width / 146;
        var width = ratio * 102;
        var height = ratio * 69;
        var top = ratio * 32;
        return {width: width, height: height, top: top};
    }

    const screenDims = calculateScreenDims();

    function calculateButtonDims() {
        var ratio = eggDims.width / 146;
        var bigWidth = ratio * 48;
        var bigHeight = ratio * 16;
        var smallWidth = ratio * 43;
        var smallHeight = ratio * 11;
        return {bigWidth: bigWidth, bigHeight: bigHeight, smallWidth, smallHeight};
    }

    const buttonDims = calculateButtonDims();

    function calculateArrowDims() {
        var ratio = eggDims.width / 146;
        var width = ratio * 8;
        var height = ratio * 14;
        return {width: width, height: height}
    }

    function calculatePetDims() {
        var ratio = eggDims.width/146;
        var size = ratio * 64;
        return size;
    }

    const arrowDims = calculateArrowDims();
    const petDims = calculatePetDims();
    var ratio = (eggDims.width / 146);
    return StyleSheet.create({
    egg: {
        justifyContent: "center",
        alignItems: "center",
        width: eggDims.width,
        height: eggDims.height,
        'imageRendering': 'pixelated',
    },
    upperDisplay: {
        height: screenDims.height, 
        width: screenDims.width + 2 * (arrowDims.width + ratio * 2),
        top: screenDims.top,
        position: 'absolute',
        flexDirection: 'row',
    },
    screenArea: {
        height: screenDims.height, 
        width: screenDims.width + 2 * (arrowDims.width + ratio * 2),
        top: screenDims.top,
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    screen: {
        width: screenDims.width,
        height: screenDims.height, 
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        'imageRendering': 'pixelated'
    },
    arrow: {
        height: arrowDims.height,
        width: arrowDims.width,
        bottom: 1.7 * arrowDims.height -screenDims.height,
        'imageRendering': 'pixelated',
    },
    arrowPressable: {
        height: arrowDims.height,
        width: arrowDims.width,
    },
    bigButton: {
        width: buttonDims.bigWidth,
        height: buttonDims.bigHeight,
        'imageRendering': 'pixelated',
    },
    smallButton: {
        width: buttonDims.smallWidth,
        height: buttonDims.smallHeight,
        'imageRendering': 'pixelated',
    },
    buttonRow: {
        flexDirection: 'row',
        width: (buttonDims.bigWidth + 2 * ratio) * 2,
        justifyContent: 'space-between',
        left: 1 * ratio,
    },
    smallButtonRow: {
        flexDirection: 'row',
        width: (buttonDims.smallWidth * 2) + 4 * ratio,
        justifyContent: 'space-between',
        left: 1.5 * ratio,
        //top: -1 * ratio,
    },
    buttonColumns: {
        height: buttonDims.bigHeight * 2 + ratio * 10 + buttonDims.smallHeight,
        justifyContent: 'space-between', 
        alignItems: 'center',
        flexDirection: 'column',
        position: 'absolute',   
        top: screenDims.top + screenDims.height + ratio* 4,
        left: (eggDims.width - screenDims.width) / 2 - 3,   
    },
    outerView: {
        height: winHeight,
        width: winWidth,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#ab0000',
    },
    screenText: {
        fontFamily: 'Press-Start',
        fontSize: 3.5 * ratio,
        textAlign: 'center',
        //adjustsFontSizeToFit: 'true',
    },
    leftText: {
        fontFamily: 'Press-Start',
        fontSize: 3.5 * ratio, 
        width: 19 * ratio,
        textAlign: 'left',
        left: 2 * ratio,
        bottom: 2.125 * arrowDims.height -  screenDims.height,
        //adjustsFontSizeToFit: 'true',
    },
    rightText: {
        fontFamily: 'Press-Start',
        fontSize: 3.5 * ratio,
        width: 19 * ratio,
        textAlign: 'right',
        right: 4 * ratio,
        bottom: 2.125 * arrowDims.height - screenDims.height,
        //adjustsFontSizeToFit: 'true',
    },
    pet: {
        height: petDims,
        width: petDims,
        //alignSelf: 'center',
        //left: - 18 * ratio,
        //borderWidth: 1, 
        borderColor: "0x330000",
    },
    animation: {
        height: screenDims.height,
        width: screenDims.width,
        position: 'absolute',
        left: 0,
    },
    screenLayout: { 
        width: screenDims.width,
        height: screenDims.height,
        flexDirection: 'column',
    },
    upperScreen: {
        width: screenDims.width - 8 * ratio,
        height: ratio * 16,
        position: 'relative',
        top: 3 * ratio,
        //borderColor: '0x330000',
        //borderWidth: 1,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    lowerScreen: {
        width: screenDims.width - 2 * ratio,
        height: screenDims.height - 5 * ratio, 
        position: 'relative',
        top: -ratio * 13,
        alignSelf: 'center',
        //alignItems: 'center',
        flexDirection: 'row',
        //borderColor: '0x330000',
        //borderWidth: 1,
    },
    tutorial: {
        width: eggDims.width * 0.9,
        height: eggDims.height * 0.9, 
        backgroundColor: 'rgba(0, 150, 0, 1.0)',
        borderColor: 'rgba(0, 0, 0, 1.0)',
        borderWidth: 1 * ratio,
        position: 'absolute',
        center: 0,
    },
    tutorialText: {
        //fontFamily: 'Press-Start',
        fontSize: 5 * ratio,
    },
    tutorialArrows: {
        width: 5 * ratio, 
        height: 10 * ratio,
    },
    tutorialButtonImage: {
        width: 30 * ratio, 
        height: 10 * ratio,
    },
    tutorialButtonLocation: {
        right: -0.6 * screenDims.width,
        top: -0.75 * screenDims.width,
        width: 18 * ratio, 
        height: 18 * ratio,
        //pointerEvents: 'box-none'
    },
    tutorialButton: {
        //right: -0.6 * screenDims.width,
        //top: -0.75 * screenDims.width,
        //right: -0.6 * screenDims.width,
        //top: -0.75 * screenDims.width,
        width: 18 * ratio, 
        height: 18 * ratio,
    },
    tutorialScreenshot: {
        width: 50 * ratio,
        height: 40 * ratio,
    },
    collected: {
        width: petDims/4.5,
        height: petDims/4.5,
    },
    notCollected: {
        width: petDims/4.5,
        height: petDims/4.5,
        opacity: 0,
    },
    upperRowColl: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    bottomRowColl: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    collection: {
        flexDirection: 'column',
        width: screenDims.width - 2 * ratio,
        height: screenDims.height / 3 * 2,
        bottom: 0,
        justifyContent: 'space-evenly',
    },
    eggSelect: {
        width: eggDims.width/5,
        height: eggDims.height/4.5,
        bottom: 2 * ratio,
        //borderColor: '0x330000',
        //borderWidth: 1,
    },

    eggSelectView: {
        //bottom: 0,
        alignItems: 'flex-end',
        width: screenDims.width - 2 * ratio,
        height: screenDims.height - 5 * ratio,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
    },
    options:{
        alignItems: 'flex-end',
        width: screenDims.width,
        height: screenDims.height - 5 * ratio,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        top: -ratio * 13,
    },
    option: {
        width: eggDims.width/5,
        height: eggDims.height/4.5,
        bottom: 2 * ratio,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    optionText: {
        fontFamily: 'Press-Start',
        fontSize: 4 * ratio,
        width: '90%',
        textAlign: 'center',
        //borderColor: '0x330000',
        //borderWidth: 1,
    },
    stats: {
        flexDirection: 'row',
        width: screenDims.width - 2 * ratio,
        height: screenDims.height - 5 * ratio,
        bottom: 0,
    },
    statsImg: {
        width: petDims * 0.75, 
        height: petDims * 0.75, 
        alignSelf: 'center',
    },
    info: {
        width: screenDims.width - 2 * ratio - petDims * 0.75,
        height: screenDims.height - 10 * ratio,
        justifyContent: 'space-around',
        flexDirection: 'column',
    },
    stat: {
        fontFamily: 'Press-Start',
        fontSize: 4 * ratio,
        left: 0,
    },
    statRow: {
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-between',
        left: 0,
    },
    confirmName: {
        height: screenDims.height / 3.25,
        width: 25 * ratio,
        fontFamily: 'Press-Start',
        fontSize: 4 * ratio,
        //bottom: 0,
        alignSelf:'flex-end',
        //borderColor: '0x330000',
        //borderWidth: 1,
        textAlign: 'center',
    },
    selectName: {
        width: screenDims.width - 2 * ratio,
        height: screenDims.height - 5 * ratio, 
        position: 'relative',
        top: -ratio * 13,
        alignSelf: 'center',
        flexDirection: 'row',
        borderColor: 'rgb(0, 0, 0, 1.0)',
        borderWidth: 1,
        justifyContent: 'space-between'
    },
    enterName: {
        width: 30 * ratio,
        height: 10 * ratio, 
        alignSelf: 'center',
        fontFamily: 'Press-Start',
        fontSize: 4 * ratio,
    },
})};

