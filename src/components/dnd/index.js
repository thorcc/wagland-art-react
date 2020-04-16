import React, { useState, useEffect } from "react";
import initialData from './initial-data.js';
import { withFirebase } from '../Firebase';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Column from './Column';
import UploadImage from './UploadImage';

const App = props => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [paintings, setPaintings] = useState([]);


useEffect(() => {
    setLoading(true);

    const unsubscribe = props.firebase.paintings.onSnapshot(snap => {
        const data = snap.docs.map(doc => {
            console.log(doc.data())
            return { id: doc.id, ...doc.data() }
        });
        setPaintings(data);
        setLoading(false);
    });

    return () => unsubscribe()

},[]);

  const handleDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;
    
    const newPaintingList = [ ...paintings ];
    newPaintingList.splice(source.index, 1);
    newPaintingList.splice(destination.index, 0, paintings[source.index]);

    setPaintings(newPaintingList);
/*
    props.firebase.paintings.update({
        list: newPaintingList//firebase.firestore.FieldValue.arrayUnion("greater_virginia")
    });
    */
  }


  return(
      <DragDropContext
        onDragEnd={handleDragEnd}
      >
        
        <Column paintings={paintings}/>
        <UploadImage setLoading={setLoading} />
      </DragDropContext>
  )
}

export default withFirebase(App);
