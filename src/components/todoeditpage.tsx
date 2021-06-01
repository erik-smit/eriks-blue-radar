import { FormEvent, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useHistory } from "react-router-dom";
import React from 'react';
import { 
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonPage,
  IonTitle,
  IonToolbar
 } from '@ionic/react';

import { TodosContext, todoEditText } from '../data/todo'

const TodoEditPage: React.FC = () => {
  const history = useHistory();
  const params = useParams<{ id: string }>();
  const index = parseInt(params.id, 10);
  const { state, dispatch } = useContext(TodosContext);
  const [text, setText] = useState<string>();

  useEffect(() => {
    const todoText = state.todos[parseInt(params.id,10)].text;
    setText(todoText);
  }, [state.todos, params.id]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(todoEditText(index, text!))
    history.push('/todo')
  }
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Devices</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form onSubmit={ (e) => handleSubmit(e)}>
          <IonItem>
            <IonInput value={text} placeholder="Enter Input" onIonChange={ e => setText(e.detail.value!) } />
          </IonItem>
        </form>
      </IonContent>
    </IonPage>
  );
};

export { TodoEditPage }
