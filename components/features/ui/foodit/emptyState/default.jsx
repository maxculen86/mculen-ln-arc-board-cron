import React from 'react';
import { useAppContext } from 'fusion:context';
import { Emptystate } from '@ln/ds-common-emptystate';
import { cx } from '@ln/ds-cva';
import {
    imagePropsByVariant,
    titleByVariant,
    descriptionByVariant
} from '../../../foodit-global/common/emptyState/helpers';
import getAssetsPath from '../../../../private/common/utils/getAssetsPath';
import Image from '../image/default';
import Divider from '../divider/default';
import CardInfo from './card/default';
import LoginSubscribeButtons from '../../../foodit-global/common/SubscribeLoginButton/foodit';
import { useNavigationData } from '../../../foodit-global/common/Header/hooks/useNavigationData';
import useGetUserConfig from '../../../foodit-global/hooks/useGetUserConfig';

export function EmptyStateDS({
    variant = '',
    comesFrom = '',
    className = '',
    direction = ''
}) {
    const { isSubscribed } = useGetUserConfig();
    const { contextPath, deployment, layout, siteProperties } = useAppContext();
    const { termicasData } = useNavigationData();
    const { layoutsName = {} } = siteProperties || {};

    const shouldRenderButtons =
        variant !== 'search-engine' && variant !== '404';

    const directionEmptyState = direction === 'horizontal';
    const barrierEmptyState =
        variant === 'barrier-unlogged' || variant === 'barrier-logged';

    const isTargetLayout =
        layout === layoutsName.FooditMenuSemanal ||
        layout === layoutsName.FooditListadoCompras ||
        layout === layoutsName.FooditRecetario;

    const classNameTitle = cx(
        'font-secondary',
        !isSubscribed && isTargetLayout
            ? 'text-primary-default'
            : 'text-secondary-default'
    );
    if (!variant) return null;

    return (
        <div data-tw>
            <Emptystate className={className}>
                {imagePropsByVariant[variant].asset && (
                    <Image
                        hidePlaceholder
                        src={getAssetsPath(contextPath)(deployment)(
                            imagePropsByVariant[variant].asset
                        )}
                        alt={imagePropsByVariant[variant].alt}
                        classnames={{
                            wrapper: imagePropsByVariant[variant].className
                        }}
                    />
                )}
                <Emptystate.Body className="w-full">
                    <Emptystate.Text variant="title">
                        {titleByVariant[variant]}
                    </Emptystate.Text>
                    <Emptystate.Text
                        className={classNameTitle}
                        variant="subtitle"
                    >
                        {descriptionByVariant({ layout, variant })}
                    </Emptystate.Text>
                </Emptystate.Body>
                {shouldRenderButtons && (
                    <div className="flex ai-center gap-24">
                        <LoginSubscribeButtons
                            classNameButtons="min-h-32 xl:min-h-40"
                            loginClassName="font-secondary font-bold"
                            comesFrom={comesFrom}
                            termicasData={termicasData}
                        />
                    </div>
                )}
            </Emptystate>
            {!isSubscribed && barrierEmptyState && !directionEmptyState ? (
                <>
                    <div className="md:w-320 h-2 py-32 mx-auto">
                        <Divider />
                    </div>
                    <div className="flex flex-col justify-center">
                        <p
                            style={{ '--vf-wght': 70 }}
                            className="text-center font-primary text-24 pb-24"
                        >
                            ¿Por qué suscribirme a Foodit?
                        </p>
                        <CardInfo />
                    </div>
                </>
            ) : null}
        </div>
    );
}
