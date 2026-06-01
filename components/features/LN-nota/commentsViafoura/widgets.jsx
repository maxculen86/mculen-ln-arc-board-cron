import React from 'react';
import { useAppContext } from 'fusion:context';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';
import HeaderComments from '../../../private/LN/nota/comments/header';
import LoadingIcon from '../../../private/LN/common/loadingIcon';
import '../../../../resources/dist/css/ln/modules/comments.css';

function CommentsViafouraFeature() {
    const { contextPath, deployment } = useAppContext();

    return (
        <Static id="LN-comments">
            <HeaderComments />
            <LoadingIcon />
            <div id="comments-viafoura-container" className="viafoura">
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
