import React from 'react';
import { Icon } from '@ln/common-ui-icon';
import { Text } from '@ln/common-ui-text';
import { Button } from '@ln/foodit-ui-button';
import { VariableBookmark } from '@ln/foodit-ui-variableicons';

export const RoofFoodit = ({
    title = { text: 'Techo titulo', as: 'h3' },
    buttonProps = { text: 'LLevar al recetario' },
    icon = <VariableBookmark filled={false} />,
    hide
}) => {
    return (
        !hide && (
            <div className="flex ai-center jc-between gap-24 mb-24">
                <Text
                    className="prumo prumo-extrabold text-28 text-36_md text-40_lg"
                    {...title}
                />
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
        )
    );
};

export default RoofFoodit;
