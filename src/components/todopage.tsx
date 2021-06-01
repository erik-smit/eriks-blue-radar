import { FormEvent, useContext, useState } from 'react';
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

 import { TodosContext, todoAdd, todoToggle, todoRemove } from '../data/todo'

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

export { TodoPage }