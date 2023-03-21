import Consumer from 'fusion:consumer';
import get from '../../../private/common/utils/get';
import GetOpinionCollection from '../../../private/LN/api/global/components/features/opinion/LN10/getOpinionCollection';
import { validateFeatureOpinion } from './_helper-WebApi';

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

        const error = validateFeatureOpinion({
            idCollectionEditorial,
            idCollectionOpinion,
            articlesEditorial,
            articlesOpinion,
            layout
        });

        return error;
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
            return this.renderResponse(
                this.props,
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
