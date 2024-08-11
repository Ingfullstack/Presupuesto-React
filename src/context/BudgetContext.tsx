import { createContext, Dispatch, ReactNode, useMemo, useReducer } from "react"
import { BudgetAction, budgetReducer, BudgetState, initialState } from "../reducers/bubget-reducer"

type BudgetContextProps = {
    state: BudgetState
    dispatch: Dispatch<BudgetAction>
    totalExpense: number,
    totales: number
}

type BudgetProvider = {
    children: ReactNode
}

export const BudgetContext = createContext<BudgetContextProps>(null!);

export const BudgetProvider = ({children} : BudgetProvider) => {

    const [state, dispatch] = useReducer(budgetReducer, initialState);
    const totalExpense = useMemo(() => state.expenses.reduce((total, item) => total + item.amount,0) , [state.expenses]);
    const totales = useMemo(() => state.budget - totalExpense,[state.expenses]);

    return(
        <BudgetContext.Provider 
            value={{
                state,
                dispatch,
                totalExpense,
                totales
            }}
        >
            {children}
        </BudgetContext.Provider>
    )
}