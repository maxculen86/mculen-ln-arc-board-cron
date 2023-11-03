import React from 'react';
import { Icon } from '@ln/common-ui-icon';
import { Text } from '@ln/common-ui-text';
import { Button } from '@ln/foodit-ui-button';
import { VariableBookmark } from '@ln/foodit-ui-variableicons';
import { Link } from '@ln/foodit-ui-link';

export const RoofFoodit = ({
    buttonProps = { text: 'LLevar al recetario' },
    hide,
    icon = <VariableBookmark filled={false} />,
    linkProps,
    title = { text: 'Techo titulo', as: 'h3' }
}) => {
    if (hide) return <></>;
    return (
        <div className="flex ai-end jc-between gap-24 mb-24">
            {linkProps ? (
                <Link
                    className="prumo prumo-light text-28 text-36_md text-40_lg border border-bottom border-thin border-light-800 text-accent-batata__hover border-accent-batata__hover"
                    {...linkProps}
                />
            ) : (
                <Text
                    className="prumo prumo-light text-28 text-36_md text-40_lg"
                    {...title}
                />
            )}

            {buttonProps && (
                <Button {...buttonProps} variant="link" className="ml-auto">
                    {icon && (
                        <Icon color="dark" className="w-24 w-16_md">
                            {icon}
                        </Icon>
                    )}
                    {buttonProps.text && (
                        <Text className="text-14 sm-none uppercase">
                            {buttonProps.text}
                        </Text>
                    )}
                </Button>
            )}
        </div>
    );
};

export default RoofFoodit;
