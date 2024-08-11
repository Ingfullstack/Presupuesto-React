import { useEffect, useMemo } from "react";
import { useBudget } from "./hooks/useBudget";
import BudgetForm from "./components/BudgetForm";
import BudgetTrancker from "./components/BudgetTrancker";
import ExpenseModal from "./components/ExpenselModal";
import ExpenseList from "./components/ExpenseList";

function App() { 

  const { state } = useBudget();

  useEffect(() => {
    localStorage.setItem('budget',state.budget.toString())
    localStorage.setItem('expense',JSON.stringify(state.expenses));
  },[state.expenses])

  const isValidBudget = useMemo(() => state.budget > 0, [state.budget]);

  return (
    <>
      <header className="bg-blue-600 py-8 max-h-72">
        <h1 className="text-4xl font-black text-white text-center uppercase">
          Planificador de gastos
        </h1>
      </header>

      <section className="mx-2">
        <div className="max-w-3xl bg-white shadow-lg mx-auto mt-10 p-10 rounded-lg">
          {isValidBudget ? <BudgetTrancker/> : <BudgetForm/>}
        </div>
      </section>

      {isValidBudget && (
        <main className="max-w-3xl mx-auto py-10">
          <ExpenseList/>
          <ExpenseModal/>
        </main>
      )}
    </>
  );
}

export default App;
