/* eslint-disable no-restricted-globals */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { GlobalContext } from '../../../common/context/globalContext';
import Barrier from '../../../common/barrier/Barrier';
import get from '../../../common/utils/get';

const ShowBarrier = ({ token }) => {
    const { state, dispatch } = useContext(GlobalContext) || {};
    const { typeAlert, open, typeModal } = get(state, 'showModal', {});

    return typeModal === 'barrier' && open ? (
        <Barrier
            type={typeAlert}
            handleBarrier={() => {
                dispatch({
                    type: 'SHOW_MODAL',
                    payload: {
                        open: false
                    }
                });
            }}
            isLogged={!!token}
            redirectCallback={
                typeof window !== 'undefined' ? window.btoa(location.href) : ''
            }
        />
    ) : (
        <></>
    );
};

ShowBarrier.propTypes = {
    token: PropTypes.string.isRequired
};

export default ShowBarrier;
