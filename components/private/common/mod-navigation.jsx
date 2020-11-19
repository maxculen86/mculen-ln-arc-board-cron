import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'fusion:prop-types';

import ComButton from './com-button';

const ModNavigation = props => {
    const categoryEl = useRef();
    const [showBtnScrollLeft, setShowBtnScrollLeft] = useState('hlp-none');
    const [showBtnScrollRight, setShowBtnScrollRight] = useState('hlp-none');
    const { navigation, classCondition, style } = props;
    const EXTRA_CLASS = classCondition ? ` ${classCondition}` : '';

    const moveScroll = (ref, direction, firstTime = false) => {
        if (ref && ref.current) {
            const cEl = ref.current;
            const left =
                direction === 'right'
                    ? cEl.scrollLeft + 150
                    : cEl.scrollLeft - 150;
            if (!firstTime) {
                cEl.scrollTo({ left, behavior: 'smooth' });
                setShowBtnScrollLeft(left > 0 ? '' : 'hlp-none');
            }
            setShowBtnScrollRight(
                cEl.scrollLeft + cEl.offsetWidth < cEl.scrollWidth
                    ? ''
                    : 'hlp-none'
            );
        } else {
            setShowBtnScrollLeft('hlp-none');
            setShowBtnScrollRight('hlp-none');
        }
    };

    useEffect(() => {
        moveScroll(categoryEl, 'right', true);
    }, []);

    if (!navigation || !navigation.length) return null;

    return (
        <>
            <ComButton
                classCondition={`--left ${showBtnScrollLeft}`}
                iconName="left"
                onMouseDown={() => moveScroll(categoryEl, 'left')}
                style={style}
            />
            {/* // TODO: Preguntar a Daro si va ul u ol */}
            <ul className={`com-unordered${EXTRA_CLASS}`} ref={categoryEl}>
                {navigation.map(({ item, key }) => (
                    <li key={key}>{item}</li>
                ))}
            </ul>
            <ComButton
                classCondition={`${showBtnScrollRight}`}
                iconName="right"
                onMouseDown={() => moveScroll(categoryEl, 'right')}
                style={style}
            />
        </>
    );
};

ModNavigation.propTypes = {
    classCondition: PropTypes.string,
    style: PropTypes.string,
    navigation: PropTypes.arrayOf(PropTypes.func)
};

ModNavigation.defaultProps = {
    classCondition: undefined,
    style: undefined,
    navigation: undefined
};

export default ModNavigation;
