import { useState, useEffect } from 'react';

export default function useIsomorphicPopupHandling() {
    const [modalData, setModalData] = useState({
        isVisible: false,
        data: {}
    });

    const handleData = data => {
        setModalData({
            isVisible: true,
            data
        });

        document.querySelector('body').classList.add('overflow-hidden');
    };

    useEffect(() => {
        window.LN.observable.subscribe('openModal', handleData);

        return () => {
            window.LN.observable.unsubscribe('openModal', handleData);
        };
    }, []);

    const close = customActions => {
        if (customActions) {
            customActions();
        }

        document.querySelector('body').classList.remove('overflow-hidden');
        setModalData({
            isVisible: false,
            data: {}
        });
    };

    return {
        openModal: handleData,
        close,
        modalData
    };
}
