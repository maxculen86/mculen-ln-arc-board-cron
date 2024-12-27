import Consumer from 'fusion:consumer';
import get from '../../../private/common/utils/get';
import GetOpinionCollection from '../../../private/LN/api/global/components/features/opinion/LN10/getOpinionCollection';
import { validateFeatureOpinion } from './_helper-WebApi';
import getViewabilityRoof from '../../../chains/utils/getViewabilityRoof';
class Opinion extends GetOpinionCollection {
    constructor(props) {
        super(props, null);
    }

    validate = (propsValidate, articlesOpinion, articlesEditorial) => {
        const {
            customFields: {
                idCollectionOpinion,
                idCollectionEditorial,
                layout = ''
            }
        } = propsValidate;

        return validateFeatureOpinion({
            idCollectionEditorial,
            idCollectionOpinion,
            articlesEditorial,
            articlesOpinion,
            layout
        });
    };

    render() {
        try {
            const {
                articleListOpinion,
                articleListEditorial,
                containerImageOpinion
            } = this.state || {};
            if (!articleListOpinion || !articleListEditorial) {
                return null;
            }
            const articlesOpinion = get(
                articleListOpinion,
                'content_elements',
                []
            );
            const articlesEditorial = get(
                articleListEditorial,
                'content_elements',
                []
            );

            //  Tomar en cuenta para Cajas BN Focal 1+4 o Canal Focal 1+4, si valida que sea n5 notas.
            const error = this.validate(
                this.props,
                articlesOpinion,
                articlesEditorial
            );
            if (error) {
                return null;
            }

            const { id: featureId, renderables = [], customFields: propsForRoof = {} } = this.props || {};

            const viewabilityRoof = getViewabilityRoof(
                featureId,
                renderables,
                propsForRoof
            );

            return this.renderResponse(
                { ...this.props, viewabilityRoof },
                articlesOpinion,
                articlesEditorial,
                containerImageOpinion
            );
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(Opinion);
