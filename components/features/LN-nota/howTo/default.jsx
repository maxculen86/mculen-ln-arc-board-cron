import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '@ln/contenidos-ui-text';
import { Icon } from '@ln/common-ui-icon';
import IconSprite from '../../private-global/common/iconSprite/IconSprite';

function HowTo({ title, number, id, ...r }) {
    if (!number || !title) return null;
    return (
        <div
            id={id}
            className="step-header flex flex-column gap-32 py-16"
            {...r}
        >
            <hr className="w-100" />
            <div className="flex ai-center gap-8">
                <div className="w-40 flex jc-center">
                    <Text
                        font="prumo"
                        className="step-number prumo prumo-semibold text-32 text-40_xl line-height-100"
                        as="span"
                    >
                        {number}
                    </Text>
                </div>
                <Icon className="step-icon" aria-hidden="true">
                    <IconSprite
                        name="stepArrow"
                        width={9}
                        height={34}
                        fill="none"
                    />
                </Icon>
                <Text
                    font="georgia"
                    weight="bold"
                    className="step-title georgia text-22 pl-4"
                    as="h3"
                >
                    {title}
                </Text>
            </div>
        </div>
    );
}

export default HowTo;

HowTo.arcType = 'custom-how-to';
HowTo.propTypes = {
    number: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
};
