import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import { Text } from '@ln/common-ui-text';
import { Adaptableimage } from '@ln/common-ui-adaptableimage';
import { cx } from '@ln/cva';
import {
    titleByVariant,
    descriptionByVariant,
    imagePropsByVariant
} from './helpers';
import useGetUserConfig from '../../hooks/useGetUserConfig';
import getAssetsPath from '../../../../private/common/utils/getAssetsPath';
import RenderButtons from './ButtonEmptyState';
import CardInfo from './cardInfo';

function EmptyState({ variant, className, direction = 'row', comesFrom = '' }) {
    const { userType, isSubscribed } = useGetUserConfig();
    const { contextPath, deployment, layout } = useAppContext();
    const directionEmptyState = direction === 'row';
    const barrierEmptyState =
        variant === 'barrier-unlogged' || variant === 'barrier-logged';

    const containerClassNames = cx(
        'flex ai-center px-24 px-32_lg',
        {
            'flex-column flex-row_md gap-32 gap-24_md gap-32_lg p-24 p-32_lg':
                direction === 'row'
        },
        { 'flex-column': direction === 'column' },
        className
    );
    const descriptionClassNames = cx(
        'flex flex-column gap-8 text-center',
        { 'ai-center ': direction === 'column' },
        {
            'flex-grow-1 ai-center ai-start_md text-start_md':
                direction === 'row'
        }
    );

    const buttonsClassName = cx(
        'flex gap-24 ai-center',
        { ' pt-24': direction === 'column' },
        {
            '': direction === 'row'
        }
    );

    if (!variant) return null;

    const buttons = RenderButtons({ variant, userType, comesFrom });

    return (
        <div>
            <section className={containerClassNames}>
                {imagePropsByVariant[variant].asset && (
                    <Adaptableimage
                        src={getAssetsPath(contextPath)(deployment)(
                            imagePropsByVariant[variant].asset
                        )}
                        alt={imagePropsByVariant[variant].alt}
                        className={imagePropsByVariant[variant].className}
                        objectFit="fill"
                    />
                )}
                <div className={descriptionClassNames}>
                    <Text
                        as="p"
                        className="prumo prumo-medium text-24 text-light-800"
                    >
                        {titleByVariant[variant]}
                    </Text>
                    <Text as="p" className="text-16 text-light-600">
                        {descriptionByVariant({ layout, variant })}
                    </Text>
                </div>
                {buttons && <div className={buttonsClassName}>{buttons}</div>}
            </section>
            {!isSubscribed && barrierEmptyState && !directionEmptyState ? (
                <div className="flex flex-column jc-center ai-center">
                    <hr className="w-95 my-32" />
                    <div className="w-100">
                        <Text
                            as="p"
                            className="text-center prumo prumo-light text-24"
                        >
                            ¿Por qué suscribirme a Foodit?
                        </Text>
                        <div className="pt-24">
                            <CardInfo />
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

EmptyState.propTypes = {
    variant: PropTypes.string,
    direction: PropTypes.string,
    className: PropTypes.string,
    comesFrom: PropTypes.string
};

EmptyState.defaultProps = {
    variant: '',
    direction: 'row',
    className: '',
    comesFrom: ''
};

export default EmptyState;
