import { StyleSheet, Dimensions } from 'react-native';



export function GenerateStyles(winWidth: number, winHeight: number) {


    //egg ratio: 146 x 178 (or 73 x 89)
    function calculateEggDims() {
        var eggRatio = 146 / 178;
        if(winWidth/ winHeight >= eggRatio) {
            var height = winHeight;
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
        var height = ratio * 11;
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
        bottom: 2* arrowDims.height -screenDims.height,
        'imageRendering': 'pixelated',
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
    },
    smallButtonRow: {
        flexDirection: 'row',
        width: (buttonDims.smallWidth * 2) + 15 * ratio,
        justifyContent: 'space-around',
        //top: -1 * ratio,
    },
    buttonColumns: {
        height: buttonDims.bigHeight * 2 + ratio * 10 + buttonDims.smallHeight,
        justifyContent: 'space-between', 
        alignItems: 'center',
        flexDirection: 'column',
        position: 'absolute',   
        top: screenDims.top + screenDims.height + ratio* 5,
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
        fontFamily: 'Tama-Connect',
        fontSize: 4 * ratio,
        textAlign: 'center',
        //adjustsFontSizeToFit: 'true',
    },
    leftText: {
        fontFamily: 'Tama-Connect',
        fontSize: 24, //FONT SIZE MUST BE VARIABLE TOO (ugh)
        width: 19 * ratio,
        textAlign: 'left',
        left: 2 * ratio,
        bottom: 2.125 * arrowDims.height -  screenDims.height,
        //adjustsFontSizeToFit: 'true',
    },
    rightText: {
        fontFamily: 'Tama-Connect',
        fontSize: 24,
        width: 19 * ratio,
        textAlign: 'right',
        right: 1.5 * ratio,
        bottom: 2.125 * arrowDims.height - screenDims.height,
        //adjustsFontSizeToFit: 'true',
    },
    pet: {
        height: petDims,
        width: petDims,
        //alignSelf: 'center',
        //left: - 18 * ratio,
        borderWidth: 1, 
        borderColor: "0x330000",
    },
    screenLayout: { 
        width: screenDims.width,
        height: screenDims.height,
        flexDirection: 'column',
    },
    upperScreen: {
        width: screenDims.width - 2 * ratio,
        height: ratio * 16,
        position: 'relative',
        top: 3 * ratio,
        borderColor: '0x330000',
        borderWidth: 1,
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
        borderColor: '0x330000',
        borderWidth: 1,
    },
    tutorial: {},
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
    tutorialButton: {},
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
        fontFamily: 'Tama-Connect',
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
        fontFamily: 'Tama-Connect',
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
        fontFamily: 'Tama-Connect',
        fontSize: 4 * ratio,
        //bottom: 0,
        alignSelf:'flex-end',
        borderColor: '0x330000',
        borderWidth: 1,
        textAlign: 'center',
    },
    selectName: {
        width: screenDims.width - 2 * ratio,
        height: screenDims.height - 5 * ratio, 
        position: 'relative',
        top: -ratio * 13,
        alignSelf: 'center',
        //alignItems: 'center',
        flexDirection: 'row',
        borderColor: '0x330000',
        borderWidth: 1,
        justifyContent: 'space-between'
    },
    enterName: {
        width: 30 * ratio,
        height: 10 * ratio, 
        alignSelf: 'center',
        fontFamily: 'Tama-Connect',
        fontSize: 4 * ratio,
    }
})};

//export const Styles = GenerateStyles();