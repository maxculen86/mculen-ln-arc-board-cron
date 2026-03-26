import React from 'react';
import { Button } from '@ln/ds-common-button';
import { Icon } from '@ln/common-ui-icon';
import { cx } from '@ln/ds-cva';
import IconSprite from '../../../../private-global/common/iconSprite/IconSprite';

export function NewsletterActionButton({
    selected,
    onClick,
    labelOn,
    labelOff
}) {
    const classNameButton = cx(
        'py-8 md:py-12 h-[32px] md:h-[40px] rounded-[4px]',
        selected ? 'text-accent-default' : 'bg-primary-default'
    );

    const textClass = selected
        ? 'text-secondary-positive'
        : 'text-accent-foreground';

    return (
        <div>
            <Button
                rounded="custom"
                color="custom"
                className={classNameButton}
                variant={selected ? 'outline' : 'solid'}
                onClick={onClick}
                iconLeft={
                    <Icon size={12}>
                        <IconSprite
                            className={textClass}
                            name={selected ? 'check-box' : 'plus'}
                        />
                    </Icon>
                }
            >
                <p className={textClass}>{selected ? labelOn : labelOff}</p>
            </Button>
        </div>
    );
}
