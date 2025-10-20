import { transformUrl } from '../../../../../../../../features/LN-10/article/common/_helper';

export const renderProps = (
    articleSourceNota,
    articleImage,
    articleVideo,
    propsParam
) => {
    const props = propsParam;
    if (!articleSourceNota) {
        return null;
    }
    if (!props || !props.customFields) {
        return null;
    }

    const showVideoLoop = articleSourceNota.isVideoLoopEnabled

    const {
        noteId,
        title,
        authors,
        lead,
        chapita,
        opinion,
        html,
        variant,
        chapitaStyle,
        description,
        hideDescription,
        cllBoard
    } = props.customFields;
    const additionalProperties = {
        noteId,
        title,
        authors,
        lead,
        chapita,
        opinion,
        image: articleImage || null,
        video: articleVideo || null,
        html,
        variant,
        chapitaStyle,
        description,
        hideDescription,
        cllBoard: transformUrl(cllBoard) || null,
        idRender: props.id,//  Se usa en un metodo compartido con front para validar articulos de apertura
        showVideoLoop
    };


    return { ...articleSourceNota, additionalProperties };
};
export default renderProps;
