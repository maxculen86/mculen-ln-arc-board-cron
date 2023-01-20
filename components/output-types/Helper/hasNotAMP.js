import Redirect from '../../../content/sources/utils/redirect';

const hasNotAMP = (layout, requestUri) => {
    const layoutsWithoutAmp = [
        'LN-acumulado',
        'LN-Home_Main',
        'LN-Home_Sports'
    ];
    if (typeof window === 'undefined' && layoutsWithoutAmp.includes(layout)) {
        throw new Redirect(
            `${requestUri.replace(/[&|?]outputType=amp/, '')}`,
            301
        );
    }
};

export default hasNotAMP;
