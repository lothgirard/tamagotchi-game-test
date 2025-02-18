import { requireNativeModule } from 'expo';
import { isAbsoluteUrl } from 'next/dist/shared/lib/utils';
import { StyleSheet, Dimensions, Platform } from 'react-native';
import { configureLayoutAnimationBatch } from 'react-native-reanimated/lib/typescript/reanimated2/core';



export function GenerateStyles(winWidth: number, winHeight: number) {


    //egg ratio: 146 x 178 (or 73 x 89)
    function calculateEggDims() {
        var eggRatio = 146 / 178;
        if(winWidth/ winHeight >= eggRatio) {
            var height =  winHeight / 1.5;
            var width = height * eggRatio;

        } else {
            var width = winWidth;
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
    backgroundImage: {
        width: winWidth, 
        height: winHeight,
        imageRendering: 'pixelated',
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
    },
    screenText: {
        fontFamily: 'Press-Start',
        fontSize: 3.5 * ratio,
        textAlign: 'center',
        //adjustsFontSizeToFit: 'true',
    },
    leftText: {
        fontFamily: 'Press-Start',
        fontSize: 4 * ratio, 
        textAlign: 'center',
        //left: 2 * ratio,
        //bottom: 1.5 * arrowDims.height -  screenDims.height,
        //adjustsFontSizeToFit: 'true',
    },
    rightText: {
        fontFamily: 'Press-Start',
        fontSize: 4 * ratio,
        textAlign: 'center',
        //right: 10 * ratio,
        //bottom: 1.5 * arrowDims.height - screenDims.height,
        //adjustsFontSizeToFit: 'true',
    },
    pageCount: {
        // width: petDims/4.5,
        // height: petDims/4.5,
        top: -5 * ratio,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pageCountText: {
        fontsize: ratio, 
        fontFamily: 'Press-Start',
    },
    eggCount: {
        // width: petDims/4.5,
        // height: petDims/4.5,
        top: -10 * ratio,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pet: {
        height: petDims,
        width: petDims,
        //alignSelf: 'center',
        //left: - 18 * ratio,
        //borderWidth: 1, 
        //borderColor: "0x330000",
    },
    petShadow: {
        position: 'absolute',
        width: screenDims.width / 1.75,
        height: screenDims.height / 1.75,
        bottom: petDims / 5,
        left: petDims / 18,
        zIndex: -1,
    },
    animation: {
        height: petDims,
        width: petDims,
        position: 'absolute',
        left: 20 * ratio,
    },
    screenLayout: { 
        width: screenDims.width,
        height: screenDims.height,
        flexDirection: 'column',
    },
    optionsScreen: {
        width: screenDims.width + 2 * ratio,
        height: screenDims.height + 1 * ratio,
        left: -1 * ratio,
        top: -1 * ratio,

    },
    upperScreen: {
        width: screenDims.width - 8 * ratio,
        height: ratio * 16,
        position: 'relative',
        top: 5 * ratio,
        //borderColor: '0x330000',
        //borderWidth: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(244, 252, 238, 0.75)',
        borderRadius: 15
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
        backgroundColor: '#7ccb9d',
        borderColor: 'rgba(0, 0, 0, 1.0)',
        borderWidth: 1 * ratio,
        position: 'absolute',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'black',
        shadowRadius: 15 * ratio,

    },
    tutorialText: {
        fontFamily: 'Press-Start',
        fontSize: 3 * ratio,
        alignSelf: 'flex-start',
        padding: 1 * ratio,
        //alignText: 'center',
    },
    tutorialArrows: {
        width: 5 * ratio, 
        height: 10 * ratio,
        alignSelf: 'center',
    },
    tutorialArrowsView: { 
        width: 10 * ratio, 
        height: 10 * ratio,
        flexDirection: 'row',
    },
    tutorialButtonImage: {
        width: 30 * ratio, 
        height: 10 * ratio,
        alignSelf: 'center'

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
        alignSelf: 'center'
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
    miniBackground: {
        width: screenDims.width/4.5,
        height: screenDims.height/4.5,
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
        width: eggDims.width/4.5,
        height: eggDims.height/4.5,
        bottom: 2 * ratio,
        //borderColor: '0x330000',
        //borderWidth: 1,
    },
    eggSelectWithShadow: {
        width: eggDims.width/4.5,
        height: eggDims.height/4.5,
        bottom: 2 * ratio,
        shadowColor: 'rgba(0, 160, 50, 1)',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 1,
        shadowRadius: 3, 
        elevation: 3,
    },
    eggSelectView: {
        //bottom: 0,
        alignItems: 'flex-end',
        width: screenDims.width - 2 * ratio,
        height: screenDims.height - 16 * ratio,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
    },
    eggSelectShadow: {
        position: 'absolute',
        bottom: '30%',
        zIndex: -1,
        left: '1%',
        width: eggDims.width / 4.5,
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
    statsShadow: {
        width: screenDims.width * 0.5,
        height: screenDims.height * 0.5,
        position: 'absolute',
        zIndex: -1,
        bottom: petDims / 9,
        left: -1 * ratio,
    },
    info: {
        width: screenDims.width - 2 * ratio - petDims * 0.75,
        height: screenDims.height - 10 * ratio,
        justifyContent: 'space-around',
        flexDirection: 'column',
        top: 2.75 * ratio,
        borderRadius: 5,
        paddingLeft: 2 * ratio,
        right: 1 * ratio,
        backgroundColor: 'rgba(244, 252, 238, 0.75)'
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
        height: screenDims.height / 6,
        width: 25 * ratio,
        fontFamily: 'Press-Start',
        fontSize: 4 * ratio,
        //bottom: 0,
        //alignSelf:'flex-end',
        //borderColor: '0x330000',
        //borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        //textAlign: 'center',
        bottom: - 3.25 * arrowDims.height,
        backgroundColor: 'rgba(244, 252, 238, 0.75)',
        borderRadius: 5,
    },
    confirmNameText: {
        height: screenDims.height / 8,
        width: 25 * ratio,
        fontFamily: 'Press-Start',
        fontSize: 4 * ratio,
        //bottom: 0,
        //alignSelf:'flex-end',
        //borderColor: '0x330000',
        //borderWidth: 1,
        textAlign: 'center',
    },
    textPressable: {
        height: screenDims.height / 6,
        width: 18 * ratio,
        //bottom: 0,
        //alignSelf:'flex-end',
        //borderColor: '0x330000',
        //borderWidth: 1,
        alignContent: 'center',
        justifyContent: 'center',
        bottom: - 0.675 * screenDims.height,
        backgroundColor: 'rgba(244, 252, 238, 0.75)',
        borderRadius: 5,
    },
    selectName: {
        width: screenDims.width - 2 * ratio,
        height: screenDims.height - 5 * ratio, 
        position: 'relative',
        top: -ratio * 13,
        alignSelf: 'center',
        flexDirection: 'row',
        //borderColor: 'rgb(0, 0, 0, 1.0)',
        //borderWidth: 1,
        justifyContent: 'space-between'
    },
    enterName: {
        flex: 1,
        alignSelf: 'center',
        fontFamily: 'Press-Start',
        fontSize: 4 * ratio,
        //borderWidth: 1,
        //borderColor: '0x0f0000',
        maxWidth: eggDims.width / 3,
    },
    nameEnterView: {
        flexDirection: 'row',
        alignSelf: 'center',
        maxWidth: eggDims.width / 3,
        height: 10 * ratio, 
        //borderWidth: 1,
    },
    confirmBg: {
        width: screenDims.width,
        height: screenDims.height,
        alignContent: 'space-between',
        flexDirection: 'row',
    },
    yesPressable: {
        width: 19 * ratio,
        height: 17 * ratio,
        flex: 1,
        paddingLeft: 3 * ratio,
        bottom: -screenDims.height * 0.65,
    },
    noPressable: {
        width: 19 * ratio,
        height: 17 * ratio,
        flex: 1,
        paddingRight: 3 * ratio,
        bottom: -screenDims.height * 0.65,
        alignItems: 'flex-end',
    },
    yesnoImage: {
        width: 19 * ratio,
        height: 17 * ratio,
    },
    transparentClickable: {
        width: screenDims.width, 
        height: screenDims.height,
        opacity: 0,
    },



})};

