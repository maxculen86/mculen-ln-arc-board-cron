/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';
import { getMessageProps } from '../../../private/common/utils/commentsHelper';
import Message from '../../../private/common/message';
import HeaderComments from '../../../private/LN/nota/comments/header';
import LoadingIcon from '../../../private/LN/common/loadingIcon';

const CommentsViafouraFeature = props => {
    const { id: featureId, globalContent: { messageType = '' } = {} } = props;
    const messageProps = getMessageProps(props, messageType);

    return (
        <Static id={featureId}>
            <div id={featureId}>
                {messageProps ? (
                    <Message {...messageProps} />
                ) : (
                    <HeaderComments showButton={false} />
                )}
                <LoadingIcon />
                <div
                    id="comments-viafoura-container"
                    className={`viafoura hlp-none${
                        messageProps ? ' not-comment' : ''
                    }`}
                >
                    <vf-tray />
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
                    dangerouslySetInnerHTML={{
                        __html: `
                    window.addEventListener('load', (event) => {
                            
                            let token = '';
                            let productoPremium = '';
                            const value = '; ' + document.cookie;
                            const parts = value.split('; token=');
                            const partsPremiumd = value.split('; ProductoPremiumId=');

                            if (parts.length === 2) 
                                token = parts.pop().split(';').shift();
                            
                            if (partsPremiumd.length === 2) 
                                productoPremium = partsPremiumd.pop().split(';').shift();

                                window.vfQ = window.vfQ || [];
                                window.vfQ.push(() => {
                                    window.vf.$prepublish((channel, event, ...args) => {
                                        if (channel === 'authentication' && event === 'required') {
                                            return false;
                                        }
                                        if (channel === 'commenting' && event === 'loaded') {
                                            const commentsFeature = document.getElementById('${featureId}')

                                            const viafouraElements = 
                                                commentsFeature && 
                                                commentsFeature.getElementsByClassName('viafoura');
                                            
                                            const commentsContainer = 
                                                viafouraElements && 
                                                viafouraElements.length &&
                                                [...viafouraElements].find(el => el.id === 'comments-viafoura-container');
                                            
                                            const loader = 
                                                commentsFeature &&
                                                commentsFeature.getElementsByClassName('loader');

                                            if (commentsContainer &&
                                                commentsContainer.classList &&
                                                commentsContainer.classList.length &&
                                                commentsContainer.classList.contains('hlp-none')) {
                                                    commentsContainer.classList.remove('hlp-none');
                                            }

                                            if (loader && loader.length) {
                                                loader[0].classList.add('hlp-none');
                                            }
                                        }
                                        return { channel, event, args };
                                    });
                                    if (productoPremium && productoPremium.includes('2')) {
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
                                    }
                                });     
                    });
                `
                    }}
                />
            </div>
        </Static>
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
