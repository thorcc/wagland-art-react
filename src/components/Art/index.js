import React, { useState, useEffect } from 'react';
import { withFirebase } from '../Firebase';
import styled from 'styled-components';
import { DragDropContext, Draggable } from "react-beautiful-dnd";

import Paintings from './Paintings';


const Container = styled.div`
    
`;

    
    



const Art = props => {
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
      }


    return(
        <Container>
            <h3>Art</h3>
            <DragDropContext
                onDragEnd={handleDragEnd}
            >
                <Paintings paintings={paintings} setLoading={setLoading} />
            </DragDropContext>
        </Container>

    )
}

export default withFirebase(Art);