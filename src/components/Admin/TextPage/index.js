import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from 'uuid';

import Title from './title/title';
import Heading from './heading/heading';
import List from './list/list';
import Paragraph from './paragraph/paragraph';

const Container = styled.div`
    width: 750px;
    margin: 2rem auto;
`;
const ItemContainer = styled.div`
    border: 1px solid lightgrey;
`;

const Buttons = styled.div`
    display: flex;
    padding: 1rem 0;
`;

const ItemButtons = styled.div`
    display: flex;
`;

const Button = styled.button`
    cursor: pointer;
`;



const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
};

const TextPage = props => {

    const [info, setInfo] = useState([]);

    useEffect(() => {
    
        const getBio = async () => {
          const res = await props.firebase.get();
          const data = res.data()?.list ? res.data().list : [];
          setInfo(data);
        }
    
        getBio();
      },[]);

    useEffect(() => {
        if(info.length > 0){
            props.firebase.update({
                list: info
              });
        }
    },[info])


    const updateInfo = (updatedInfo, i) => {
        const newInfoList = [...info];
        newInfoList.splice(i,1,updatedInfo);
        setInfo(newInfoList);

    }

    const handleTextInput = (newText, i) => {
        const updatedInfo = {
          ...info[i],
          text: newText,
        }
    
        updateInfo(updatedInfo, i);

    }

    const handleListPointInput = (type, newText, infoIndex, pointIndex) => {
        const updatedListPoint = {
            ...info[infoIndex].list[pointIndex],
            [type]: newText
        }

        const newList = [ ...info[infoIndex].list ];
        newList.splice(pointIndex, 1, updatedListPoint);

        const updatedInfo = {
            ...info[infoIndex],
            list: newList,
          }

        updateInfo(updatedInfo, infoIndex);
    }

    const createNew = (type) =>{
        const newInfoList = [...info];
        if(type === 'list'){
            newInfoList.push({
                id: uuidv4(),
                type: type,
                text: type,
                list: [{
                    point: 2000,
                    text: "listpoint"
                }]
            })
        }
        else{
            newInfoList.push({
                id: uuidv4(),
                type: type,
                text: type
            })
        }
        setInfo(newInfoList);
    }

    const createPoint = (index) => {
        const newList = [ ...info[index].list ];
        newList.push({
            id: uuidv4(),
            point: 2000,
            text: "listpoint"
        });

        const updatedInfo = {
            ...info[index],
            list: newList,
        }
        
        updateInfo(updatedInfo, index);
    }

    const remove = index => {
        const newList = [ ...info ];
        newList.splice(index,1);
        setInfo(newList);
    }

    const removePoint = (listIndex, pointIndex) => {
        const newList = [ ...info[listIndex].list ];
        newList.splice(pointIndex,1);
        
        const updatedInfo = {
            ...info[listIndex],
            list: newList,
        }

        updateInfo(updatedInfo, listIndex);
    }

    const updateListOrder = (listIndex, sourceIndex, destIndex) => {
        const newItems = reorder(
            info[listIndex].list,
            sourceIndex,
            destIndex
        );

        const updatedInfo = {
            ...info[listIndex],
            list: newItems,
        }

        updateInfo(updatedInfo, listIndex);
    }

    const items = info.map((item, index) => {
        switch(item.type){
            case 'title':
                return <Title id={item.id} key={index} handleTextInput={handleTextInput} index={index} text={item.text} />
            case 'heading':
                return <Heading id={item.id} key={index} handleTextInput={handleTextInput} index={index} text={item.text} remove={remove} />
            case 'paragraph':
                return <Paragraph id={item.id} key={index} handleTextInput={handleTextInput} index={index} text={item.text} remove={remove} />
            case 'list':
                return <List 
                    id={item.id}
                    key={index} 
                    index={index} 
                    text={item.text} 
                    list={item.list}
                    handleListPointInput={handleListPointInput} 
                    handleTextInput={handleTextInput} 
                    createPoint={createPoint}
                    remove={remove}
                    removePoint={removePoint}
                    updateListOrder={updateListOrder}
                    />
        }
    })

    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const newItems = reorder(
            info,
            result.source.index,
            result.destination.index
        );
        setInfo(newItems);
    }

    const DragHandle = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20 9H4v2h16V9zM4 15h16v-2H4v2z"/></svg>
    const DeleteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"/></svg>

    return(
        <Container>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {items.map((item, index) => {
                                console.log(item.props)
                                return(
                                <Draggable key={item.props.id} draggableId={item.props.id} index={index}>
                                {(provided, snapshot) => (
                                    <ItemContainer
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                    >
                                        <ItemButtons>
                                            <div {...provided.dragHandleProps}>
                                                <Button>
                                                    <DragHandle />
                                                </Button>
                                            </div>
                                            <Button onClick={()=> remove(index)}>
                                                <DeleteIcon />
                                            </Button>
                                        </ItemButtons>
                                        {item}
                                    </ItemContainer>
                                )}
                                </Draggable>
                            )})}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <Buttons>
                <button onClick={() => createNew('title')}>New title</button>
                <button onClick={() => createNew('paragraph')}>New paragraph</button>
                <button onClick={() => createNew('heading')}>New heading</button>
                <button onClick={() => createNew('list')}>New list</button>
            </Buttons>
            </Container>
    )
}

export default TextPage;