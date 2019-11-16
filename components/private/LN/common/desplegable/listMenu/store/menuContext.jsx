import React, { useReducer } from 'react';
import PropTypes from 'fusion:prop-types';

/**
 * Se construye el Store que se usara y se exportara
 * para este contexto
 */
export const MenuStore = React.createContext();

/**
 *  Se inicializa el estado y se crea la funcion reducer
 */

const initialState = {
    itemDisabled: false,
    elRef: null
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'OFF_MENUS':
            return { ...state, itemDisabled: true, elRef: action.elRef };
        case 'DONE_OFF_MENUS':
            return initialState;
        default:
            return state;
    }
};

/**
 * Se crea component proveedor en base al cual se manejara
 * estados comunes
 * @param {children} node
 */

const MenuContext = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <MenuStore.Provider value={{ state, dispatch }}>
            {children}
        </MenuStore.Provider>
    );
};

MenuContext.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ]).isRequired
};

export default MenuContext;
