import React, { useState, useEffect } from "react";
import { withFirebase } from '../Firebase';
import { DragDropContext } from "react-beautiful-dnd";
import styled from 'styled-components';
import PaintingList from './PaintingList/PaintingList.js';
import UploadImage from './UploadImage';

const Container = styled.div``;

const Buttons = styled.div`
  display: flex;
`;
const Button = styled.div`
  margin: 1rem;
  border-bottom: ${props => props.active ? 'solid 1px black' : 'none'}
`;


const Art = props => {
  const [loading, setLoading] = useState(false);

  const [showPaintings, setShowPaintings] = useState(false);
  const [showUpload, setShowUpload] = useState(true);

  return(
    <Container>
      <Buttons>
        <Button 
          active={showPaintings}
          onClick={() => {
            setShowUpload(false);
            setShowPaintings(true);
          }}>
          Paintings
        </Button>
        <Button
          active={showUpload}
          onClick={() => {
            setShowUpload(true);
            setShowPaintings(false);
          }}>
          Upload images
        </Button>
      </Buttons>
      {showUpload ? <UploadImage setLoading={setLoading} /> : null}
      {showPaintings ? <PaintingList/> : null}
    </Container>
  )
}

export default withFirebase(Art);

//