import { useContext, createContext, useReducer, ReactNode, Dispatch, SetStateAction, useEffect } from 'react';
import { PetImages, shuffle } from './PetImages';

const FrogCount = PetImages.pet.length;
export const CollScreenNum = Math.ceil(FrogCount / 12);
export const BGScreenNum = Math.ceil(PetImages.background.length / 6);

const StartState = {state: 'pickEgg', egg: -1, pet: -1, hatchAction: '', oldState: '', name: 'Froggy :)', age: '23', eggHatched: false, background: 1, oldBG: 1, focusedEgg: 0, backgroundMenu: 0, collectionScreen: 0, defaultBackground: true, shuffleOrder: shuffle()};

type GameState = {
    state: string, 
    egg: number,
    pet: number,
    hatchAction: string,
    oldState: string,
    eggHatched: boolean,
    background: number,
    focusedEgg: number,
    backgroundMenu: number,
    collectionScreen: number,
    defaultBackground: boolean,
    oldBG: number,
    shuffleOrder: number[],
};

export const ActionListContext = createContext<Array<String>>([]);
export const ActionListDispatchContext = createContext<any>({state: null, dispatch: () => null});
export const ProgressContext = createContext<Array<number>>([]);
export const ProgressDispatchContext = createContext<any>({state: null, dispatch: () => null});
export const GameStateContext = createContext<GameState>(StartState);
export const GameStateDispatchContext = createContext<any>({state: null, dispatch: () => null});


