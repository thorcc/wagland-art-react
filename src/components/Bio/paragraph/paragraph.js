import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    margin: 1rem;
    `;
    
const Textarea = styled.textarea`
    width: 100%;
    
`

const Paragraph = props => {
    return(
        <Container>
            <textarea onChange={event => props.handleTextInput(event.target.value, props.index)} cols="80" rows="20" value={props.text} />
        </Container>
    )
}

export default Paragraph;