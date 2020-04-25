import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    margin: 1rem;
`;

const TitleInp = styled.input`
    width: 100%;
    font-size: 1.8rem;
    font-weight: bold;
`;

const Title = props => {
    return(
        <Container>
            <TitleInp onChange={event => props.handleTextInput(event.target.value, props.index)} value={props.text} type="text" />
        </Container>
    )
}

export default Title;