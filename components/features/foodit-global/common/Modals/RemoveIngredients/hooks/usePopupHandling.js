import { useEffect, useState } from 'react';

export const usePopupHandling = () => {
    const [modalData, setModalData] = useState({
        show: false,
        data: {}
    });

    const close = customActions => {
        if (customActions) {
            customActions();
        }

        setModalData({
            isVisible: false,
            data: {}
        });
    };

    const handleData = data => {
        setModalData(data);
    };

    useEffect(() => {
        window.LN.observable.subscribe('showModalIngredient', handleData);

        return () => {
            window.LN.observable.unsubscribe('showModalIngredient', handleData);
        };
    }, []);

    return {
        openModal: handleData,
        close,
        modalData
    };
};
