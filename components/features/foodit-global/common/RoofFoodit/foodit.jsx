import React from 'react';
import { Icon } from '@ln/common-ui-icon';
import { Text } from '@ln/common-ui-text';
import { Button } from '@ln/foodit-ui-button';
import { Link } from '@ln/foodit-ui-link';

export const RoofFoodit = ({
    buttonProps,
    hide,
    icon,
    title = {},
    linkProps = {}
}) => {
    const { text = '', as = 'h3' } = title;
    if (hide) return <></>;
    return (
        <div className="flex ai-end jc-between gap-24 mb-24">
            {linkProps.href ? (
                <Link
                    className="prumo prumo-light text-24 text-32_md text-36_lg border border-bottom border-thin border-light-800 text-accent-batata__hover border-accent-lechuga__hover"
                    title={`Ir a ${title.text}`}
                    {...linkProps}
                />
            ) : (
                <Text
                    className="prumo prumo-light text-24 text-32_md text-36_lg"
                    text={text}
                    as={as}
                />
            )}

            {buttonProps && (
                <Button {...buttonProps} variant="link" className="ml-auto">
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
};

export default RoofFoodit;
