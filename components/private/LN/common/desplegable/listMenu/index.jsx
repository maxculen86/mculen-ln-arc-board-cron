import React from 'react';
import PropTypes from 'fusion:prop-types';
import ListMenu from './listMenu';
import MenuContext from './store/menuContext';

const ListMenuComponent = ({
    el,
    extraClass,
    name,
    childs,
    onResizeDeskTop
}) => (
    <MenuContext>
        <ListMenu
            el={el}
            extraClass={extraClass}
            name={name}
            childs={childs}
            onResizeDeskTop={onResizeDeskTop}
        />
    </MenuContext>
);

ListMenuComponent.propTypes = {
    el: PropTypes.string.isRequired,
    extraClass: PropTypes.string,
    name: PropTypes.string,
    childs: PropTypes.shape({
        el: PropTypes.string.isRequired,
        extraClass: PropTypes.string
    }),
    onResizeDeskTop: PropTypes.bool.isRequired
};

ListMenuComponent.defaultProps = {
    name: undefined,
    childs: undefined,
    extraClass: undefined
};

export default ListMenuComponent;
