import React, { useState, useEffect } from 'react';
import { withFirebase } from '../Firebase';
import styled from 'styled-components';

import UploadImage from './UploadImage';

const Container = styled.div`
    
`;

const Paintings = styled.div`
    width: 600px;
    margin: auto;
    `;
    
    const Painting = styled.div`
    background-color: lightgrey;
    display: flex;
    justify-content: space-between;
    height: 100px;
    width: 100%;
    align-items: center;
    margin: 1rem 0;
    padding: 0 1rem;
`;

const GridImg = styled.img`
    height: 90px;
`;

const Art = props => {
    const [loading, setLoading] = useState(false);
    const [paintings, setPaintings] = useState([]);


    useEffect(() => {
        setLoading(true);

        const unsubscribe = props.firebase.paintings.onSnapshot(snap => {
            const data = snap.docs.map(doc => {
                console.log(doc.data())
                return { id: doc.id, ...doc.data() }
            });
            setPaintings(data);
            setLoading(false);
        });

        return () => unsubscribe()

    },[]);


    return(
        <Container>
            <h3>Art</h3>
            <Paintings>
            {paintings.map(painting => 
                <Painting key={painting.id}>
                    <h4>{painting.name}</h4>
                    <GridImg src={painting.imageUrl} />
                </Painting>)}
            {loading ? <Painting>Uploading image...</Painting> : null}
            <UploadImage setLoading={setLoading} />
            </Paintings>
        </Container>

    )
}

export default withFirebase(Art);