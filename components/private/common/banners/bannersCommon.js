const getBannerConfig = ({ device, dfpId, optDiv }) => {
    const pathSlot = `/${dfpId}/la_nacion_${device}`;

    const config = {
        logo_header_dsk: {
            adUnitPath: `${pathSlot}/logo_header_dsk`,
            size: [[300, 30]]
        },
        logo_header_mob: {
            adUnitPath: `${pathSlot}/logo_header_mob`,
            dimensions: [[170, 17]]
        },
        logo_header_tab: {
            adUnitPath: `${pathSlot}/logo_header_tab`,
            dimensions: [[200, 20]]
        }
    };

    return config[optDiv];
};

export default getBannerConfig;
