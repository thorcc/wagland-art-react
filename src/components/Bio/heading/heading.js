import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    margin: 1rem;
    background-color: white;
`;

const HeadingInp = styled.input`
    font-size: 1.4rem;
    font-weight: bold;
    width: 100%;
    border: none;
`;

const Heading = props => {
    return(
        <Container>
            <HeadingInp onChange={event => props.handleTextInput(event.target.value, props.index)} value={props.text} type="text" />
        </Container>
    )
}

export default Heading;