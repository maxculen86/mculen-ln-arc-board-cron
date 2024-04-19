import React from 'react';
import { useAppContext } from 'fusion:context';
import getAssetsPath from '../../../../private/common/utils/getAssetsPath';
import { Text } from '@ln/common-ui-text';
import { Button } from '@ln/foodit-ui-button';
import { Adaptableimage } from '@ln/common-ui-adaptableimage';
import {
    titleByVariant,
    descriptionByVariant,
    buttonPropsByVariant,
    imagePropsByVariant
} from './helpers';
import classNames from 'classnames';

const EmptyState = ({ variant, className, direction = 'row' }) => {
    const { contextPath, deployment } = useAppContext();

    const containerClassNames = classNames(
        'flex ai-center px-24 px-32_lg',
        {
            'flex-column flex-row_md gap-32 gap-24_md gap-32_lg p-24 p-32_lg':
                direction === 'row'
        },
        { 'gap-32 flex-column': direction === 'column' },
        className
    );
    const descriptionClassNames = classNames(
        'flex flex-column gap-8 text-center',
        { 'ai-center ': direction === 'column' },
        {
            'flex-grow-1 ai-center ai-start_md text-start_md':
                direction === 'row'
        }
    );

    const { label, onClick, variant: buttonVariant } =
        buttonPropsByVariant[variant] || {};

    if (!variant) return <></>;
    return (
        <section className={containerClassNames}>
            <Adaptableimage
                src={getAssetsPath(contextPath)(deployment)(
                    imagePropsByVariant[variant].asset
                )}
                alt={imagePropsByVariant[variant].alt}
            />
            <div className={descriptionClassNames}>
                <Text
                    as="p"
                    className="prumo prumo-semibold text-24 text-28_md text-32_lg"
                >
                    {titleByVariant[variant]}
                </Text>
                <Text as="p" className="text-16 text-light-600">
                    {descriptionByVariant[variant]}
                </Text>
            </div>
            {label && (
                <Button variant={buttonVariant} onClick={onClick}>
                    {label}
                </Button>
            )}
        </section>
    );
};

export default EmptyState;