export const GameStateContextProvider = ({children}) => { 

    function progressStateReducer(state: Array<number>, action: number) {
        var newState = state;
        if(0 < action && action <= FrogCount && !state.includes(action)) {
            newState = newState.concat([action]);
        }
        localStorage.setItem('progress', JSON.stringify(newState));
        return newState;

    }   
    const [progressState, progressStateDispatch] = useReducer(progressStateReducer, []);

    useEffect(() => {
        //localStorage.setItem('progress', JSON.stringify([]));
        const storage = localStorage.getItem('progress');
        //console.log("storage is: ", typeof storage);
        if(storage) {
            const existingCollection = JSON.parse(storage);
            //console.log(existingCollection);
            if(existingCollection.length > progressState.length) {
                for(var i = 0; i < existingCollection.length; i = i + 1) {
                    progressStateDispatch(Number(existingCollection[i]));
                }
            } 
        }
    }, [progressState, progressStateDispatch]);

    //console.log(progressState);

    function actionListReducer(state: Array<String>, action: string) {
        //console.log("Action: ", action);
        switch(action) {
            case "hatching":
                return state;
            case "reset":
                return state.slice(0, 0);
            default: 
                //console.log(action);
                //state.push(action[0]);
                var output = state.concat([action]);
                console.log(output);
                //console.log("state was changed");
                return output;
        }
    }
    const [actionList, actionListDispatch] = useReducer(actionListReducer, []);


    function gameStateReducer(state: any, action: any) {
        console.log("we have received the action: ", action);
        //console.log(state);
        switch(action.newState) {
            case "hatchingAnim":
                var number = getPet(action.egg, action.hatchAction);
                //var pet = "pet_" + String(number);
                progressStateDispatch(number);
                state = {...state, state: action.newState, pet: number, egg: action.egg, hatchAction: action.hatchAction, oldState: state.state, eggHatched: true};
                break;
            case "hatching":
                state = {...state, state: action.newState, egg: action.egg, hatchAction: action.hatchAction, oldState: state.state};
                break;
            case "hatched":
                state = {...state, state: 'petHatched'};
                break;
            case "eggPicked":
                state = {...state, state: 'confirmEgg', egg: action.egg};
                break;
            case "eggConfirmed":
                state = {...state, state: 'pickName', egg: action.egg, background: 2};
                break;
            case "eggRejected":
                state = {...state, state: 'pickEgg'};
                console.log("the egg has been rejected");
                break;
            case "unhatched":
                state = {...state, state: 'egg'}
                break;
            case "eggNamed":
                state = {...state, state: 'egg', name: action.name, oldState: state.state};
                break;
            case "options":
                state = {...state, oldState: state.state, state:"options"};
                break;
            case "rightEgg":
                state = {...state, focusedEgg: (state.focusedEgg === PetImages["egg"].length - 1 ? 0 : (state.focusedEgg + 3) % PetImages["egg"].length)}
                break; 
            case "leftEgg":
                console.log(state.focusedEgg);
                state = {...state, focusedEgg: (state.focusedEgg === 0 ? PetImages["egg"].length - 1 : (state.focusedEgg - 3 + PetImages["egg"].length) % PetImages["egg"].length)}
                break;
            case "rightBG":
                state = {...state, backgroundMenu: (state.backgroundMenu + 1) % BGScreenNum}
                break; 
            case "leftBG":
                state = {...state, backgroundMenu: (state.backgroundMenu - 1 + BGScreenNum) % BGScreenNum}
                break; 
            case "rightColl":
                state = {...state, collectionScreen: (state.collectionScreen + 1) % CollScreenNum}
                break; 
            case "leftColl":
                state = {...state, collectionScreen: (state.collectionScreen - 1 + CollScreenNum) % CollScreenNum}
                break; 
            case "petAnim":
            case "playAnim":
            case "giftAnim":
            case "feedAnim":
                if (state.state !== "hatching") { 
                    state = {...state, state: action.newState}; break;
                } 
            case "wasPet":
            case "wasPlay":
            case "wasGift":
            case "wasFeed":
                if (state.state !== "hatching") { 
                    //console.log("reached this bit");
                    if (actionList.length > 3 && !state.eggHatched) { 
                        state = {...state, state: "hatching", egg: action.egg, hatchAction: action.hatchAction, oldState: state.state};
                        setTimeout(() => {gameStateReducer(state, {...gameState, newState: "hatched", egg: gameState.egg, hatchAction: gameState.hatchAction})}, 2000);
                        break;
                    }
                    state = {...state, state: action.newState}; break;
                } 
            case "stats":
            case "collection":
            case "selectBackground":
                state = {...action, state: action.newState};
                break;
            case "confirmBackground": 
                state = {...action, state: action.newState, background: action.background, oldBG: state.background};
                break;
            case "backgroundChanged":
                state = {...action, defaultBackground: false, state: action.oldState};
                break;
            case "backgroundDenied":
                state = {...action, state: "selectBackground", background: state.oldBG};
                break;
            case "return":
                state = {...action, state: state.oldState};
                break;
            case "reset":
                state = StartState;
                state.shuffleOrder = shuffle();
                actionListDispatch("reset");            
            default:
        }
        //console.log(state);
        return state;
    }
    const [gameState, gameStateDispatch] = useReducer(gameStateReducer, StartState);
    //console.log(gameState);


    return (
        <ActionListContext.Provider value ={actionList}>
            <ActionListDispatchContext.Provider value ={actionListDispatch}>
                <ProgressContext.Provider value={progressState}>
                    <ProgressDispatchContext.Provider value={progressStateDispatch}>
                        <GameStateContext.Provider value={gameState}>
                            <GameStateDispatchContext.Provider value={gameStateDispatch}>
                                {children}
                            </GameStateDispatchContext.Provider>
                        </GameStateContext.Provider>
                    </ProgressDispatchContext.Provider>
                </ProgressContext.Provider>
            </ActionListDispatchContext.Provider>
        </ActionListContext.Provider>
    )
}

function ActionMap(input: string) {
    //console.log(input);
    switch(input) {
        case "pet":
            return 1;
        case "play":
            return 2;
        case "gift":
            return 3;
        case "feed":
            return 4;
        default:
            return 1;
    }
}


function getPet(egg: number, hatchAction: string) {
    var value = (egg - 1) * 4 + ActionMap(hatchAction);
    return value;
}





export function useActionList() {
    return useContext(ActionListContext);
}

export function useActionListDispatch() {
    return useContext(ActionListDispatchContext);
}

export function useProgress() {
    return useContext(ProgressContext);
}

export function useProgressDispatch() {
    return useContext(ProgressDispatchContext);
}

export function useGameState() {
    return useContext(GameStateContext);
}

export function useGameStateDispatch() {
    return useContext(GameStateDispatchContext);
}