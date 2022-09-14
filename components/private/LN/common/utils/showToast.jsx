import React, { useContext } from 'react';
import { GlobalContext } from '../../../common/context/globalContext';
import get from '../../../common/utils/get';
import Toast from '../../../common/toast/Toast';

const ShowToast = () => {
    const { state, dispatch } = useContext(GlobalContext) || {};
    const { open, typeModal, data } = get(state, 'showModal', {});

    return typeModal === 'toast' && data.status && open ? (
        <Toast
            data={data}
            handleTimeout={() => {
                dispatch({
                    type: 'SHOW_MODAL',
                    payload: {
                        open: false
                    }
                });
            }}
        />
    ) : (
        <></>
    );
};

export default ShowToast;
