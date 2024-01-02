import React, { useContext } from 'react';
import { useAppContext } from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import { GlobalContext } from '../../../private/common/context/globalContext';
import { getMessageProps } from '../../../private/common/utils/commentsHelper';
import Message from '../../../private/common/message';
import HeaderComments from '../../../private/LN/nota/comments/header';
import LoadingIcon from '../../../private/LN/common/loadingIcon';
import '../../../../resources/dist/css/ln/modules/comments.css';
import StaticContent from '../../../private/common/staticContent';

const CommentsViafouraFeature = props => {
    const { globalContent: { messageType = '' } = {} } = props;
    const { contextPath, deployment } = useAppContext();
    const gc = useContext(GlobalContext);
    const messageProps = getMessageProps(props, messageType, gc);

    return (
        <StaticContent>
            {messageProps ? <Message {...messageProps} /> : <HeaderComments />}
            <LoadingIcon />
            <div
                id="comments-viafoura-container"
                className={`viafoura${messageProps ? ' not-comment' : ''}`}
            >
                <vf-conversations
                    limit="15"
                    pagination-limit="30"
                    reply-limit="3"
                    pagination-reply-limit="15"
                    sort="newest"
                    featured-tab-active-threshold="3"
                />
            </div>
            <script
                id="scriptCommentsViafouraWidgets"
                src={deployment(
                    `${contextPath}/resources/js/LN/scriptCommentsViafouraWidgets.min.js`
                )}
            />
        </StaticContent>
    );
};

CommentsViafouraFeature.propTypes = {
    id: PropTypes.string.isRequired,
    globalContent: PropTypes.shape({
        messageType: PropTypes.string
    }).isRequired
};

CommentsViafouraFeature.label = 'LN-Nota-Comments-Viafoura';

export default Consumer(CommentsViafouraFeature);
