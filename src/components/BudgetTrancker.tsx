import AmountDisplay from "./AmountDisplay";

export default function BudgetTrancker() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex justify-center">
          <img src="/grafico.jpg" alt="grafico" />
        </div>

        <div className="flex flex-col justify-center items-center gap-8">
          <button className="bg-pink-600 hover:bg-pink-700 transition duration-300 ease-in-out w-full p-2 rounded-lg text-white uppercase font-bold">
            Resetear App
          </button>

          <AmountDisplay label="Presupuesto" amount={300} />

          <AmountDisplay label="Disponible" amount={200} />

          <AmountDisplay label="Gastado" amount={100} />
        </div>
      </div>
    </>
  );
}
