/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import { HeaderComments } from '../../foodit-global/common/headerComments/foodit';
import {
    getCommentsDataLayerInfo,
    loginViafoura,
    useValidateComments
} from './_helper';
import useGetUserConfig from '../../foodit-global/hooks/useGetUserConfig';
import LazyLoadComponent from '../../foodit-global/common/LazyLoad/foodit';
import LoadingFoodit from '../../foodit-global/common/Loading/foodit';
import CommentsViafoura from '../../foodit-global/common/CommentFoodit/foodit';
import { getVariantBarrier } from '../../foodit-global/common/emptyState/helpers';
import { EmptyStateDS } from '../../ui/foodit/emptyState/default';

function CommentFoodit(props) {
    const {
        outputType,
        customFields: { hideCaja },
        globalContent = {}
    } = props;
    const { layout } = useAppContext();

    const { isSubscribed: subscription, userType } = useGetUserConfig();

    const { showComments, allowComments } = useValidateComments(props);

    const [isReady, setIsReady] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isVisible) {
            loginViafoura({
                outputType,
                setIsReady,
                subscription,
                dataLayerInfo: getCommentsDataLayerInfo(layout, globalContent)
            });
        }
    }, [isVisible]);

    if (!showComments || hideCaja) return null;

    const onViewport = () => {
        setIsVisible(true);
    };

    return (
        <div id="viafoura-comments">
            {subscription ? (
                <HeaderComments />
            ) : (
                <EmptyStateDS
                    className="mb-40 bg-brand-sal md:flex-row md:text-left w-full p-16 md:p-24 xl:p-32"
                    variant={getVariantBarrier(userType)}
                    direction="horizontal"
                    comesFrom="CommentFoodit"
                />
            )}
            <LazyLoadComponent
                showComponent={isReady}
                rootMargin="600px"
                threshold={0.1}
                hide={hideCaja}
                onViewport={onViewport}
                PlaceholderComponent={LoadingFoodit}
            />
            <CommentsViafoura
                allowComments={allowComments}
                subscription={subscription}
            />
        </div>
    );
}

CommentFoodit.propTypes = {
    globalContent: PropTypes.shape({
        first_publish_date: PropTypes.string
    }),
    outputType: PropTypes.string,
    customFields: PropTypes.shape({
        hideCaja: PropTypes.boolean.tag({
            name: 'Ocultar Caja',
            description: 'Marque para ocultar la caja',
            defaultValue: false
        })
    })
};

CommentFoodit.outputType = 'foodit';
CommentFoodit.label = 'Foodit-Nota-Comments';

export default Consumer(CommentFoodit);
