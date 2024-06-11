import { useEffect, useState } from 'react';
import handleCookie from '../../LN/common/utils/handleCookie';
import addEventToDataLayer from '../../LN/common/utils/addEventToDataLayer';
import {
    checkSubscription,
    isNotificationDefault
} from '../../../features/LN-10-global/pwaModal/register/pwaMessaging';
import { scheduleTask } from '../utils/scheduleTask';

const lnNotification = 'ln-notification';

const usePwaModal = () => {
    const { getCookie, setCookie } = handleCookie();
    const [isShowModal, setIsShowModal] = useState(false);

    useEffect(() => {
        const notificationCookie = getCookie(lnNotification);
        if (!notificationCookie && isNotificationDefault()) {
            setIsShowModal(true);
        }
    }, []);

    const handleNoClick = e => {
        e.preventDefault();
        setCookie(lnNotification, 'false', 43200);
        setIsShowModal(false);
    };

    const handleYesClick = async e => {
        e.preventDefault();
        await scheduleTask(() =>
            addEventToDataLayer({ event: 'PushNoficationConsent' })
        );
        setCookie(lnNotification, 'true', 43200);
        try {
            checkSubscription(true);
            setIsShowModal(false);
        } catch (error) {
            console.error('🚀 ~ handleYesClick ~ error:', error);
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
