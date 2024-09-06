import { useContext, createContext, useReducer, ReactNode, Dispatch, SetStateAction, useEffect } from 'react';

const FrogCount = 12;

const StartState = {state: 'pickEgg', egg: -1, pet: -1, hatchAction: '', oldState: '', name: 'Froggy :)', age: '23', eggHatched: false};

type GameState = {
    state: string, 
    egg: number,
    pet: number,
    hatchAction: string,
    oldState: string,
    eggHatched: boolean,
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
                //console.log(state);
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
                state = {...state, state: action.newState, egg: action.egg, hatchAction: action.hatchAction, oldState: state.state, eggHatched: true};
                break;
            case "hatching":
                state = {...state, state: action.newState, egg: action.egg, hatchAction: action.hatchAction, oldState: state.state};
                break;
            case "hatched":
                var number = getPet(action.egg, action.hatchAction);
                //var pet = "pet_" + String(number);
                progressStateDispatch(number);
                state = {...state, state: 'petHatched', pet: number, eggHatched: true};
                break;
            case "eggPicked":
                state = {...state, state: 'confirmEgg', egg: action.egg};
                break;
            case "eggConfirmed":
                state = {...state, state: 'pickName', egg: action.egg};
                break;
            case "eggRejected":
                state = {...state, state: 'pickEgg'};
                break;
            case "eggNamed":
                state = {...state, state: 'egg', name: action.name, oldState: state.state};
                break;
            case "options":
                state = {...state, state:"options", oldState: state.state};
                break;
            case "petAnim":
            case "playAnim":
            case "giftAnim":
            case "feedAnim":
            case "wasPet":
            case "wasPlay":
            case "wasGift":
            case "wasFeed":
                if (state.state !== "hatching") { state = {...state, state: action.newState}; break;} 
            case "stats":
            case "collection":
            case "credits": 
                state = {...action, state: action.newState};
                break;
            case "return":
                state = {...action, state: state.oldState};
                break;
            case "reset":
                state = StartState;
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