import { createContext, useReducer } from 'react';

interface ITodo {
  text: string;
  isCompleted: boolean;
}

interface ITodoState {
  todos: ITodo[],
}

const initialTodos: ITodo[] = [
  { text: "Learn about React", isCompleted: false },
  { text: "Meet friend for lunch", isCompleted: true },
  { text: "Build really cool todo app", isCompleted: false }
];

const initialTodoState: ITodoState = {
  todos: initialTodos
}

const TodosContext = createContext<{
    state: ITodoState;
    dispatch: React.Dispatch<TodoActions>;
  }>({
    state: initialTodoState,
    dispatch: () => undefined,
  });

const TodosContextProvider: React.FC = ({children}) => {
  const [ state, dispatch ] = useReducer(todosReducer, initialTodoState);

  return (
    <TodosContext.Provider value={ { state, dispatch } }>
      {children}
    </TodosContext.Provider>
  )
}

enum ActionType {
  AddTodo,
  EditTodoText,
  ToggleTodoCompleted,
  RemoveTodo,
}

interface AddTodo {
  type: ActionType.AddTodo;
  payload: ITodo;
}

interface EditTodoText {
  type: ActionType.EditTodoText;
  text: string;
  index: number;
}

interface ToggleTodoCompleted {
  type: ActionType.ToggleTodoCompleted;
  index: number;
}

interface RemoveTodo {
  type: ActionType.RemoveTodo;
  index: number;
}

type TodoActions = AddTodo | EditTodoText | ToggleTodoCompleted | RemoveTodo;

function todosReducer(state: ITodoState, action: TodoActions): ITodoState {
  // return [...todos];
  switch (action.type) {
    case ActionType.AddTodo:
      return { ...state, todos: [...state.todos, action.payload, ]}
    case ActionType.RemoveTodo: {
      if (typeof action.index === 'undefined') {
        // TODO: throw exception?
        return state;
      }
      console.log("remove: " + action.index)
      const newState = { ...state }
      newState.todos.splice(action.index, 1);
      return newState
    }
    case ActionType.EditTodoText: {
      if (typeof action.index === 'undefined') {
        // TODO: throw exception?
        return state;
      }
      // console.log("befState:" + JSON.stringify(state));
      //
      // Jumping through hoops to ensure it doesn't modify the old as a reference
      const newTodo = {...state.todos[action.index]}
      newTodo.text = action.text;
      const newTodos = [...state.todos];
      newTodos[action.index] = newTodo;
      const newState = { ...state }
      newState.todos = newTodos
      // console.log("oldState: " + JSON.stringify(state));
      // console.log("newState: " + JSON.stringify(newState));
      return newState;
    }
    case ActionType.ToggleTodoCompleted: {
      if (typeof action.index === 'undefined') {
        // TODO: throw exception?
        return state;
      }
      // console.log("befState:" + JSON.stringify(state));
      //
      // Jumping through hoops to ensure it doesn't modify the old as a reference
      const newTodo = {...state.todos[action.index]}
      newTodo.isCompleted = !newTodo.isCompleted;
      const newTodos = [...state.todos];
      newTodos[action.index] = newTodo;
      const newState = { ...state }
      newState.todos = newTodos
      // console.log("oldState: " + JSON.stringify(state));
      // console.log("newState: " + JSON.stringify(newState));
      return newState;
    }
    default:
      return state;
  }
}

const todoAdd = (todo: ITodo): AddTodo => ({
  type: ActionType.AddTodo,
  payload: todo
})

const todoEditText = (index: number, text: string): EditTodoText => ({
  type: ActionType.EditTodoText,
  text: text,
  index: index
})

const todoRemove = (index: number): RemoveTodo => ({
  type: ActionType.RemoveTodo,
  index: index
})

const todoToggle = (index: number): ToggleTodoCompleted => ({
  type: ActionType.ToggleTodoCompleted,
  index: index
})

export { TodosContext, TodosContextProvider, todoAdd, todoEditText, todoToggle, todoRemove }