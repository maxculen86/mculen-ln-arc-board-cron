import React from 'react';
import PropTypes from 'fusion:prop-types';
import ListMenu from './listMenu';
import ListMenuContext from './store/listMenuContext';

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

export default ListMenuComponent;
