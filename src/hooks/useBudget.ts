import { useContext } from "react"
import { BudgetContext } from "../context/BudgetContext"



export const useBudget = () => {

    const context = useContext(BudgetContext);

    if (!context) {
        throw new Error ('Fallo el el usecontext');
    }

    return context
}