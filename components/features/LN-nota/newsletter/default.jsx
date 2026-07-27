import Consumer from 'fusion:consumer';
import { LAZY_OFFSETTOP, API_ENV } from 'fusion:environment';
import React, { useEffect, useState } from 'react';
import { NewsletterBox } from '@ln/lib-newsletter';
import LazyLoad from '../../../common/LazyLoad/LazyLoad';
import get from '../../../private/common/utils/get';
import { TOAST_CONFIG } from '../../ui/ln/toastsContainer/helpers';
import renderToasts from '../../ui/ln/toastsContainer/renderToast';
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
                    renderToasts({
                        title: TOAST_CONFIG.SUCCESS.TITLE,
                        description:
                            TOAST_CONFIG.SUCCESS.DESCRIPTION.ADD_NEWSLLETER,
                        color: TOAST_CONFIG.SUCCESS.COLOR,
                        buttonProps: TOAST_CONFIG.BUTTON_PROPS.NEWSLETTER_BOX
                    });
                } else {
                    renderToasts({
                        title: TOAST_CONFIG.ERROR.TITLE,
                        description:
                            TOAST_CONFIG.ERROR.DESCRIPTION.ADD_NEWSLLETER,
                        color: TOAST_CONFIG.ERROR.COLOR
                    });
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
