import React, { useReducer } from 'react';
import PropTypes from 'fusion:prop-types';

export const Store = React.createContext();

const initialState = {
    itemDisabled: false
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'OFF_MENUS':
            return { ...state, itemDisabled: true };
        default:
            return state;
    }
};

const ListMenuContext = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
    );
};

ListMenuContext.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ]).isRequired
};

export default ListMenuContext;
