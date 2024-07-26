import { useState, useEffect, useRef } from 'react';
import { handleEventWords, findObjectGlossary } from '../helpers';
import { useEventListener } from '@ln/hooks';
import { getLocationTooltip } from '../helpers';

export const useTooltip = glossaryData => {
    const defaultTooltipData = {
        key: '',
        show: false,
        value: '',
        eventTarget: undefined
    };
    const [tooltipData, setTooltipData] = useState(defaultTooltipData);
    const [tooltipLocation, setTooltipLocation] = useState({ left: 0, top: 0 });

    const tooltipRef = useRef(null);

    const { show, key, value, eventTarget } = tooltipData;

    // TODO: EVALUAR CON DISEÑO QUE HACER EN CASO QUE EL TOOLTIP NO ENTRE EN EL VIEWPORT

    const handleCloseWhenIsScrolled = () => {
        if (show) setTooltipData(defaultTooltipData);
    };
    useEventListener('scroll', handleCloseWhenIsScrolled);

    const updateTooltipData = args => {
        if (args?.event?.type === 'mouseleave') {
            setTooltipData(defaultTooltipData);
            return;
        }
        if (window?.innerWidth < 1280) return;

        const objectGlossary = findObjectGlossary(glossaryData, args?.key);

        setTooltipData({
            key: args?.key,
            show: args?.show,
            value: objectGlossary?.value || '',
            eventTarget: args?.event?.target
        });
        handleEventWords(args?.key);
    };

    useEffect(() => {
        window?.LN.observable.subscribe('handleGlossary', updateTooltipData);

        if (show) {
            const { left, top } = getLocationTooltip(tooltipRef, eventTarget);
            setTooltipLocation({
                left,
                top
            });
        }

        return () => {
            window?.LN.observable.unsubscribe(
                'handleGlossary',
                updateTooltipData
            );
        };
    }, [tooltipData]);

    return { tooltipRef, show, key, value, tooltipLocation };
};
