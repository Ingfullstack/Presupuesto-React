import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget";
import ExpenseDetail from "./ExpenseDetail";

export default function ExpenseList() {

    const { state } = useBudget();

    const filteredExpeses = state.currentCategoria ? state.expenses.filter((item) => item.categoria === state.currentCategoria) : state.expenses
    const isEmpty = useMemo(() => filteredExpeses.length === 0, [filteredExpeses]);
    
  return (
    <div className="mt-5">
        {isEmpty ? <p className="text-gray-600 text-2xl font-bold text-center">No Hay Gastos</p> : (
            <>
                <p className="text-gray-600 text-2xl font-bold my-5">Listado de Gastos</p>
                {filteredExpeses.map((expense) => (
                    <ExpenseDetail 
                        key={expense.id}
                        expense={expense}
                    />
                ))}
            </>
        )}
    </div>
  )
}
