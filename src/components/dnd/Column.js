import React from "react";
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

import Painting from './Painting';


const Container = styled.div`
    border: 1px solid lightgrey;
    border-radius: 2px;
    width: 300px;
    margin: auto;
    margin-top: 75px;
    background-color: 'rgb(235, 236, 240)';
`;
const Title = styled.h3`
    padding: 8px;
`;
const PaintingList = styled.div`
    padding: 8px;
    transition: background-color 0.2s ease;
    background-color: ${props => props.isDraggingOver ? 'rgb(255,235,230)' : 'white'}
`;

const Column = props => {
    return (
        <Container>
            <Title>Art</Title>
            <Droppable droppableId="1">
                {(provided, snapshot) => (
                    <PaintingList
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    isDraggingOver={snapshot.isDraggingOver}
                    >
                        {props.paintings.map((painting, index) => <Painting key={painting.name} name={painting.name} imageUrl={painting.imageUrl} index={index}></Painting>)}
                        {provided.placeholder}
                    </PaintingList>
                )}
            </Droppable>
        </Container>
        );
  }

export default Column;