import { validateChildrensApi } from '../../../../common/utils/_helpers';
import { setSlicedChildren } from '../../../../../../../../../chains/utils/common/_helpers-WebApi';

export const respChildrens = props => {
    const {
        children,
        customFields: { layout }
    } = props;

    if (!validateChildrensApi(children)) {
        return null;
    }
    const childrensOrdered = setSlicedChildren({
        children,
        config: { layout }
    }).sort((a, b) => {
        const aIsVideo = !!a.fullVideoUrl;
        const bIsVideo = !!b.fullVideoUrl;
        if (aIsVideo && !bIsVideo) return -1;
        if (!aIsVideo && bIsVideo) return 1;
        return 0;
    });

    const articles = childrensOrdered.slice(-3);
    const video = childrensOrdered[0];

    return {
        articles,
        video
    };
};

export default respChildrens;
