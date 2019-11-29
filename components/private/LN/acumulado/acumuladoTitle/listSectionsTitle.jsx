import React, { useRef, useState } from 'react';
import PropTypes from 'fusion:prop-types';

const ItemSubSection = ({ id, navTitle, website }) => (
    <li key={id}>
        <a href={`${id}?_website=${website}`} title={navTitle}>
            {navTitle}
        </a>
    </li>
);

ItemSubSection.propTypes = {
    id: PropTypes.string.isRequired,
    navTitle: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired
};

/**
 * TODO: Hacer de este componente un componente reutilizable de lista horizontal
 * @param {*} param
 */
const ListSectionsTitle = ({ _children, isPrimarySection }) => {
    const [showBtnScrollLeft, setShowBtnScrollLeft] = useState(' hlp-none');
    const [showBtnScrollRight, setShowBtnScrollRight] = useState('');
    const categoryEl = useRef(null);

    const moveScroll = direction => {
        const cEl = categoryEl.current;
        const left =
            direction === 'right' ? cEl.scrollLeft + 100 : cEl.scrollLeft - 100;

        cEl.scrollTo({ left, behavior: 'smooth' });
        setShowBtnScrollLeft(left > 0 ? '' : ' hlp-none');
        setShowBtnScrollRight(
            cEl.scrollLeft + cEl.offsetWidth === cEl.scrollWidth
                ? ' hlp-none'
                : ''
        );
    };

    return _children && isPrimarySection ? (
        <>
            <button
                type="button"
                className={`arrow left-paddle${showBtnScrollLeft}`}
                onMouseDown={() => moveScroll('left')}
            >
                <i className="icon-left" />
            </button>
            <ol className="com-category" ref={categoryEl}>
                {_children.map(({ _id, navigation, _website, name }) => (
                    <ItemSubSection
                        key={_id}
                        id={_id}
                        navTitle={
                            navigation && navigation.nav_title
                                ? navigation.nav_title
                                : name
                        }
                        website={_website}
                    />
                ))}
            </ol>
            <button
                type="button"
                className={`arrow right-paddle${showBtnScrollRight}`}
                onMouseDown={() => moveScroll('right')}
            >
                <i className="icon-right" />
            </button>
        </>
    ) : null;
};

ListSectionsTitle.propTypes = {
    _children: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string,
            _website: PropTypes.string
        })
    ),
    isPrimarySection: PropTypes.bool
};

ListSectionsTitle.defaultProps = {
    _children: undefined,
    isPrimarySection: false
};

export default ListSectionsTitle;
