import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    margin: 1rem;
    `;
    
const Textarea = styled.textarea`
    width: 100%;
    border: none;
`

const Paragraph = props => {
    const [scrollHeight, setScrollHeight] = useState(0);

    const resize = event => {
        event.target.style.height = "auto";
        event.target.style.height = event.target.scrollHeight + "px";
    }

    return(
        <Container>
            <Textarea 
            onChange={event => props.handleTextInput(event.target.value, props.index)}  
            value={props.text} 
            onInput={resize}
            onClick={resize}
            />
        </Container>
    )
}

export default Paragraph;