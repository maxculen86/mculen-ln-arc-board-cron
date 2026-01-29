import {
    filterByAuthor,
    getPropsBuilder,
    getPropsBuilderFromContentElements
} from '../../../../private/common/utils/firmaHelper';
import { compose } from '../../../../private/common/utils/functional';
import get from '../../../../private/common/utils/get';

export const useSignature = ({
    creditsBy,
    position = 'Bottom',
    contentElements = []
}) => {
    const hasCredits = creditsBy?.length > 0;

    const propsBuilder = hasCredits
        ? getPropsBuilder(position)
        : getPropsBuilderFromContentElements(position);

    const {
        photo,
        medio,
        authors = []
    } = hasCredits
        ? compose(propsBuilder, filterByAuthor)(creditsBy)
        : compose(propsBuilder)(contentElements);

    const dataAuthor = get(creditsBy, '[0].additional_properties.original', {});

    return { photo, medio, authors, dataAuthor };
};
