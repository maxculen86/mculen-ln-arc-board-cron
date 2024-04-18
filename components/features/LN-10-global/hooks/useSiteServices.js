import { useAppContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import { useMemo } from 'react';

export const transformResponse = response => {
    {
        const {
            site = {},
            Termicas: termicasConfig = {},
            bannerConfig = {},
            migration = {}
        } = response || {};
        const {
            sitio_adserver: sitioAdserver = {},
            tooltips = {},
            not_recommended_sections: notRecommendedSections = []
        } = site;

        return {
            bannerConfig: { dfp_id: bannerConfig.dfp_id },
            tooltips: Object.keys(tooltips).map(key => ({
                text: key,
                label: tooltips[key]
            })),
            banners: Object.keys(bannerConfig).map(key => ({
                adunit: key,
                dimensions: bannerConfig[key]
            })),
            adserver: Object.keys(sitioAdserver).map(key => ({
                key,
                value: sitioAdserver[key]
            })),
            termicas: Object.keys(termicasConfig).map(key => ({
                key,
                value: termicasConfig[key]
            })),
            migration,
            notRecommendedSections
        };
    }
};

const useSiteServices = () => {
    const { arcSite: website } = useAppContext();

    const siteServices = useContent({
        source: 'navigationTreeSource',
        query: { website },
        transform: response => {
            return transformResponse(response);
        }
    });
    return useMemo(() => siteServices, [siteServices]);
};

export default useSiteServices;
