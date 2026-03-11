import React, { useContext } from 'react';
import { useAppContext } from 'fusion:context';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';
import { GlobalContext } from '../../../private/common/context/globalContext';
import { getMessageProps } from '../../../private/common/utils/commentsHelper';
import Message from '../../../private/common/message';
import HeaderComments from '../../../private/LN/nota/comments/header';
import LoadingIcon from '../../../private/LN/common/loadingIcon';
import '../../../../resources/dist/css/ln/modules/comments.css';

function CommentsViafouraFeature(props) {
    const { globalContent: { messageType = '' } = {} } = props;
    const { contextPath, deployment } = useAppContext();
    const gc = useContext(GlobalContext);
    const messageProps = getMessageProps(props, messageType, gc);

    return (
        <Static id="LN-comments">
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
            <script
                id="script-header-comments"
                defer
                src={deployment(
                    `${contextPath}/resources/js/LN/scriptHeaderComments.min.js`
                )}
            />
        </Static>
    );
}

CommentsViafouraFeature.label = 'LN-Nota-Comments-Viafoura';

export default Consumer(CommentsViafouraFeature);
