import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '@ln/contenidos-ui-text';
import CardsBadge from './Badge';

function OpeningContent({ data }) {
    const { title, secondaryTitle, subtitle, label, logoData, isSubscriber } =
        data || {};

    const badge = label?.chapita || null;
    const { text: badgeText } = badge || '';

    const badgeProps = {
        badge,
        badgeText,
        isSubscriber,
        logoData
    };

    return (
        <div className="flex flex-column ai-center max-w-597_m mr-auto_m ml-auto_m max-w-100_l">
            <CardsBadge {...badgeProps} />
            <div className="text-center text-neutral-light-800">
                {title && (
                    <Text
                        as="h1"
                        className="prumo prumo-extra prumo-slab text-40 tracking--232 text-52_md text-68_lg"
                    >
                        {title}
                    </Text>
                )}

                {secondaryTitle && (
                    <Text
                        as="h2"
                        className="prumo prumo-light prumo-slab text-40 tracking--232 text-52_md text-68_lg"
                    >
                        {secondaryTitle}
                    </Text>
                )}
            </div>
            {subtitle && (
                <Text
                    className="prumo text-20 text-center mt-8 mb-20 prumo-book text-24_md text-28_lg max-w-890_lg"
                    style={{ letterSpacing: '-0.64px', lineHeight: '125%' }}
                >
                    {subtitle}
                </Text>
            )}
            <div className="divider w-120 border border-neutral-light-700" />
        </div>
    );
}

OpeningContent.propTypes = {
    data: PropTypes.shape({})
};

OpeningContent.defaultProps = {
    data: {}
};

export default OpeningContent;
