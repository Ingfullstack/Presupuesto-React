import { categories } from "../data/categorias";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { ChangeEvent, FormEvent, useState } from "react";
import { DraftExpense, Value } from "../types";
import { useBudget } from "../hooks/useBudget";
import ErrorMessage from "./ErrorMessage";

export default function ExpenseForm() {

  const { dispatch } = useBudget();
  const initialState = {
    amount: 0,
    expenseName: "",
    categoria: "",
    date: new Date(),
  }

  const [expense, setExpense] = useState<DraftExpense>(initialState);

  const [error, setError] = useState('');

  const hanldeChangeDate = (value: Value) => {
    setExpense({
        ...expense,
        date: value
    })
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const isAmountField = ['amount'].includes(e.target.id);

    setExpense({
        ...expense,
        [e.target.id]: isAmountField ? +e.target.value : e.target.value,
    })

  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(expense).includes('') && expense.amount <= 0) {
        setError('Todos los campos son obligatorio');
        return;
    }else{
      dispatch({type: "agregar-expense", payload: {expense}})
      setExpense(initialState);
      setError('');
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-5">
        <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
          Nuevo Gasto
        </legend>

        {error && (<ErrorMessage>{error}</ErrorMessage>)}

        <div className="flex flex-col gap-2">
          <label htmlFor="expenseName" className="text-xl">
            Nombre Gasto:
          </label>
          <input
            type="text"
            id="expenseName"
            placeholder="Añade el Nombre del Gasto"
            className="bg-slate-100 p-2"
            name="expenseName"
            value={expense.expenseName}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="expenseName" className="text-xl">
            Cantidad:
          </label>
          <input
            type="number"
            id="amount"
            placeholder="Añade la Cantidad del Gasto: ej 300"
            className="bg-slate-100 p-2"
            name="amount"
            value={expense.amount}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="categoria" className="text-xl">
            Categoria:
          </label>
          <select
            name="categoria"
            id="categoria"
            className="bg-slate-100 p-2"
            value={expense.categoria}
            onChange={handleChange}
          >
            <option value="">--Seleccione--</option>
            {categories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="expenseName" className="text-xl">
            Fecha Gasto:
          </label>
          <DatePicker
            className="bg-slate-100"
            value={expense.date}
            onChange={hanldeChangeDate}
          />
        </div>

        <input
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 w-full p-2 text-white uppercase font-bold rounded-lg"
          value="Registrar Gasto"
        />
      </form>
    </>
  );
}
