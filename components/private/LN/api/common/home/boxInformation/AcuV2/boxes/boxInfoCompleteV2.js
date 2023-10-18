import { boxInfoBasic } from '../../common/boxBasic';

export const boxInfoCompleteV2 = (information, section, typeSection) => {
    const box = boxInfoBasic(information, section, typeSection);

    if (box && information && !information.hideTitle) {
        return {
            ...box,
            parameters: {
                title: information.title || '',
                url: information.url
            }
        };
    }
    return box;
};

export default boxInfoCompleteV2;
