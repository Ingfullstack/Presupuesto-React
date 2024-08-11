import { useMemo } from "react";
import { formatDate } from "../helpers";
import { Expense } from "../types";
import AmountDisplay from "./AmountDisplay";
import { categories } from "../data/categorias";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import { useBudget } from "../hooks/useBudget";

type ExpenseDetailProsp = {
  expense: Expense;
};

export default function ExpenseDetail({ expense }: ExpenseDetailProsp) {
  
  const { dispatch } = useBudget();


  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => dispatch({type: "get-expense-by-id", payload: {id: expense.id}})}>
        Actualizar
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        destructive={true}
        onClick={() => dispatch({type: "eliminar-expense", payload:{id: expense.id}})}
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );

  const categoriaInfo = useMemo(
    () => categories.find((cat) => cat.id === expense.categoria),
    [expense]
  );
  return (
    <SwipeableList>
      <SwipeableListItem
        maxSwipe={1}
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="bg-white shadow-lg p-10 w-full border-b border-gray-200 rounded-lg flex items-center gap-5 mb-3">
          <div className="">
            <div className="">
              <img
                src={`/icono_${categoriaInfo?.icon}.svg`}
                alt="icono gasto"
                className="w-20"
              />
            </div>
          </div>
          <div className="flex-1 space-y-2">
            <p className="text-sm font-bold uppercase text-slate-500">
              {categoriaInfo!.name}
            </p>
            <p>{expense.expenseName}</p>
            <p className="text-slate-600 text-sm">
              {formatDate(expense.date!.toString())}
            </p>
          </div>
          <AmountDisplay amount={expense.amount} />
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
}
