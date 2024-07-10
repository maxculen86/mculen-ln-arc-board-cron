import { useEffect, useState } from 'react';
import dynamicallyLoadScript from '../../../private/LN/common/utils/dynamicallyLoadScript';
import get from '../../../private/common/utils/get';
import { getAuthFromCookie } from '../../../../auth/helper/loginHelper';

export const loginViafoura = async ({
    outputType,
    setIsReady,
    subscription
}) => {
    const token = await getAuthFromCookie();
    const accessToken = await getAuthFromCookie('access-token');

    dynamicallyLoadScript('https://cdn.viafoura.net/vf-v2.js', 'body')
        .then(() => {
            window.vfQ = window.vfQ || [];
            window.vfQ.push(() => {
                window.vf.$subscribe('commenting', 'loaded', () => {
                    setIsReady(true);
                });
                subscription &&
                    token &&
                    accessToken &&
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
        .catch(error => {
            console.error(
                'Ocurrió un error al intentar cargar el script de viafoura',
                error
            );
        });
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
