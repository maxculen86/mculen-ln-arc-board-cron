import Consumer from 'fusion:consumer';
import { LAZY_OFFSETTOP, API_ENV } from 'fusion:environment';
import PropTypes from 'fusion:prop-types';
import React, { useEffect, useState } from 'react';
import Lazy from 'lazy-child';
import { NewsletterBox } from '@ln/lib-newsletter';
import { ToastContainer } from '@ln/common-ui-toast';
import { Toast } from '@ln/contenidos-ui-toast';
import get from '../../../private/common/utils/get';
import { toastProps } from './_helper';
import NewsLetterEventsScript from '../../../private/common/scriptManager/NewsLetterEventScript';

import '../../../../resources/packages/css/@ln/common-ui-toast/index.css';
import useAuthManager from '../../../../auth/hooks/useAuthManager';

function NewsLetter({ globalContent }) {
    const [propsNewsletter, setPropsNewsletter] = useState({
        section: '',
        userIdToken: '',
        userAccessToken: '',
        isUserLoading: true,
        useTestEnvironment: API_ENV !== 'prod',
        onSubscription: () => {}
    });
    const [newToast, setNewToast] = useState();
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
            userIdToken: token,
            isUserLoading: false,
            userAccessToken: accessToken || '',
            onSubscription: ({ code }) =>
                code >= 200 && code < 400
                    ? setNewToast(<Toast {...toastProps.success} />)
                    : setNewToast(<Toast {...toastProps.error} />)
        });
    }, [token, accessToken]);

    return (
        <Lazy
            renderPlaceholder={ref => <div ref={ref} />}
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
                    <NewsletterBox {...propsNewsletter} />
                </div>
            </>
            <NewsLetterEventsScript />
        </Lazy>
    );
}

NewsLetter.label = 'LN-Common-Newsletter';
NewsLetter.propTypes = {
    globalContent: PropTypes.shape({
        taxonomy: PropTypes.shape({
            primary_section: PropTypes.shape({
                _id: PropTypes.string
            })
        })
    }).isRequired
};

export default Consumer(NewsLetter);
