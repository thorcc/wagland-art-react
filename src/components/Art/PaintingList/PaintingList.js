import React from "react";
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

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
    return (
        <Container>
            <Droppable droppableId="1">
                {(provided, snapshot) => (
                    <List
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    isDraggingOver={snapshot.isDraggingOver}
                    >
                        {props.paintings.map(
                            (painting, index) => 
                            <Painting 
                                key={painting.id} 
                                id={painting.id}
                                name={painting.name} 
                                imageUrl={painting.imageUrl} 
                                index={index}
                                handleUpdateName={props.handleUpdateName}
                                >
                            </Painting>)}
                        {provided.placeholder}
                    </List>
                )}
            </Droppable>
        </Container>
        );
  }

export default PaintingList;