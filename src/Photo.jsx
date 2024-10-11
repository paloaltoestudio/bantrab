import { useState, useRef, useCallback } from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import Webcam from "react-webcam";

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };

export default function Photo() {
    const [isCamera, setIsCamera] = useState(true)
    const [dataPhoto, setDataPhoto] = useState()

    const webcamRef = useRef(null);
    const capture = useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            setDataPhoto(imageSrc)
            setIsCamera(false)
            console.log(imageSrc)
        },
        [webcamRef]
    );

    
    
    function handleTakePhoto (dataUri) {
        console.log('takePhoto', dataUri);
        setDataPhoto(dataUri)
        setIsCamera(false)
    }


    return (
        <div className="wrapper">
            <h2>Toma una foto de tu ID</h2>
            {/* {isCamera && (
                <Camera
                width={1280}
                    onTakePhotoAnimationDone = { (dataUri) => { handleTakePhoto(dataUri); } }
                />
            )} */}

            {isCamera && (
                <div className='foto'>
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                    />
                    <button onClick={capture}>Tomar Foto</button>
                </div>
            )}

            {!isCamera && (
                <>
                    <img src={dataPhoto} alt="" />
                    <a href="#" onClick={() => setIsCamera(true)}>Tomar otra foto</a>
                </>
            )}

            
        </div>
    )

}