import { useEffect, useState } from 'react';
import handleCookie from '../../../private/LN/common/utils/handleCookie';
import addEventToDataLayer from '../../../private/LN/common/utils/addEventToDataLayer';
import {
    checkSubscription,
    isNotificationDefault
} from './register/pwaMessaging';

const lnNotification = 'ln-notification';

const usePwaModal = () => {
    const { getCookie, setCookie } = handleCookie();
    const [isShowModal, setIsShowModal] = useState(false);

    useEffect(() => {
        const notificationCookie = getCookie(lnNotification);
        if (!notificationCookie && isNotificationDefault()) {
            addEventToDataLayer({ event: 'PushNoficationPrompt' });
            setIsShowModal(true);
        }
    }, []);

    const handleNoClick = async e => {
        e.preventDefault();
        await addEventToDataLayer({ event: 'PushNoficationDismiss' });
        setCookie(lnNotification, 'false', 43200);
        setIsShowModal(false);
    };

    const handleYesClick = async e => {
        e.preventDefault();
        await addEventToDataLayer({ event: 'PushNoficationConsent' });
        setCookie(lnNotification, 'true', 43200);
        try {
            checkSubscription(true);
            setIsShowModal(false);
        } catch (error) {
            console.log('🚀 ~ handleYesClick ~ error:', error);
            setIsShowModal(false);
        }
    };

    return {
        isShowModal,
        handleNoClick,
        handleYesClick
    };
};

export default usePwaModal;
