import { useContext, createContext, useReducer, ReactNode, Dispatch, SetStateAction } from 'react';

const FrogCount = 12;

export const ActionListContext = createContext<Array<String>>([]);
export const ActionListDispatchContext = createContext<any>({state: null, dispatch: () => null});
export const ProgressContext = createContext<Array<number>>([]);
export const ProgressDispatchContext = createContext<any>({state: null, dispatch: () => null});
export const GameStateContext = createContext<Array<String>>([]);
export const GameStateDispatchContext = createContext<any>({state: null, dispatch: () => null});

export const GameStateContextProvider = ({children}) => { 
    const [actionList, actionListDispatch] = useReducer(actionListReducer, []);
    const [progressState, progressStateDispatch] = useReducer(progressStateReducer, []);
    const [gameState, gameStateDispatch] = useReducer(gameStateReducer, []);

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

export function actionListReducer(state: Array<String>, action: string) {
    switch(action) {
        default: 
            state.push(action);
            return state;
    }
}

export function progressStateReducer(state: Array<number>, action: number) {
    if(0 <= action && action < FrogCount) {
        state.push(action);
    }
    return state;
}

export function gameStateReducer(state: Array<String>, action: string) {
    switch(action) {
        default:
            return state;
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