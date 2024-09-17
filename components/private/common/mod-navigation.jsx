import React from 'react';
import PropTypes from 'fusion:prop-types';
import { Icon } from '@ln/common-ui-icon';
import { Button } from '@ln/contenidos-ui-button';
import IconSprite from '../../features/private-global/common/iconSprite/IconSprite';
import ComLinkList from './com-link-list';
import { useAppContext } from 'fusion:context';

const ModNavigation = props => {
    const { navigation, classCondition = '', style } = props;
    const EXTRA_CLASS = ` ${classCondition}`;
    const { contextPath, deployment } = useAppContext();

    if (!navigation || !navigation.length) return null;

    return (
        <>
            <Button
                id="left-arrow"
                className="absolute none mb-16 bottom-0 left--16 bg-white"
                variant="custom"
                style={style}
                size="inherit"
                iconOnly
            >
                <Icon>
                    <IconSprite name="arrowLeft" />
                </Icon>
            </Button>
            <ComLinkList list={navigation} extraClass={EXTRA_CLASS} />
            <Button
                id="right-arrow"
                style={style}
                className="absolute none mb-16 bottom-0 right--16 bg-white"
                variant="custom"
                size="inherit"
                iconOnly
            >
                <Icon>
                    <IconSprite name="arrowRight" />
                </Icon>
            </Button>
            <script
                async
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
