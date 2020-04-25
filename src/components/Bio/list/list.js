import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    margin: 1rem;
`;

const TitleInp = styled.input`
    font-size: 1.1rem;
    font-weight: bold;
    width: 100%;
`;

const ItemList = styled.ul`
    list-style-type: none;
`;

const PointInp = styled.input`
    width: 55px;
    margin-right: 1rem;
`;

const TextInp = styled.input`
    width: 400px;
    margin-left: 1rem;
`;

const List = props => {

    return(
        <Container>
            <TitleInp onChange={event => props.handleTextInput(event.target.value, props.index)} type="text" value={props.text}/>
            <ItemList>
                {props.list.map((item, i) => {
                    return (
                        <li key={i}>
                            <PointInp onChange={event => props.handleListPointInput("point", event.target.value, props.index, i)} type="text" value={item.point} />
                            -
                            <TextInp onChange={event => props.handleListPointInput("text", event.target.value, props.index, i)} type="text" value={item.text}/>
                        </li>
                    )
                })}
            </ItemList>
            <button onClick={() => props.createPoint(props.index)}>New listpoint</button>
        </Container>
    )
}

export default List;