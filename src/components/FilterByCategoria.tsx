import { ChangeEvent } from "react";
import { categories } from "../data/categorias";
import { useBudget } from "../hooks/useBudget";

export default function FilterByCategoria() {

  const { dispatch } = useBudget();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({type: "add-filter-categoria", payload: {id: e.target.value}});
  }

  return (
    <div className="bg-white shadow-lg md:rounded-lg p-5">
      <form>
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <label htmlFor="categoria">Filtrar Gastos</label>
          <select
            name="categoria"
            id="categoria"
            className="border bg-slate-100 w-full rounded p-2 flex-1"
            onChange={handleChange}
          >
            <option value="">--Todas las Categorias--</option>
            {categories.map((item) => (
              <option value={item.id} key={item.id}>{item.name}</option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
}
