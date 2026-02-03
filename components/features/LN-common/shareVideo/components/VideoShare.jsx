import React from 'react';
import { videoShareClasses } from '../styles';

// TODO MICHI: cambiar variant por context
function VideoShare({ className, children, variant }) {
    return (
        <div className={videoShareClasses({ variant, className })}>
            {children}
        </div>
    );
}

export default VideoShare;
