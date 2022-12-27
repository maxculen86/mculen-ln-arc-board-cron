/* eslint-disable no-restricted-globals */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { GlobalContext } from '../context/globalContext';
import Barrier from './Barrier';
import get from '../utils/get';

const ShowBarrier = ({ token }) => {
    const { state, dispatch } = useContext(GlobalContext) || {};
    const { typeAlert, open, typeModal } = get(state, 'showModal', {});
    const typeOfWindow =
        typeof window !== 'undefined' ? window.btoa(location.href) : '';

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
            redirectCallback={typeOfWindow}
        />
    ) : (
        <></>
    );
};

ShowBarrier.propTypes = {
    token: PropTypes.string.isRequired
};

export default ShowBarrier;
