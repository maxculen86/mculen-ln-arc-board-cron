import React from 'react';
import { Icon } from '@ln/common-ui-icon';
import { Button } from '@ln/contenidos-ui-button';
import { useAppContext } from 'fusion:context';
import IconSprite from '../../features/private-global/common/iconSprite/IconSprite';
import ComLinkList from './com-link-list';

function ModNavigation({ navigation, classCondition = '', style }) {
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
}

export default ModNavigation;
