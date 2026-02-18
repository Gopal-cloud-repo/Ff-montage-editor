import React from 'react';

const VideoPreview = ({ videoSrc }) => {
    return (
        <div className="video-preview">
            <video controls>
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default VideoPreview;