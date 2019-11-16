import React from 'react';
import PropTypes from 'fusion:prop-types';
import ListMenu from './listMenu';
import MenuContext from './store/menuContext';

const ListMenuComponent = ({ el, extraClass, name, childs }) => (
    <MenuContext>
        <ListMenu el={el} extraClass={extraClass} name={name} childs={childs} />
    </MenuContext>
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

export default ListMenuComponent;
