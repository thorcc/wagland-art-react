import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { withFirebase } from '../Firebase';
import Title from './title/title';
import Heading from './heading/heading';
import List from './list/list';
import Paragraph from './paragraph/paragraph';

const Container = styled.div`
    width: 750px;
    margin: auto;
`;
const ItemContainer = styled.div`
    border: 1px solid lightgrey;
`;

const Buttons = styled.div`
    display: flex;
    justify-content: space-between;
    border: solid 1px lightgrey;
    padding: 1rem;
`;

const Bio = props => {

    /*
    [
        {
            type: 'title',
            text: 'Roger Wagland'
        },
        {
            type: 'paragraph',
            text: `Roger Wagland er fødd i Sheffield i England i 1953. I 1978 flytta han til Norge og er no busett på Hareid. Han har også budd i Skottland, Tyskland og Botswana. Møte med ulike menneske og kulturar har vore ei stor inspirasjonskjelde for han. Roger Wagland arbeider med ulike former for kunst; bilete, musikk, video/film, skulptur og installasjon. Han har kunstutdanning frå Voss kunst- og handverkskule og Oslo tegne- og maleskole. Han har hatt fleire separatutstillingar, har delteke på mange kollektivutstillingar og har hatt fleire andre kunstoppdrag. Den første separatutstillinga hadde han i 1996 i Ulstein kunstlag. Same år var han ein av tre utstillarar for dronning Sonja i Ulsteinvik. Han er også kunstnaren av det første rundkøyringsmonumentet i Møre og Romsdal, "Tidskifte", i Hareid sentrum.`
        },
        {
            type: 'heading',
            text: 'Oversikt over utstillingar og kunstoppdrag:'
        },
        {
            type: 'list',
            text: 'Separatutstillingar:',
            list: [
                {
                    point: '1996',
                    text: 'Ulstein kunstlag, Ulsteinvik'
                },
                {
                    point: '1997',
                    text: 'Hareid kunstlag, Hareid'
                },
                {
                    point: '2009',
                    text: 'Galleri Brødrene Vik, Syvde'
                }
            ]
        }
    ]
    */ 

    const [info, setInfo] = useState([]);

    useEffect(() => {
    
        const getBio = async () => {
          const res = await props.firebase.bio.get();
          console.log(res.data().list)
          const data = res.data().list;
          setInfo(data);
        }
    
        getBio();
      },[]);

    useEffect(() => {
        if(info.length > 0){
            props.firebase.bio.update({
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
                type: type,
                text: type
            })
        }
        setInfo(newInfoList);
    }

    const createPoint = (index) => {
        const newList = [ ...info[index].list ];
        newList.push({
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

    const items = info.map((item, index) => {
        switch(item.type){
            case 'title':
                return <Title key={index} handleTextInput={handleTextInput} index={index} text={item.text} />
            case 'heading':
                return <Heading key={index} handleTextInput={handleTextInput} index={index} text={item.text} remove={remove} />
            case 'paragraph':
                return <Paragraph key={index} handleTextInput={handleTextInput} index={index} text={item.text} remove={remove} />
            case 'list':
                return <List 
                    key={index} 
                    index={index} 
                    text={item.text} 
                    list={item.list}
                    handleListPointInput={handleListPointInput} 
                    handleTextInput={handleTextInput} 
                    createPoint={createPoint}
                    remove={remove}
                    />
        }
    })

    return(
        <Container>
            {items.map((item, index) => (
                <ItemContainer>
                    <button onClick={()=> remove(index)}>Remove</button>
                    {item}
                </ItemContainer>
            ))}
            <Buttons>
                <button onClick={() => createNew('title')}>New title</button>
                <button onClick={() => createNew('paragraph')}>New paragraph</button>
                <button onClick={() => createNew('heading')}>New heading</button>
                <button onClick={() => createNew('list')}>New list</button>
            </Buttons>
        </Container>
    )
}

export default withFirebase(Bio);