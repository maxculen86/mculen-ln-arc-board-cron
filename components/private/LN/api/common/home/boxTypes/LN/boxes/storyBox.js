import { storyBox as storyCommon } from '../../common/storyBox';

export const storyBox = (lement, featureInfo, articleFn, paramsFromPage) => {
    return storyCommon(lement, featureInfo, articleFn, paramsFromPage);
};

export default storyBox;
