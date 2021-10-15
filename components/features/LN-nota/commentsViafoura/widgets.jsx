/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import Static from 'fusion:static';
// import '../../../../resources/dist/css/ln/components/viafoura.css';

const CommentsViafouraFeature = props => {
    const { id: featureId } = props;

    return (
        <Static id={featureId}>
            <div className="viafoura">
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

                                if (productoPremium && productoPremium.includes('2')) {
                                    window.vfQ = window.vfQ || [];
                                    window.vfQ.push(() => {
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
                                }
                        });
                    `
                }}
            />
        </Static>
    );
};

CommentsViafouraFeature.propTypes = {
    id: PropTypes.string.isRequired
};

CommentsViafouraFeature.label = 'LN-Nota-Comments-Viafoura';

export default CommentsViafouraFeature;
