/* eslint-disable react/no-danger */
import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import Static from 'fusion:static';
import {
    validateComments,
    getMessageProps
} from '../../../private/common/utils/commentsHelper';
import Message from '../../../private/common/message';
// import '../../../../resources/dist/css/ln/components/viafoura.css';

const CommentsViafouraFeature = props => {
    const { id: featureId, globalContent = {}, outputType } = props;
    const { subscription } = globalContent;
    const { messageType, shouldLoad } = validateComments(props);
    const messageProps = getMessageProps(props, messageType);

    if (!shouldLoad || outputType !== 'default') return <></>;

    return (
        <Static id={featureId}>
            {messageProps && <Message {...messageProps} />}
            <div className={`viafoura${messageProps ? ' not-comment' : ''}`}>
                <vf-conversations
                    limit="15"
                    pagination-limit="30"
                    reply-limit="3"
                    pagination-reply-limit="15"
                    sort="newest"
                    featured-tab-active-threshold="3"
                />
            </div>
            {subscription === 'S' && (
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.addEventListener('load', (event) => {
                                    let token = '';
                                    const value = '; ' + document.cookie;
                                    const parts = value.split('; token=');
                                    if (parts.length === 2) 
                                        token = parts.pop().split(';').shift();
                                    window &&
                                        window.vf &&
                                        window.vf.session &&
                                        window.vf.session.login
                                            .cookie(token)
                                            .then(successMessage => {
                                                console.log('Viafoura Login correcto ', successMessage);
                                            })
                                            .catch(error => {
                                                console.log('Viafoura Login incorrecto ', error);
                                            });  
                            });
                        `
                    }}
                />
            )}
        </Static>
    );
};

CommentsViafouraFeature.propTypes = {
    id: PropTypes.string.isRequired,
    globalContent: PropTypes.shape({
        first_publish_date: PropTypes.string
    }).isRequired,
    outputType: PropTypes.string.isRequired
};

CommentsViafouraFeature.outputType = 'default';

CommentsViafouraFeature.label = 'LN-Nota-Comments-Viafoura';

export default Consumer(CommentsViafouraFeature);
