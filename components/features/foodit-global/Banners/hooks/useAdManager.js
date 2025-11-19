/* eslint-disable no-undef */
import { useEffect, useState } from 'react';
import { createScriptBanners } from '../_helpers/bannersScript';

export function useAdManager(slotId, size, divId, targetings) {
    const [error, setError] = useState(null);

    useEffect(() => {
        createScriptBanners();

        window.googletag = window.googletag || { cmd: [] };

        try {
            window.googletag?.cmd?.push(() => {
                Object.entries(targetings).forEach(([key, value]) => {
                    googletag.pubads().setTargeting(key, value);
                });

                const googleTagWithSlot = googletag.defineSlot(
                    slotId,
                    size,
                    divId
                );

                googleTagWithSlot.addService(googletag.pubads());
                googletag.pubads().enableSingleRequest();
                googletag.enableServices();
                googletag.display(divId);
            });
        } catch (err) {
            setError(err);
        }
    }, [slotId, size, divId, targetings]);

    return error;
}
