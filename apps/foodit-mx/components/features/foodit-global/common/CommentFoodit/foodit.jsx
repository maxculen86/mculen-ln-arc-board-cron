import React from 'react';
import classNames from 'classnames';

function CommentsViafoura({ allowComments, subscription }) {
    const viafouraClassName = classNames('viafoura', {
        'not-comment': !allowComments || !subscription
    });
    return (
        <div className={viafouraClassName}>
            <vf-conversations
                limit="15"
                pagination-limit="30"
                reply-limit="3"
                pagination-reply-limit="15"
                sort="newest"
                featured-tab-active-threshold="3"
            />
        </div>
    );
}

export default CommentsViafoura;
