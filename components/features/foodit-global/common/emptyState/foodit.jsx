import React from 'react';
import { Text } from '@ln/common-ui-text';
import { Button } from '@ln/foodit-ui-button';
import { Image } from '@ln/foodit-ui-image';

const EmptyState = ({ title, description, buttonProps, imageProps }) => {
    return (
        <section className="flex flex-column ai-center gap-32 px-16 px-24_md px-32_lg">
            {imageProps?.src && <Image {...imageProps} />}
            {(title || description) && (
                <div className="flex flex-column ai-center gap-8 text-center">
                    {title && (
                        <Text className="prumo prumo-semibold text-24 text-28_md text-32_lg">
                            {title}
                        </Text>
                    )}
                    {description && (
                        <Text className="text-16 text-light-600">
                            {description}
                        </Text>
                    )}
                </div>
            )}
            {buttonProps && <Button {...buttonProps} />}
        </section>
    );
};

export default EmptyState;
