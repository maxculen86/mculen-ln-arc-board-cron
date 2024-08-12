import Consumer from 'fusion:consumer';
import { LAZY_OFFSETTOP, API_ENV } from 'fusion:environment';
import React, { useEffect, useState } from 'react';
import Lazy from 'lazy-child';
import { NewsletterBox } from '@ln/lib-newsletter';
import get from '../../../private/common/utils/get';
import { ToastContainer } from '@ln/common-ui-toast';
import { toastProps } from './_helper';
import { Toast } from '@ln/contenidos-ui-toast';
import NewsLetterEventsScript from '../../../private/common/scriptManager/NewsLetterEventScript';

import '../../../../resources/packages/css/@ln/common-ui-toast/index.css';
import useAuthManager from '../../../../auth/hooks/useAuthManager';

const NewsLetter = ({ globalContent }) => {
    const [props, setProps] = useState({});
    const [newToast, setNewToast] = useState(<></>);
    const { token, accessToken } = useAuthManager();

    useEffect(() => {
        const primarySection = get(
            globalContent,
            'taxonomy.primary_section._id',
            ''
        );

        if (token && accessToken) {
            setProps({
                section: primarySection.split('/')[1],
                version: 3,
                site: 'all',

                userIdToken: token,
                userAccessToken: accessToken,
                useTestEnvironment: API_ENV !== 'prod',
                onSubscription: ({ code }) =>
                    code >= 200 && code < 400
                        ? setNewToast(<Toast {...toastProps['success']} />)
                        : setNewToast(<Toast {...toastProps['error']} />)
            });
        }
    }, [accessToken, token]);

    return (
        <Lazy
            renderPlaceholder={ref => {
                return <div ref={ref} />;
            }}
            offsetTop={LAZY_OFFSETTOP}
        >
            <>
                <ToastContainer
                    transitionIn={['fade-in-up']}
                    vPosition="inherit"
                    hPosition="center"
                    newToast={newToast}
                    className="top-113 top-auto_md bottom-100_md p-16 p-24_md p-32_lg bottom-100_md"
                />
                <div className="mb-32">
                    <NewsletterBox {...props} />
                </div>
            </>
            <NewsLetterEventsScript />
        </Lazy>
    );
};

NewsLetter.label = 'LN-Common-Newsletter';

export default Consumer(NewsLetter);
