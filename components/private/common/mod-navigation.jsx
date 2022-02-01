/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComButton from './com-button';
import ComLinkList from './com-link-list';

const ModNavigation = props => {
    const { navigation, classCondition = '', style } = props;
    const EXTRA_CLASS = ` ${classCondition}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps

    if (!navigation || !navigation.length) return null;

    return (
        <>
            <ComButton
                id="left-arrow"
                classCondition="--left hlp-none"
                iconName="arrow-left"
                style={style}
            />
            <ComLinkList list={navigation} extraClass={EXTRA_CLASS} />
            <ComButton
                id="right-arrow"
                iconName="arrow-right"
                style={style}
                classCondition="hlp-none"
            />
            <script
                type="text/javascript"
                dangerouslySetInnerHTML={{
                    __html: `
                window.addEventListener('load', () => {
                    const categories = document.querySelector(".com-unordered");
                    const rightArrow = document.querySelector("#right-arrow");
                    const leftArrow = document.querySelector("#left-arrow");
                    if (categories.scrollLeft + categories.offsetWidth < categories.scrollWidth) {
                        rightArrow.classList.remove('hlp-none')
                    }
                    document.querySelector("#right-arrow").addEventListener('click', () => {
                        const scrollPixel = categories.scrollLeft + 150
                        categories.scroll({ left: scrollPixel, behavior: 'smooth' })
                        if (categories.scrollLeft + categories.offsetWidth >= categories.scrollWidth) {
                            rightArrow.classList.add('hlp-none')
                        }
                        leftArrow.classList.remove('hlp-none')
                    })
                    document.querySelector("#left-arrow").addEventListener('click', () => {
                        const scrollPixel = categories.scrollLeft - 150
                        categories.scroll({ left: scrollPixel, behavior: 'smooth' })
                        if (categories.scrollLeft === 0) {
                            leftArrow.classList.add('hlp-none')
                        }
                        rightArrow.classList.remove('hlp-none')
                    })
                })
            `
                }}
            />
        </>
    );
};

ModNavigation.propTypes = {
    classCondition: PropTypes.string,
    style: PropTypes.shape({
        color: PropTypes.string
    }),
    navigation: PropTypes.arrayOf(PropTypes.func)
};

ModNavigation.defaultProps = {
    classCondition: undefined,
    style: undefined,
    navigation: undefined
};

export default ModNavigation;
