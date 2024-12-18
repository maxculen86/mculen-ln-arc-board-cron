import React from 'react';
import { ToastContainer } from '@ln/common-ui-toast';
import { Toast } from '@ln/contenidos-ui-toast';

function ShowToast(props) {
    const {
        isOpen,
        onClose,
        title,
        buttonLabel,
        description,
        status,
        href,
        timeout,
        closable,
        pauseOnHover
    } = props || {};

    const buttonProps = buttonLabel && {
        href,
        title: buttonLabel,
        label: buttonLabel
    };

    const propsToast = {
        buttonProps,
        title,
        message: description,
        closable,
        pauseOnHover,
        variant: status
    };

    if (!isOpen) return null;

    return (
        <ToastContainer
            newToast={<Toast {...propsToast} />}
            transitionIn={['fade-in-up']}
            hPosition="center"
            vPosition="bottom"
            className="bottom-64 z-100000 bottom-100_md"
            duration={timeout}
            onAnimationEnd={onClose}
            style={{ zIndex: 100000 }}
        />
    );
}

export default ShowToast;
