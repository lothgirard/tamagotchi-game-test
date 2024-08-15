import { useContext, createContext, useReducer, ReactNode, Dispatch, SetStateAction, useEffect } from 'react';

const FrogCount = 12;

export const ActionListContext = createContext<Array<String>>([]);
export const ActionListDispatchContext = createContext<any>({state: null, dispatch: () => null});
export const ProgressContext = createContext<Array<number>>([]);
export const ProgressDispatchContext = createContext<any>({state: null, dispatch: () => null});
export const GameStateContext = createContext<Array<String>>([]);
export const GameStateDispatchContext = createContext<any>({state: null, dispatch: () => null});

const StartState = ['egg_1'];

export const GameStateContextProvider = ({children}) => { 

    function progressStateReducer(state: Array<number>, action: number) {
        var newState = state;
        if(0 <= action && action < FrogCount && !state.includes(action)) {
            newState = newState.concat([action]);
        }
        localStorage.setItem('progress', JSON.stringify(newState));
        return newState;

    }   
    const [progressState, progressStateDispatch] = useReducer(progressStateReducer, []);

    useEffect(() => {
        //localStorage.setItem('progress', JSON.stringify([]));
        const storage = localStorage.getItem('progress');
        console.log("storage is: ", typeof storage);
        if(storage) {
            const existingCollection = JSON.parse(storage);
            console.log(existingCollection);
            if(existingCollection.length > progressState.length) {
                for(var i = 0; i < existingCollection.length; i = i + 1) {
                    progressStateDispatch(Number(existingCollection[i]));
                }
            } 
        }
    }, [progressState, progressStateDispatch]);

    console.log(progressState);

    function actionListReducer(state: Array<String>, action: Array<String>) {
        console.log("Action: ", action);
        switch(action[0]) {
            case "hatching":
                return state;
            case "reset":
                return state.slice(0, 0);
            default: 
                //console.log(action);
                //state.push(action[0]);
                var output = state.concat(action);
                //console.log(state);
                //console.log("state was changed");
                return output;
        }
    }
    const [actionList, actionListDispatch] = useReducer(actionListReducer, []);


    function gameStateReducer(state: Array<String>, action: Array<String>) {
        //console.log(action);
        //console.log(state);
        switch(action[0]) {
            case "hatchingAnim":
            case "hatching":
                state = action;
                break;
            case "hatched":
                var number = getPet(action[1], action[2]);
                var pet = "pet_" + String(number);
                progressStateDispatch(number);
                state = [pet];
                break;
            case "reset":
                state = StartState;
                actionListDispatch(["reset"]);            
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
    console.log(input);
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

function getPet(egg: String, hatchAction: string) {
    
    var value = (Number(egg[egg.length-1]) - 1) * 4 + ActionMap(hatchAction);
    console.log(value);
    return value > 2 ? 1 : value;
    switch(egg) {
        default: 
            switch(hatchAction) {
                case "pet":
                    return 1;
                default:
                    return ;

                /*
                */
            }
        /*

        */
    }
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