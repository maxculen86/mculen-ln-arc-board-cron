import { getEditorConfig } from '../../_helper';
import { isInApertura, checkForId } from '../../common/_helper-WebApi';
import useAppData from '../../hooks/useAppData';
import useChainData from '../../hooks/useChainData';

const getInitialData = (featureId, customFields) => {
    const editorData = getEditorConfig(customFields);
    const appData = useAppData();
    const chainData = useChainData(featureId, appData.renderables);
    const articleId = checkForId(editorData.id);
    const onlyOneApeturaValidateForWWW = isInApertura({
        layoutPageBuilder: appData.layoutPageBuilder,
        renderables: appData.renderables,
        featureId,
        config: chainData.config,
        articlePosition: chainData.index
    });
    return {
        editorData,
        appData,
        chainData,
        articleId,
        onlyOneApeturaValidateForWWW
    };
};

export default getInitialData;
