import React, { useState, useEffect } from "react";
import { withFirebase } from '../Firebase';
import { DragDropContext } from "react-beautiful-dnd";
import PaintingList from './PaintingList/PaintingList.js';
import UploadImage from './UploadImage';


const Art = props => {
  const [loading, setLoading] = useState(false);
  const [paintings, setPaintings] = useState([]);


  useEffect(() => {
    setLoading(true);
    const getPaintings = async () => {
      const res = await props.firebase.paintings.get();
      console.log(res.data().list)
      const data = res.data().list;
      setPaintings(data);
      setLoading(false);
    }

    getPaintings();
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
    props.firebase.paintings.update({
        list: newPaintingList//firebase.firestore.FieldValue.arrayUnion("greater_virginia")
    });
  }

  const handleUpdateName = (newName, i) => {
    const updatedPainting = {
      ...paintings[i],
      name: newName,
    }

    const newPaintingList = [...paintings];
    newPaintingList.splice(i,1,updatedPainting);
    setPaintings(newPaintingList);
    props.firebase.paintings.update({
      list: newPaintingList//firebase.firestore.FieldValue.arrayUnion("greater_virginia")
  });
  }


  return(
      <DragDropContext
        onDragEnd={handleDragEnd}
      >
        
        <PaintingList paintings={paintings} handleUpdateName={handleUpdateName}/>
        <UploadImage setLoading={setLoading} />
      </DragDropContext>
  )
}

export default withFirebase(Art);
