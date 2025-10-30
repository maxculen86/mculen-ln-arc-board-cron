import { useContent } from 'fusion:content';
import filter from '../../../../../content/filters/LN/home/LN10/articleHomeBaseFilter';
import liveblogFilter from '../../../../../content/filters/LN/home/LN10/liveblogFilter';
import isSSR from '../../../../private/LN/common/utils/isSSR';
import get from '../../../../private/common/utils/get';

const useContentData = (
    articleId,
    editorData,
    chainData,
    appData,
    onlyOneApeturaValidateForWWW
) =>
    useContent({
        source: articleId ? 'lnHomeBaseArticleSource' : null,
        query: {
            id: articleId,
            published: true,
            imageConfig: get(chainData, 'imageConfig', ''),
            checkExclusiveAccess: false,
            isInApertura: onlyOneApeturaValidateForWWW,
            isAdmin: get(appData, 'isAdmin', false),
            variant: get(editorData, 'variant', 'regular'),
            isLiveblog: get(editorData, 'variant', 'regular') === 'liveblog'
        },
        staticMode: isSSR() && !get(chainData, 'hasVariants', false),
        filter:
            get(editorData, 'variant', 'regular') === 'liveblog'
                ? liveblogFilter
                : filter
    });

export default useContentData;
