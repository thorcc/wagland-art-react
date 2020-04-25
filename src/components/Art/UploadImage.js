import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

import { withFirebase } from '../Firebase'

const Form = styled.div`
    border: 1px solid lightgrey;
    width: 800px;
    margin: auto;
    margin-top: 75px;
    background-color: 'rgb(235, 236, 240)';
    padding: 1rem;
    display: flex;
    justify-content: space-between;
`;

const Upload = styled.div`
    border: solid 1px;
    position: absolute;
    left: 50%;
    top: 10px;
    transform: translateX(-50%);
    width: 300px;
    padding: 1rem;
    box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
    z-index: 200;
    background-color: white;
`

const Overlay = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    background-color: rgba(0,0,0,0.5);
    width: 100vw;
    height: 100vh;
    z-index: 100;
`;

const UploadImage = props => {   
    const [images, setImages] = useState([]);
    const [error, setError] = useState('');

    
    const [uploading, setUploading] = useState(false);
    const [showUploading, setShowUploading] = useState(false);

    const [paintingsCount, setPaintingsCount] = useState(0);
    const [beforeUploadCount, setBeforeUploadCount] = useState(0)
    const [afterUploadCount, setAfterUploadCount] = useState(0);

    
    const imageInputRef = useRef();


    useEffect(() => {
        const unsubscribe = props.firebase.paintings.onSnapshot(snap => {
            if(snap.data().list){
                setPaintingsCount(snap.data().list.length);
            }
        });  
        return () => unsubscribe();
      },[])

      useEffect(() => {
          if(uploading && paintingsCount >= afterUploadCount){
            setUploading(false);
          }
      }, [paintingsCount])
    
    const handleFileInput = event => {
        setImages(Array.from(event.target.files));
    }

    const handleFileUpload = async event => {
        event.preventDefault();
        if(images.length === 0){
            setError('No files selected');
            return;
        }
        setShowUploading(true);
        setUploading(true);
        setBeforeUploadCount(paintingsCount);
        setAfterUploadCount(images.length + paintingsCount);
        

        for (const img of images){
            if(img === '' ) {
                console.error(`not an image, the image file is a ${typeof(image)}`)
                props.setLoading(false);
            }
            try{
                props.firebase.uploadImage(img, img.name);
            }
            catch(err){
                console.log(err);
            }
        }
        // Reset file-input
        imageInputRef.current.value = '';//Resets the file name of the file input - See #2    }
    }
    return(
        <div>
            <Form>
                <input
                multiple 
                type="file"
                onChange={handleFileInput}
                ref={imageInputRef}
                />
                <button onClick={handleFileUpload}>Upload images</button>
            </Form>
            {showUploading ? 
            <div>
                <Upload>
                    <h3>
                        {uploading? 'Uploading' : 'Upload finished'}
                    </h3>
                    <p>
                        Uploaded: {paintingsCount - beforeUploadCount }/{afterUploadCount - beforeUploadCount} images.
                    </p>
                    {!uploading ? <button onClick={() => setShowUploading(false)}>Close</button> : null}
                    
                </Upload> 
                <Overlay />
            </div>: null}
        </div>
    )
}

export default withFirebase(UploadImage);