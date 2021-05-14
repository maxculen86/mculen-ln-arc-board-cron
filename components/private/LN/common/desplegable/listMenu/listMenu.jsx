import React, { useRef, useState, useEffect, useContext } from 'react';
import PropTypes from 'fusion:prop-types';
import { MenuStore } from './store/menuContext';

const disableItem = _extraClass =>
    _extraClass && _extraClass.search('item--') !== -1 ? ' item--disabled' : '';

const getClasses = el => extraClass => hasChildren =>
    el === 'li'
        ? `item__nav${hasChildren} ${extraClass || ''}`
        : `${extraClass || ''}`;

const toggleItem = itemActive =>
    itemActive === ' item--disabled' ? ' item--active' : ' item--disabled';

const showMenu = dispatch => elRef => {
    dispatch({ type: 'OFF_MENUS', elRef });
};

const getChilds = (childs, onResizeDeskTop) =>
    childs &&
    childs.map(({ _id, el, extraClass, name, childs: _childs, url, site }) => {
        return (
            <ListMenu
                _id={_id}
                el={el}
                extraClass={extraClass}
                name={name}
                childs={_childs}
                url={url}
                onResizeDeskTop={onResizeDeskTop}
                site={site}
            />
        );
    });

const ListMenu = ({
    _id,
    el,
    extraClass,
    name,
    childs,
    url,
    site,
    onResizeDeskTop
}) => {
    const siteUrl = site && site.site_url ? site.site_url : undefined;
    const { state, dispatch } = useContext(MenuStore);
    const ts = new Date().getTime();
    const elRef = useRef();
    const [itemActive, setItemActive] = useState(disableItem(extraClass));
    const hasSubNavs = el === 'li' && childs && childs[0].childs.length > 0;
    const classes = getClasses(el)(extraClass)(
        hasSubNavs ? ' has--children' : ''
    );
    const [btnDisabled, setBtnDisabled] = useState(false);

    useEffect(() => {
        if (state.itemDisabled) {
            setItemActive(disableItem(extraClass));
            dispatch({ type: 'DONE_OFF_MENUS' });
            elRef === state.elRef && setItemActive(toggleItem(itemActive));
        }
    }, [dispatch, extraClass, itemActive, state.elRef, state.itemDisabled]);

    useEffect(() => {
        !!onResizeDeskTop && setItemActive(disableItem(extraClass));
        setBtnDisabled(onResizeDeskTop);
    }, [extraClass, onResizeDeskTop]);

    return el === 'ul' ? (
        <ul ref={elRef} className={classes}>
            {getChilds(childs, onResizeDeskTop)}
        </ul>
    ) : (
        <li key={_id || ts} ref={elRef} className={`${classes}${itemActive}`}>
            {name && (
                <a href={siteUrl || url} className="link__item">
                    {name}
                </a>
            )}
            {hasSubNavs && extraClass && (
                <button
                    disabled={btnDisabled}
                    type="button"
                    className="button__item"
                    onClick={() => showMenu(dispatch)(elRef)}
                >
                    <i className="icon-arrow-down" />
                </button>
            )}
            {getChilds(childs, onResizeDeskTop)}
        </li>
    );
};

ListMenu.propTypes = {
    _id: PropTypes.string,
    el: PropTypes.string.isRequired,
    extraClass: PropTypes.string,
    name: PropTypes.string,
    site: PropTypes.shape({
        site_url: PropTypes.string
    }),
    childs: PropTypes.arrayOf(
        PropTypes.arrayOf(
            PropTypes.shape({
                el: PropTypes.string.isRequired,
                extraClass: PropTypes.string
            })
        )
    ),
    url: PropTypes.string,
    onResizeDeskTop: PropTypes.bool
};

ListMenu.defaultProps = {
    _id: undefined,
    name: undefined,
    childs: undefined,
    extraClass: undefined,
    url: undefined,
    site: undefined,
    onResizeDeskTop: undefined
};

export default ListMenu;
