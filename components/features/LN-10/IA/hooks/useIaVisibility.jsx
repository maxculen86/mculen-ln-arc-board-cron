import { useEffect, useState } from 'react';
import { addEventToDataLayerV2 } from '../../../../private/LN/common/utils/addEventToDataLayer';

const useIaVisibility = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleClose = () => {
        if (typeof window !== 'undefined' && window.LN?.observable) {
            window.LN.observable.publish('iaClosed', { closed: true });
            addEventToDataLayerV2({
                event: 'e_linkclick',
                action: 'IA',
                category: 'nota_ln9',
                label: 'cerrar_ia'
            });
            setIsVisible(false);
        }
    };

    useEffect(() => {
        const handleShowIa = data =>
            data?.show !== undefined && setIsVisible(data.show || false);

        window?.LN?.observable.subscribe('showIa', handleShowIa);

        return () => {
            window?.LN?.observable.unsubscribe('showIa', handleShowIa);
            handleClose();
        };
    }, []);

    return { isVisible, handleClose };
};

export default useIaVisibility;
