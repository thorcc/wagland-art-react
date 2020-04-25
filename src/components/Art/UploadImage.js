import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

import { withFirebase } from '../Firebase'


const Upload = styled.div`
    border: solid 1px;
    position: absolute;
    left: 50%;
    top: 10px;
    transform: translateX(-50%);
    width: 300px;
    padding: 1rem;
`

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
            <form>
                <h4>New image</h4>
                    <input
                    multiple 
                    type="file"
                    onChange={handleFileInput}
                    ref={imageInputRef}
                    />
                <button onClick={handleFileUpload}>Upload images</button>
            </form>
            {showUploading ? <Upload>
                <p>
                    Upload {uploading? 'started' : 'finished'}
                </p>
                <p>
                    Resized: {paintingsCount - beforeUploadCount }/{afterUploadCount - beforeUploadCount}
                </p>
            </Upload> : null}
        </div>
    )
}

export default withFirebase(UploadImage);