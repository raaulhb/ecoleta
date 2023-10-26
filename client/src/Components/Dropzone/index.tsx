import React, {useCallback} from 'react';
import { useDropzone } from 'react-dropzone';
import './styles.css';
import { FiUpload } from 'react-icons/fi';
import { useState } from 'react'

const Dropzone = () => {
    const [selectedFileUrl, setSelectedFileUrl]= useState('');


  const onDrop = useCallback((acceptedFiles: any) => {
    const file = acceptedFiles[0]

    const fileUrl = URL.createObjectURL(file);

    setSelectedFileUrl(fileUrl);
  }, []);

  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
    accept: {
        'image/jpeg': [],
        'image/png': [],
        'image/webp': [],
        'image/heic': [],
        'image/jfif': [],
     },
     
})

  return (
    <div className='dropzone' {...getRootProps()}>
      <input {...getInputProps()} accept='image/*'/>

      { selectedFileUrl
        ? <img src={selectedFileUrl} alt="Point thumbnail"/>    
        : (
            <p>
            <FiUpload/>
            Imagem do estabelecimento
           </p>
          )
      }
    </div>
  )
}

export default Dropzone;