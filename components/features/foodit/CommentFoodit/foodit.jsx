/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import {
    CLOSED_BY_TERMIC,
    allowCommentsFoodit,
    useValidateComments
} from '../../../private/common/utils/commentsHelper';
import { HeaderComments } from '../../foodit-global/common/headerComments/foodit';
import useTermica from '../../../private/common/hooks/useTermica';
import useGetUserData from '../../foodit-global/hooks/useGetUserData';
import { loginViafoura } from './_helper';
import LazyLoad from '../../foodit-global/common/LazyLoad/foodit';
import LoadingFoodit from '../../foodit-global/common/Loading/foodit';
import CommentsViafoura from '../../foodit-global/common/CommentFoodit/foodit';
import EmptyState from '../../foodit-global/common/emptyState/foodit';
import { getVariantBarrier } from '../../foodit-global/common/emptyState/helpers';

const CommentFoodit = props => {
    const {
        outputType,
        customFields: { hideCaja },
        globalContent
    } = props;
    const { isSuscribed: subscription, userType } = useGetUserData();

    const {
        messageType,
        shouldLoad,
        messageProps,
        setMessage
    } = useValidateComments(props, subscription);

    const allowCommentsValidate =
        useTermica('livefyre') &&
        allowCommentsFoodit({ article: globalContent });

    const [isReady, setIsReady] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isVisible) {
            loginViafoura({ outputType, setIsReady, setMessage, subscription });
        }
    }, [isVisible]);

    if (shouldLoad && !termicaLivefyre && messageType === CLOSED_BY_TERMIC)
        return <></>;

    if (!allowCommentsValidate || hideCaja) return <></>;

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
            <CommentsViafoura messageProps={messageProps} />
        </div>
    );
};

CommentFoodit.propTypes = {
    id: PropTypes.string,
    globalContent: PropTypes.shape({
        first_publish_date: PropTypes.string
    }),
    outputType: PropTypes.string
};
CommentFoodit.propTypes = {
    isAdmin: PropTypes.bool,
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
