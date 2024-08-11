import { Categoria, DraftExpense, Expense } from "../types"
import { v4 as uuidv4 } from 'uuid';

export type BudgetAction = 
  { type: 'agregar-budget', payload: {budget: number} }|
  { type: 'show-modal'} |
  { type: 'close-modal'}|
  { type: 'agregar-expense', payload: {expense: DraftExpense}}|
  { type: 'eliminar-expense', payload: {id: Expense['id']}}|
  { type: 'get-expense-by-id', payload: {id: Expense['id']}}|
  { type: 'update-expense', payload: {expense: Expense}}|
  { type: 'resetar-app'}|
  { type: 'add-filter-categoria', payload: {id: Categoria['id']}}


export type BudgetState = {
    budget: number,
    modal: boolean,
    expenses: Expense[],
    editingId: Expense['id'],
    currentCategoria: Categoria['id']
}

const initialBudget = () => {
    const localStorageBudget = localStorage.getItem('budget');
    return localStorageBudget ? +localStorageBudget : 0
}

const localStorageExpense = () => {
    const localStorageExpense = localStorage.getItem('expense');
    return localStorageExpense ? JSON.parse(localStorageExpense) : [];
}

export const initialState: BudgetState = {
    budget: initialBudget(),
    modal: false,
    expenses: localStorageExpense(),
    editingId: '',
    currentCategoria: ''
}

//Crear Id Unico
const createExpense = (draftExpense: DraftExpense): Expense => {
    return{
        ...draftExpense,
        id: uuidv4()
    }
}

export const budgetReducer = (state:BudgetState = initialState, action: BudgetAction) => {

    if (action.type === 'agregar-budget') {
        return{
            ...state,
            budget: action.payload.budget
        }
    }

    if(action.type === 'show-modal'){
        return{
            ...state,
            modal: true
        }
    }

    if(action.type === 'close-modal'){
        return{
            ...state,
            modal: false,
            editingId: ''
        }
    }

    if(action.type === 'agregar-expense'){

        const expense = createExpense(action.payload.expense)

        return{
            ...state,
            expenses: [...state.expenses, expense ],
            modal: false
        }
    }

    if (action.type === 'eliminar-expense') {
        
        return {
            ...state,
            expenses: state.expenses.filter((item) => item.id !== action.payload.id)
        }
    }

    if (action.type === 'get-expense-by-id') {
        return{
            ...state,
            editingId: action.payload.id,
            modal: true
        }
    }

    if (action.type === 'update-expense') {
        return{
            ...state,
            expenses: state.expenses.map((item) => item.id === action.payload.expense.id ? action.payload.expense : item),
            editingId: '',
            modal: false
        }
    }

    if (action.type === 'resetar-app') {
        return{
            ...state,
            expenses: [],
            budget: 0

        }
    }

    if (action.type === 'add-filter-categoria') {
        return{
            ...state,
            currentCategoria: action.payload.id
        }
    }

    return state
}


