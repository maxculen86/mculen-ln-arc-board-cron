import { boxInfoBasic } from '../../common/boxBasic';

export const boxInfoAnticipoComplete = (information, section, typeSection) => {
    const box = boxInfoBasic(information, section, typeSection);

    if (box && information && !information.hideTitle) {
        return {
            ...box,
            parameters: {
                title: information.title || '',
                url: information.link
            }
        };
    }
    return box;
};
