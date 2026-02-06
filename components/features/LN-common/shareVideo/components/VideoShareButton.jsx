import React from 'react';
import { Link } from '@ln/contenidos-ui-link';
import { videoShareButtonClasses } from '../styles';

// TODO cambiar variant por context
function VideoShareButton({ className, children, variant = 'vertical', ...r }) {
    return (
        <Link
            title="Cerrar"
            className={videoShareButtonClasses({ variant, className })}
            {...r}
        >
            {children}
        </Link>
    );
}

export default VideoShareButton;
