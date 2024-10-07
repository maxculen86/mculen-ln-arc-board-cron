import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import { Text } from '@ln/common-ui-text';
import { Button } from '@ln/foodit-ui-button';
import { Adaptableimage } from '@ln/common-ui-adaptableimage';
import classNames from 'classnames';
import {
    titleByVariant,
    descriptionByVariant,
    buttonPropsByVariant,
    imagePropsByVariant
} from './helpers';
import useGetUserConfig from '../../hooks/useGetUserConfig';
import getAssetsPath from '../../../../private/common/utils/getAssetsPath';

function EmptyState({ variant, className, direction = 'row' }) {
    const { userType } = useGetUserConfig();
    const { contextPath, deployment, layout } = useAppContext();

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

    const {
        label,
        href,
        variant: buttonVariant
    } = buttonPropsByVariant[variant] || {};

    if (!variant) return null;
    return (
        <section className={containerClassNames}>
            <Adaptableimage
                src={getAssetsPath(contextPath)(deployment)(
                    imagePropsByVariant[variant].asset
                )}
                alt={imagePropsByVariant[variant].alt}
                width={imagePropsByVariant[variant].width}
                height={imagePropsByVariant[variant].height}
                objectFit="fill"
            />
            <div className={descriptionClassNames}>
                <Text
                    as="p"
                    className="prumo prumo-semibold text-24 text-28_md text-32_lg"
                >
                    {titleByVariant[variant]}
                </Text>
                <Text as="p" className="text-16 text-light-600">
                    {descriptionByVariant({ layout, variant })}
                </Text>
            </div>
            {userType === 'unlogged' ? (
                <div className="flex gap-24 ai-center">
                    <Button
                        variant={buttonPropsByVariant['barrier-logged'].variant}
                        href={buttonPropsByVariant['barrier-logged'].href}
                    >
                        {buttonPropsByVariant['barrier-logged'].label}
                    </Button>
                    <Button
                        variant={
                            buttonPropsByVariant['barrier-unlogged'].variant
                        }
                        href={buttonPropsByVariant['barrier-unlogged'].href}
                    >
                        <span className="uppercase">
                            {buttonPropsByVariant['barrier-unlogged'].label}
                        </span>
                    </Button>
                </div>
            ) : (
                <Button variant={buttonVariant} href={href}>
                    {label}
                </Button>
            )}
        </section>
    );
}

EmptyState.propTypes = {
    variant: PropTypes.isRequired,
    direction: PropTypes.isRequired,
    className: PropTypes.isRequired
};

export default EmptyState;
