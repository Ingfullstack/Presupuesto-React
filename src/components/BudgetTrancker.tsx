import { useBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";
import { CircularProgressbar, buildStyles  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function BudgetTrancker() {

  const { state, totales, totalExpense, dispatch } = useBudget();
  const percentage = +((totalExpense / state.budget) * 100).toFixed(2);
  
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex justify-center">
          <CircularProgressbar
                      value={percentage}
                      styles={buildStyles({
                        pathColor: percentage === 100 ? '#DC2626' : '#3B82F6',
                        trailColor: '#F5F5F5',
                        textSize: 8,
                        textColor: percentage === 100 ? '#DC2626' : '#3B82F6'
                      })}
                      text={`${percentage}% Gastado`}
          />
        </div>

        <div className="flex flex-col justify-center items-center gap-8">
          <button onClick={() => dispatch({type: "resetar-app"})} className="bg-pink-600 hover:bg-pink-700 transition duration-300 ease-in-out w-full p-2 rounded-lg text-white uppercase font-bold">
            Resetear App
          </button>

          <AmountDisplay label="Presupuesto" amount={state.budget} />

          <AmountDisplay label="Disponible" amount={totales} />

          <AmountDisplay label="Gastado" amount={totalExpense} />
        </div>
      </div>
    </>
  );
}
