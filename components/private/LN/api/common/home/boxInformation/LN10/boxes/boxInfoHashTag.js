import get from '../../../../../../../common/utils/get';
import { boxInfoBasic } from '../../common/boxBasic';

export const boxInfoHashTag = (information, section, typeSection) => {
    const box = boxInfoBasic(information, section, typeSection);
    const title =
        information &&
        !information.hideTitle &&
        information.title &&
        get(information, 'title', '').trim().length > 0
            ? information.title
            : null;
    if (box && information) {
        return {
            ...box,
            tituloCaja: (title || 'Hashtag').toUpperCase(),
            parameters: {
                title: (title || 'Hashtag').toUpperCase()
            }
        };
    }
    return box;
};

export default boxInfoHashTag;
