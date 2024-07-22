import { useContext, createContext, useReducer, ReactNode, Dispatch, SetStateAction } from 'react';

const FrogCount = 12;

export const ActionListContext = createContext<Array<String>>([]);
export const ActionListDispatchContext = createContext<any>({state: null, dispatch: () => null});
export const ProgressContext = createContext<Array<number>>([]);
export const ProgressDispatchContext = createContext<any>({state: null, dispatch: () => null});
export const GameStateContext = createContext<Array<String>>([]);
export const GameStateDispatchContext = createContext<any>({state: null, dispatch: () => null});

export const GameStateContextProvider = ({children}) => { 

    function progressStateReducer(state: Array<number>, action: number) {
        if(0 <= action && action < FrogCount) {
            state.push(action);
        }
        return state;
    }   
    const [progressState, progressStateDispatch] = useReducer(progressStateReducer, []);

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
            default:
        }
        //console.log(state);
        return state;
    }
    const [gameState, gameStateDispatch] = useReducer(gameStateReducer, ['egg_1']);
    //console.log(gameState);
    function actionListReducer(state: Array<String>, action: Array<String>) {
        switch(action[0]) {
            case "hatching":
                return state;
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

function getPet(egg: String, hatchAction: String) {
    switch(egg) {
        default: 
            switch(hatchAction) {
                case "pet":
                    return 1;
                default:
                    return 2;
            }
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