import { createContext, Dispatch, ReactNode, useReducer } from "react"
import { BudgetAction, budgetReducer, BudgetState, initialState } from "../reducers/bubget-reducer"

type BudgetContextProps = {
    state: BudgetState
    dispatch: Dispatch<BudgetAction>
}

type BudgetProvider = {
    children: ReactNode
}

export const BudgetContext = createContext<BudgetContextProps>(null!);

export const BudgetProvider = ({children} : BudgetProvider) => {

    const [state, dispatch] = useReducer(budgetReducer, initialState);

    return(
        <BudgetContext.Provider 
            value={{
                state,
                dispatch
            }}
        >
            {children}
        </BudgetContext.Provider>
    )
}