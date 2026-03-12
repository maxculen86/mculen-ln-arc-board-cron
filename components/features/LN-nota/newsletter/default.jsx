import Consumer from 'fusion:consumer';
import { LAZY_OFFSETTOP, API_ENV } from 'fusion:environment';
import { useAppContext } from 'fusion:context';
import React, { useEffect, useState } from 'react';
import { NewsletterBox } from '@ln/lib-newsletter';
import LazyLoad from '../../../common/LazyLoad/LazyLoad';
import get from '../../../private/common/utils/get';
import { TOAST_CONFIG } from '../../LN-10-global/common/toasts/helpers';
import renderToastAdapter from '../../LN-10-global/common/toasts/renderToastAdapter';
import NewsLetterEventsScript from '../../../private/common/scriptManager/NewsLetterEventScript';
import useAuthManager from '../../../private/common/auth/hooks/useAuthManager';

function NewsLetter({ globalContent }) {
    const [propsNewsletter, setPropsNewsletter] = useState({
        section: '',
        userIdToken: '',
        userAccessToken: '',
        isUserLoading: true,
        useTestEnvironment: API_ENV !== 'prod',
        onSubscription: () => {}
    });
    const { token, accessToken } = useAuthManager();

    const { layout, siteProperties } = useAppContext();

    const { layoutsName } = siteProperties || {};

    const isOpinion = layout === layoutsName.NotaOpinion;

    useEffect(() => {
        const primarySection = get(
            globalContent,
            'taxonomy.primary_section._id',
            ''
        );

        setPropsNewsletter({
            ...propsNewsletter,
            section: primarySection?.split('/')[1],
            userIdToken: token || '',
            isUserLoading: false,
            userAccessToken: accessToken || '',
            onSubscription: ({ code }) => {
                if (code >= 200 && code < 400) {
                    renderToastAdapter(
                        {
                            variant: TOAST_CONFIG.SUCCESS.VARIANT,
                            title: TOAST_CONFIG.SUCCESS.TITLE,
                            message:
                                TOAST_CONFIG.SUCCESS.MESSAGE.ADD_NEWSLLETER,
                            buttonProps:
                                TOAST_CONFIG.BUTTON_PROPS.NEWSLETTER_BOX
                        },
                        isOpinion
                    );
                } else {
                    renderToastAdapter(
                        {
                            variant: TOAST_CONFIG.ERROR.VARIANT,
                            title: TOAST_CONFIG.ERROR.TITLE,
                            message: TOAST_CONFIG.ERROR.MESSAGE.ADD_NEWSLLETER
                        },
                        isOpinion
                    );
                }
            }
        });
    }, [token, accessToken]);

    return (
        <LazyLoad PlaceholderComponent="div" rootMargin={`${LAZY_OFFSETTOP}px`}>
            <div className="mb-32">
                <NewsletterBox {...propsNewsletter} />
            </div>

            <NewsLetterEventsScript />
        </LazyLoad>
    );
}

NewsLetter.label = 'LN-Common-Newsletter';
NewsLetter.lazy = true;

export default Consumer(NewsLetter);
