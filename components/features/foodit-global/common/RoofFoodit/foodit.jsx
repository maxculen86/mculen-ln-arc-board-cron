import React from 'react';
import { Icon } from '@ln/common-ui-icon';
import { Text } from '@ln/common-ui-text';
import { Button } from '@ln/foodit-ui-button';
import { Link } from '@ln/foodit-ui-link';

export function RoofFoodit({
    buttonProps = {},
    hide,
    icon = null,
    title = { text: '', as: '' },
    linkProps = { href: '', text: '' },
    carouselMobile = false
}) {
    const { text = '', as = 'h3' } = title;
    if (hide) return null;
    return (
        <div
            style={{ position: carouselMobile && 'static' }}
            className="flex ai-end jc-between gap-24 mb-24_md py-12 py-0_md roof-sticky"
        >
            {linkProps.href ? (
                <Link
                    className="roof-text-sticky ml-16 ml-0_md border border-bottom border-thin border-light-800 text-accent-batata__hover border-accent-lechuga__hover"
                    title={`Ir a ${title.text}`}
                    {...linkProps}
                />
            ) : (
                <Text
                    className="roof-text-sticky pl-16 pl-0_md"
                    text={text}
                    as={as}
                />
            )}

            {buttonProps && (
                <Button
                    {...buttonProps}
                    variant="link"
                    className="ml-auto pr-16 pr-0_md"
                >
                    {icon && (
                        <Icon color="dark" className="w-24 w-20_md">
                            {icon}
                        </Icon>
                    )}
                    {buttonProps.text && (
                        <Text className="text-12 sm-none uppercase">
                            {buttonProps.text}
                        </Text>
                    )}
                </Button>
            )}
        </div>
    );
}

export default RoofFoodit;
