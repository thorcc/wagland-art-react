import React from 'react';
import styled from 'styled-components';
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
    background-color: lightgrey;
    display: flex;
    justify-content: space-between;
    height: 100px;
    width: 100%;
    align-items: center;
    margin: 1rem 0;
    padding: 0 1rem;
`;

const GridImg = styled.img`
    height: 90px;
`;

const Painting = props => {
    return(
        <Draggable
        draggableId={props.task.id} index={props.index}
        >
            <Container>
                <h4>{props.painting.name}</h4>
                <GridImg src={props.painting.imageUrl} />
            </Container>
        </Draggable>
    )
}

export default Painting;