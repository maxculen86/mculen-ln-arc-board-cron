/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import { HeaderComments } from '../../foodit-global/common/headerComments/foodit';
import useGetUserData from '../../foodit-global/hooks/useGetUserData';
import { loginViafoura, useValidateComments } from './_helper';
import LazyLoad from '../../foodit-global/common/LazyLoad/foodit';
import LoadingFoodit from '../../foodit-global/common/Loading/foodit';
import CommentsViafoura from '../../foodit-global/common/CommentFoodit/foodit';
import EmptyState from '../../foodit-global/common/emptyState/foodit';
import { getVariantBarrier } from '../../foodit-global/common/emptyState/helpers';

const CommentFoodit = props => {
    const {
        outputType,
        customFields: { hideCaja }
    } = props;
    const { isSuscribed: subscription, userType } = useGetUserData();

    const { showComments, allowComments } = useValidateComments(props);

    const [isReady, setIsReady] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isVisible) {
            loginViafoura({ outputType, setIsReady, subscription });
        }
    }, [isVisible]);

    if (!showComments || hideCaja) return <></>;

    const onViewport = () => {
        setIsVisible(true);
    };

    return (
        <div id="viafoura-comments">
            {subscription ? (
                <HeaderComments />
            ) : (
                <EmptyState
                    variant={getVariantBarrier(userType)}
                    direction="row"
                    className="bg-positive mb-40"
                />
            )}
            <LazyLoad
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
};

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
