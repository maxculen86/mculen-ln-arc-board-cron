import get from '../../../../../../common/utils/get';
import { CardWebStory } from './cardWebStory/index';

const articleComponents = {
    webstories: CardWebStory
};

// TODO: Analizar si en este paso es mejor colocar las propiedades del design segun el archivo de configuracion: /layouts/config/api-diagramations/LN10-Home_Main.json
export const ExternalArticle = article => {
    const tipo =
        get(article, 'additionalProperties.variant', 'webstories') ||
        'webstories';

    const Component = articleComponents[tipo];
    return {
        design: {
            typeCard: tipo
        },
        ...Component(article)
    };
};
export default ExternalArticle;
