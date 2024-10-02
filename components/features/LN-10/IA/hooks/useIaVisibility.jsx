import { useEffect, useState } from 'react';
import { addEventToDataLayerV2 } from '../../../../private/LN/common/utils/addEventToDataLayer';

const useIaVisibility = observable => {
    const [isVisible, setIsVisible] = useState(false);

    const handleClose = () => {
        observable.publish('iaClosed', { closed: true });
        addEventToDataLayerV2({
            event: 'e_linkclick',
            action: 'IA',
            category: 'nota_ln9',
            label: 'cerrar_ia'
        });
        setIsVisible(false);
    };

    useEffect(() => {
        const handleShowIa = data =>
            data?.show !== undefined && setIsVisible(data.show || false);

        observable.subscribe('showIa', handleShowIa);

        return () => {
            observable.unsubscribe('showIa', handleShowIa);
            handleClose();
        };
    }, [observable]);

    return { isVisible, handleClose };
};

export default useIaVisibility;
