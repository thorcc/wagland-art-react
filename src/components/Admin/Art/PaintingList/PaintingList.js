import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { DragDropContext,Droppable } from 'react-beautiful-dnd';
import { withFirebase } from '../../../Firebase';

import Painting from './Painting/Painting.js';


const Container = styled.div`
    width: 800px;
    margin: auto;
    margin-top: 75px;
    background-color: 'rgb(235, 236, 240)';
`;
const List = styled.div`
    padding: 8px;
    transition: background-color 0.2s ease;
    background-color: ${props => props.isDraggingOver ? 'rgb(255,235,230)' : 'white'}
`;

const PaintingList = props => {
    const [paintings, setPaintings] = useState([]);

    useEffect(() => {
    
        const getPaintings = async () => {
          const res = await props.firebase.paintings.get();
          console.log(res.data().list)
          const data = res.data().list;
          setPaintings(data);
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

    const removeImage = (i, storageDestination) => {
        const newPaintingList = [...paintings];
        newPaintingList.splice(i,1);
        setPaintings(newPaintingList);
        props.firebase.paintings.update({
          list: newPaintingList//firebase.firestore.FieldValue.arrayUnion("greater_virginia")
        });
        console.log(storageDestination);
        props.firebase.removeImage(storageDestination);
    }

    return (

        <DragDropContext
        onDragEnd={handleDragEnd}
      >
      
            <Container>
                <Droppable droppableId="1">
                    {(provided, snapshot) => (
                        <List
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        isDraggingOver={snapshot.isDraggingOver}
                        >
                            {paintings.map(
                                (painting, index) => 
                                <Painting 
                                    key={painting.id} 
                                    id={painting.id}
                                    name={painting.name} 
                                    imageUrl={painting.imageUrl} 
                                    index={index}
                                    handleUpdateName={handleUpdateName}
                                    storageDestination={painting.storageDestination}
                                    removeImage={removeImage}
                                    >
                                </Painting>)}
                            {provided.placeholder}
                        </List>
                    )}
                </Droppable>
            </Container>
        </DragDropContext>
        );
  }

export default withFirebase(PaintingList);