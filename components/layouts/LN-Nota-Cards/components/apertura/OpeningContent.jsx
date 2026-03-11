import React from 'react';
import { Text } from '@ln/contenidos-ui-text';
import CardsBadge from './Badge';

function OpeningContent({ data = {} }) {
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
        <>
            <div>
                <CardsBadge {...badgeProps} />
            </div>
            <div className="max-w-[550px] flex gap-2 flex-col justify-center items-center text-neutral-light-800 md:max-w-[835px] lg:max-w-[963px] lg:min-w-[963px]">
                <div className="text-center">
                    {title && (
                        <Text
                            as="h1"
                            className="prumo prumo-extra prumo-slab text-display-md tracking-tight leading-none"
                        >
                            {title}
                        </Text>
                    )}
                    {secondaryTitle && (
                        <Text
                            as="h2"
                            className="prumo prumo-slab text-display-md max-[360px]:max-w-[325px]"
                        >
                            {secondaryTitle}
                        </Text>
                    )}
                </div>
                {subtitle && (
                    <Text className="prumo text-center text-subheading-lg">
                        {subtitle}
                    </Text>
                )}
            </div>
            <div>
                <div
                    className="block w-80 h-1"
                    style={{ backgroundColor: 'var(--neutral-light-700)' }}
                />
            </div>
        </>
    );
}

export default OpeningContent;
