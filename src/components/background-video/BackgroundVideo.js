import React from 'react';
import './background-video.css';
import videoBG from './gridvid.mp4';

const BackgroundVideo = ({className}) => {
    const videoSource = videoBG;
    return (
            <video autoPlay="autoPlay" loop="loop" muted className={`${className} background-video`}>
                <source src={videoSource} type="video/mp4"/>
                your browser does not support video tag boi.
            </video>
    )
}

export default BackgroundVideo;