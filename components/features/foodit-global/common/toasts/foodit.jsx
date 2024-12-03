import React from 'react';
import { ToastContainer } from '@ln/common-ui-toast';
import { Toast } from '@ln/foodit-ui-toast';
import useIsomorphicToastHandling from './hooks/useIsomorphicToastHandling';

function Toasts() {
    const { toasts } = useIsomorphicToastHandling({ component: Toast });

    return (
        <ToastContainer
            newToast={toasts}
            transitionIn={['fade-in-right']}
            vPosition="top"
            hPosition="end"
            className="z-15"
        />
    );
}

export default Toasts;
