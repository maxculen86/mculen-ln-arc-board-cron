import get from '../../../../../../common/utils/get';

export const getVolanta = article => {
    return (
        get(article, 'label.volanta.text', null) ||
        get(article, 'additionalProperties.lead', null)
    );
};

export default getVolanta;
