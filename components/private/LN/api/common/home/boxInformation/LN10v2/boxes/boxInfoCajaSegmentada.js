import { boxInfoBasic } from '../../common/boxBasic';

export const boxInfoCajaSegmentada = (information, section, typeSection) => {
    const box = boxInfoBasic(information, section, typeSection);
    if (box && information) {
        return {
            ...box,
            parameters: {
                buttonLogo: information?.buttonLogo,
                idCollection: information?.idCollection || null,
                idSegment: information?.segment || null,
                from: information?.initialPosition ?? 0,
                logoId: information?.logoId,
                noteCount: information?.noteCount || 3,
                title: (information.title || '').toUpperCase(),
                url: information.link
            }
        };
    }
    return box;
};

export default boxInfoCajaSegmentada;
