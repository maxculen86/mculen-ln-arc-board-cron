import { useEffect, useState } from 'react';
import dynamicallyLoadScript from '../../../private/LN/common/utils/dynamicallyLoadScript';
import get from '../../../private/common/utils/get';
import { getAuthTokens } from '../../../../auth/helper/loginHelper';
import { TRANSLATE_LAYOUTS } from '../../foodit-global/common/dataLayer/_helpers';
import { addEventToDataLayerV2 } from '../../../private/LN/common/utils/addEventToDataLayer';

export const loginViafoura = async ({
    outputType,
    setIsReady,
    subscription,
    dataLayerInfo = {}
}) => {
    const { token, accessToken } = await getAuthTokens();

    dynamicallyLoadScript('https://cdn.viafoura.net/vf-v2.js', 'body')
        .then(() => {
            window.vfQ = window.vfQ || [];
            window.vfQ.push(() => {
                window.vf.$subscribe('commenting', 'loaded', () => {
                    setIsReady(true);
                });
                window.vf.$subscribe('comment', 'created', () =>
                    addEventToDataLayerV2(dataLayerInfo)
                );
                window.vf.$subscribe('comment-reply', 'posted', () =>
                    addEventToDataLayerV2(dataLayerInfo)
                );
                subscription &&
                    token &&
                    accessToken &&
                    window.vf &&
                    window.vf.session &&
                    window.vf.session.login.cookie(token).catch(error => {
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

export const getCommentsDataLayerInfo = (globalContent = {}, layout) => {
    const { _id = '' } = globalContent;

    return {
        event: 'share_comment',
        contentType: TRANSLATE_LAYOUTS[layout] || '',
        title: get(globalContent, 'headlines.basic', ''),
        articleId: _id
    };
};
