import React from 'react';
import { Icon } from '@ln/common-ui-icon';
import { Text } from '@ln/contenidos-ui-text';
import { cx } from '@ln/cva';
import IconSprite from '../../../../features/private-global/common/iconSprite/IconSprite';
import ComLogo from '../../../../private/common/com-logo';
import { wrapperVariants } from './styles';

function CardsBadge({ badge, badgeText, isSubscriber, logoData }) {
    if (!badge && !logoData) return null;

    const { path, logoName } = logoData || {};

    const isLongText = (badgeText || '').length > 20;

    const sections = [
        logoData && {
            key: 'logo',
            component: (
                <ComLogo
                    logoName={logoName}
                    href={path}
                    classCondition="h-20"
                />
            )
        },
        badgeText && {
            key: 'badgeText',
            component: (
                <Text className="prumo prumo-slab prumo-bold leading-[100%] text-18 uppercase">
                    {badgeText}
                </Text>
            )
        },
        isSubscriber && {
            key: 'subscribers',
            component: (
                <div className="flex ai-center gap-4">
                    <Icon size={16}>
                        <IconSprite name="subscriber" color />
                    </Icon>
                    <Text>Suscriptores</Text>
                </div>
            )
        }
    ].filter(Boolean);

    if (sections.length === 0) return null;

    const layout =
        (sections.length === 2 && isLongText && 'twoLong') ||
        (sections.length === 2 && !isLongText && 'twoShort') ||
        'other';

    const wrapperClass = wrapperVariants({ layout });

    return (
        <div className={wrapperClass}>
            {sections.map((section, index) => {
                const itemClass = cx(
                    sections.length === 2 && index === 0 && 'js-end'
                );
                return (
                    <React.Fragment key={section.key}>
                        <div className={itemClass}>{section.component}</div>
                        {index < sections.length - 1 && !isLongText && (
                            <span className="h-24 w-1 bg-muted inline-block" />
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
}

export default CardsBadge;
