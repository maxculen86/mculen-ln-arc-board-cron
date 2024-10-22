import React, { useContext } from 'react';
import { ToastContainer } from '@ln/common-ui-toast';
import { Toast } from '@ln/contenidos-ui-toast';
import { GlobalContext } from '../context/globalContext';
import get from '../utils/get';

function ShowToast() {
    const { state, dispatch } = useContext(GlobalContext) || {};
    const { open, typeModal, data } = get(state, 'showModal', {});

    const {
        title,
        buttonLabel,
        description,
        status,
        href,
        timeout,
        closable,
        pauseOnHover
    } = data || {};

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

    return typeModal === 'toast' && status && open ? (
        <ToastContainer
            newToast={<Toast {...propsToast} />}
            transitionIn={['fade-in-up']}
            hPosition="center"
            vPosition="bottom"
            className="bottom-64 z-100000 bottom-100_md"
            duration={timeout}
            onAnimationEnd={() => {
                dispatch({ type: 'SHOW_MODAL', payload: { open: false } });
            }}
            style={{ zIndex: 100000 }}
        />
    ) : null;
}

export default ShowToast;
