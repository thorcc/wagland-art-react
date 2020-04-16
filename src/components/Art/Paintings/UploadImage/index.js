import React, { useRef } from 'react';
import styled from 'styled-components';

import { withFirebase } from '../../../Firebase'

const Form = styled.form`
    background-color: lightgrey;
    display: flex;
    justify-content: space-between;
    height: 100px;
    width: 100%;
    align-items: center;
    margin: 1rem 0;
    padding: 0 1rem;
`;
const Container = styled.div`
    position: relative;
`;
const Label = styled.label`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    font-size: 32px;
    border-radius: 1rem;
    width: 90px;
    height: 90px;
    cursor: pointer;
`;
const Input = styled.input`
    opacity: 0;
    position: absolute;
    width: 0;
    height: 0;
`;

const UploadImage = props => {   
    const imageInputRef = useRef();

    
    const handleUpload = async event => {
        const image = event.target.files[0];
        //setImageAsFile(imageFile => (image));

        console.log('start of upload');
        props.setLoading(true);
        if(image === '' ) {
            console.error(`not an image, the image file is a ${typeof(image)}`)
            props.setLoading(false);
        }
        const uploadTask = await props.firebase.uploadImage(image, image.name);
        console.log(uploadTask);
        
        // Reset file-input
        imageInputRef.current.value = '';//Resets the file name of the file input - See #2
    }

    return(
        <div>
            <Form>
                <h4>New image</h4>
                <Container>
                    <Label>
                        +
                        <Input 
                        type="file"
                        onChange={handleUpload}
                        ref={imageInputRef}
                        />
                    </Label>  
                </Container>
            </Form>
        </div>
    )
}

export default withFirebase(UploadImage);