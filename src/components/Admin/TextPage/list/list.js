import React from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


const Container = styled.div`
    margin: 1rem;
    background-color: white;
`;

const TitleInp = styled.input`
    font-size: 1.1rem;
    font-weight: bold;
    width: 100%;
    border: none;
`;

const ItemList = styled.ul`
    list-style-type: none;
`;

const PointInp = styled.input`
    width: 55px;
    margin-right: 1rem;
    border: none;
`;

const TextInp = styled.input`
    width: 400px;
    margin-left: 1rem;
    border: none;
`;

const ItemButtons = styled.div`
    display: flex;
    margin-right: 1rem;
`;

const Button = styled.button`
    cursor: pointer;
`;

const Li = styled.li`
    display: flex;
`;

const List = props => {

    const DragHandle = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20 9H4v2h16V9zM4 15h16v-2H4v2z"/></svg>
    const DeleteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"/></svg>
    const AddIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>


    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }
        props.updateListOrder(props.index, result.source.index, result.destination.index);
    }

    return(
        <Container>
            <TitleInp onChange={event => props.handleTextInput(event.target.value, props.index)} type="text" value={props.text}/>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId={props.id}>
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            <ItemList>
                                {props.list.map((item, i) => {
                                    return (
                                        <Draggable key={item.id} draggableId={item.id} index={i}>
                                            {(provided, snapshot) => (
                                                <Li 
                                                    key={item.id}
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                >
                                                    <ItemButtons>
                                                        <div {...provided.dragHandleProps}>
                                                            <Button>
                                                                <DragHandle />
                                                            </Button>
                                                        </div>
                                                        <Button onClick={()=> props.removePoint(props.index, i)}>
                                                            <DeleteIcon />
                                                        </Button>
                                                    </ItemButtons>
                                                    <PointInp onChange={event => props.handleListPointInput("point", event.target.value, props.index, i)} type="text" value={item.point} />
                                                    -
                                                    <TextInp onChange={event => props.handleListPointInput("text", event.target.value, props.index, i)} type="text" value={item.text}/>
                                                </Li>
                                            )}
                                        </Draggable>
                                    )
                                })}
                                {provided.placeholder}
                            </ItemList>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <Button onClick={() => props.createPoint(props.index)}>
                <AddIcon />
            </Button>
        </Container>
    )
}

export default List;