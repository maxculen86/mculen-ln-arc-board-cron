import React, { useRef, useState, useContext } from 'react';
import PropTypes from 'fusion:prop-types';
import ListMenuContext from './store/ListMenuContext';

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

const ListMenu = props => {
    console.log('TCL: props', props);
    const { el, extraClass, name, childs } = props;

    const ts = new Date().getTime();
    const elRef = useRef();
    const [itemActive, setItemActive] = useState(
        extraClass && extraClass.search('item--') !== -1
            ? ' item--disabled'
            : ''
    );
    const classes =
        el === 'li' ? `item__nav ${extraClass || ''}` : `${extraClass}`;

    const toggleItemMenu = () => {
        setItemActive(
            itemActive === ' item--disabled'
                ? ' item--active'
                : ' item--disabled'
        );
    };

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
                    onClick={toggleItemMenu}
                    onBlur={() => setItemActive(' item--disabled')}
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

const ListMenuComponent = ({ el, extraClass, name, childs }) => (
    <ListMenuContext>
        <ListMenu el={el} extraClass={extraClass} name={name} childs={childs} />
    </ListMenuContext>
);

ListMenuComponent.propTypes = {
    el: PropTypes.string.isRequired,
    extraClass: PropTypes.string,
    name: PropTypes.string,
    childs: PropTypes.shape({
        el: PropTypes.string.isRequired,
        extraClass: PropTypes.string
    })
};

ListMenuComponent.defaultProps = {
    name: undefined,
    childs: undefined,
    extraClass: undefined
};

export default ListMenu;
