import React from 'react';
import styled from 'styled-components';
import { Droppable } from "react-beautiful-dnd";

import Painting from './Painting';
import UploadImage from './UploadImage';

const Container = styled.div`
    width: 600px;
    margin: auto;
    `;

const Paintings = props => {
    return (
        <Droppable droppableId="1">
                    <Container>
                        {props.paintings.map(painting => 
                            <Painting name={painting.name} imageUrl={painting.imageUrl} key={painting.id} />)}
                        {props.loading ? <Painting>Uploading image...</Painting> : null}
                        <UploadImage setLoading={props.setLoading} />
                    </Container>
        </Droppable>
    )
}

export default Paintings;