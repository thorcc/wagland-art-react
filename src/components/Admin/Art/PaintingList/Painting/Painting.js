import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { withFirebase } from '../../../../Firebase';

const Container = styled.div`
    border: 1px solid lightgrey;
    border-radius: 2px;
    padding: 8px;
    margin-bottom: 8px;
    background-color: ${props => props.isDragging ? 'lightgreen' : 'white'};
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const Image = styled.img`
    width: 100px;
    height: 100px;
    content-fit: cover;
    display: block;
    margin-left: auto;
`;
const Number = styled.div`
    font-size: 1.8rem;
    font-weight: bold;
`;
const NameContainer = styled.div`
    position: relative;
`;
const Label = styled.label`
    position: absolute;
    top: -10px;
    left: 20px;
`;
const NameInp = styled.input`
    font-weight: bold;
    font-size: 1.8rem;
    margin: 1rem;
    width: 100%;
    border-radius: 0.1rem;
`;

const Painting = props => {

    const [inpName, setInpName] = useState(props.name);
    
    useEffect( () => {
        props.handleUpdateName(inpName, props.index);
    },[inpName])

    return (
        <Draggable
            draggableId={props.id} index={props.index}
        >
            {(provided, snapshot) => (
                <Container
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                    {...provided.dragHandleProps}
                    >
                    <Number>{props.index + 1}</Number>
                    <NameContainer>
                        <Label>title</Label>
                        <NameInp type="text" value={inpName} onChange={e => setInpName(e.target.value)} />
                    </NameContainer>
                    <Image src={props.imageUrl} />
                </Container>   
            )}
        </Draggable>
    )
}

export default withFirebase(Painting);