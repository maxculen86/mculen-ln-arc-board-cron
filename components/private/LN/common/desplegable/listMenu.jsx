import React, { useRef } from 'react';
import PropTypes from 'fusion:prop-types';

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
    const elRef = useRef();
    const ts = new Date().getTime();
    const classes =
        el === 'li' ? `item__nav ${extraClass || ''}` : `${extraClass}`;
    const itemActive =
        extraClass && extraClass.search('item--') !== -1 ? ' item--active' : '';

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
                <button type="button" className="button__item">
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
