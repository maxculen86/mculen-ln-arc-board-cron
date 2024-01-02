import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComButton from './com-button';
import ComLinkList from './com-link-list';
import { useAppContext } from 'fusion:context';

const ModNavigation = props => {
    const { navigation, classCondition = '', style } = props;
    const EXTRA_CLASS = ` ${classCondition}`;
    const { contextPath, deployment } = useAppContext();

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
                id="mod-navigation"
                type="text/javascript"
                src={deployment(
                    `${contextPath}/resources/js/LN/scriptModNavigation.min.js`
                )}
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
