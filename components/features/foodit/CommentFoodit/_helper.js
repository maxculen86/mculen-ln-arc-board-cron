import React, { useEffect, useState } from 'react';
import dynamicallyLoadScript from '../../../private/LN/common/utils/dynamicallyLoadScript';
import handleCookie from '../../../private/LN/common/utils/handleCookie';
import get from '../../../private/common/utils/get';

export const loginViafoura = ({ outputType, setIsReady, subscription }) => {
    const { getCookie } = handleCookie();

    dynamicallyLoadScript('https://cdn.viafoura.net/vf-v2.js', 'body')
        .then(() => {
            const token = getCookie('token');
            window.vfQ = window.vfQ || [];
            window.vfQ.push(() => {
                window.vf.$subscribe('commenting', 'loaded', () => {
                    setIsReady(true);
                });
                subscription &&
                    token &&
                    window.vf &&
                    window.vf.session &&
                    window.vf.session.login
                        .cookie(token)
                        .then(successMessage => {
                            console.log(
                                'Viafoura Login correcto ',
                                successMessage
                            );
                        })
                        .catch(error => {
                            console.error('Viafoura Login incorrecto ', {
                                error,
                                outputType
                            });
                        });
            });
        })
        .catch(error => {});
};
export const useValidateComments = props => {
    const [data, setData] = useState({});
    const allow = get(props, 'globalContent.comments.allow_comments', true);
    const showComments = get(
        props,
        'globalContent.comments.display_comments',
        true
    );

    useEffect(() => {
        setData({
            showComments,
            allowComments: allow
        });
    }, [allow, showComments, props]);

    return { ...data };
};
