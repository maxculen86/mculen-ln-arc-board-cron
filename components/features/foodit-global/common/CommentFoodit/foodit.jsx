import React from 'react';
import classNames from 'classnames';

const CommentsViafoura = ({ messageProps }) => {
    const viafouraClassName = classNames('viafoura --no-app', {
        'not-comment': messageProps
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
};

export default CommentsViafoura;
