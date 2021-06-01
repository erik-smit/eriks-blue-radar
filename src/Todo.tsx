import { FormEvent, useContext, useReducer, useState } from 'react';
import { closeOutline } from "ionicons/icons"
import React from 'react';
import { 
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToggle,
  IonToolbar
 } from '@ionic/react';

const initialTodos: ITodo[] = [
  { text: "Learn about React", isCompleted: false },
  { text: "Meet friend for lunch", isCompleted: true },
  { text: "Build really cool todo app", isCompleted: false }
];


const initialTodoState: ITodoState = {
  todos: initialTodos
}

const TodosContext = React.createContext<{
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

interface ITodoState {
  todos: ITodo[],
}

enum ActionType {
  AddTodo,
  ToggleTodoCompleted,
  RemoveTodo,
}

interface AddTodo {
  type: ActionType.AddTodo;
  payload: ITodo;
}

interface ToggleTodoCompleted {
  type: ActionType.ToggleTodoCompleted;
  index: number;
}

interface RemoveTodo {
  type: ActionType.RemoveTodo;
  index: number;
}

type TodoActions = AddTodo | ToggleTodoCompleted | RemoveTodo;

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

const todoRemove = (index: number): RemoveTodo => ({
  type: ActionType.RemoveTodo,
  index: index
})

const todoToggle = (index: number): ToggleTodoCompleted => ({
  type: ActionType.ToggleTodoCompleted,
  index: index
})

const TodoPage: React.FC = () => {
  const { state } = useContext(TodosContext);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Devices</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {state.todos.map((todo, index) => (
            <TodoRowEntry key={index} index={index} />
          ))}
        <IonItemDivider />
        <TodoAddEntry />
        </IonList>
      </IonContent>
    </IonPage>
  );
};

interface ITodo {
  text: string;
  isCompleted: boolean;
}

interface ITodoRowContainerProps {
  index: number;
}

const TodoRowEntry: React.FC<ITodoRowContainerProps> = ({ index }) => {
  const { state, dispatch } = useContext(TodosContext);

  return (
    <IonItem>
      <IonLabel
        style={{ textDecoration: state.todos[index].isCompleted ? "line-through" : "" }}>
        { state.todos[index].text }
      </IonLabel>
      <IonToggle
        checked={ state.todos[index].isCompleted }
        onIonChange= { () => dispatch(todoToggle(index)) } />
      <IonButton
        onClick = { () => dispatch(todoRemove(index)) }>
        <IonIcon icon={closeOutline} />
      </IonButton>
    </IonItem>
  )
}


const TodoAddEntry: React.FC = () => {
  const { dispatch } = useContext(TodosContext);
  const [text, setText] = useState<string>();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(todoAdd({
      text: text!,
      isCompleted: false,
    }))
    setText('');

  }
  return (
    <form onSubmit={ e => handleSubmit(e) }>
      <IonItem>
        <IonInput value={text} placeholder="Enter Input" onIonChange={ e => setText(e.detail.value!) } />
      </IonItem>
    </form>
  )
}

export { TodosContext, TodosContextProvider, TodoPage }