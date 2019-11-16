import React, { useRef, useState, useEffect, useContext } from 'react';
import PropTypes from 'fusion:prop-types';
import { Store } from './store/listMenuContext';

const addItemDisabled = _extraClass =>
    _extraClass && _extraClass.search('item--') !== -1 ? ' item--disabled' : '';

const getClasses = el => extraClass =>
    el === 'li' ? `item__nav ${extraClass || ''}` : `${extraClass}`;

const toggleItem = itemActive =>
    itemActive === ' item--disabled' ? ' item--active' : ' item--disabled';

const showMenu = dispatch => elRef => {
    dispatch({ type: 'OFF_MENUS', elRef });
};

const getChilds = childs =>
    childs &&
    childs.map(({ el, extraClass, name, childs: _childs }) => {
        return (
            <ListMenu
                el={el}
                extraClass={extraClass}
                name={name}
                childs={_childs}
            />
        );
    });

const ListMenu = ({ el, extraClass, name, childs }) => {
    const { state, dispatch } = useContext(Store);
    const ts = new Date().getTime();
    const elRef = useRef();
    const [itemActive, setItemActive] = useState(addItemDisabled(extraClass));
    const classes = getClasses(el)(extraClass);

    useEffect(() => {
        if (state.itemDisabled) {
            setItemActive(addItemDisabled(extraClass));
            elRef === state.elRef && setItemActive(toggleItem(itemActive));
            dispatch({ type: 'DONE_OFF_MENUS' });
        }
    }, [dispatch, extraClass, itemActive, state.elRef, state.itemDisabled]);

    return el === 'ul' ? (
        <ul ref={elRef} className={`${classes || ''}`}>
            {getChilds(childs)}
        </ul>
    ) : (
        <li key={ts} ref={elRef} className={`${classes || ''}${itemActive}`}>
            {name && (
                <a href="" className="link__item">
                    {name}
                </a>
            )}
            {el === 'li' && extraClass && (
                <button
                    type="button"
                    className="button__item"
                    onClick={() => showMenu(dispatch)(elRef)}
                >
                    <i className="icon-down" />
                </button>
            )}
            {getChilds(childs)}
        </li>
    );
};

ListMenu.propTypes = {
    el: PropTypes.string.isRequired,
    extraClass: PropTypes.string,
    name: PropTypes.string,
    childs: PropTypes.shape({
        el: PropTypes.string.isRequired,
        extraClass: PropTypes.string
    })
};

ListMenu.defaultProps = {
    name: undefined,
    childs: undefined,
    extraClass: undefined
};

export default ListMenu;
