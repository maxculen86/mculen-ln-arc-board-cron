import get from '../../../../../../common/utils/get';

const deleteDefaultArticleLN10 = (props, configs) => {
    const newProps = props;
    if (get(props, 'customFields.hideAuthors', false)) {
        newProps.customFields.authors = null;
    }
    return newProps;
};
const deleteArticleLN10 = (props, configs) => {
    const newProps = deleteDefaultArticleLN10(props, configs);
    if (
        configs &&
        configs.layout &&
        customFieldsToDeleteByDiagramations[configs.layout] &&
        typeof customFieldsToDeleteByDiagramations[configs.layout] ===
            'object' &&
        configs.index >= 0
    ) {
        const position = 'T'.concat(Number(configs.index) + 1);
        const fieldsToDelete =
            customFieldsToDeleteByDiagramations[configs.layout][position];
        fieldsToDelete &&
            Array.isArray(fieldsToDelete) &&
            fieldsToDelete.forEach(field => {
                newProps.customFields[field] = null;
            });
    }
    return newProps;
};

const customFieldsToDeleteByDiagramations = {
    'center-focal': { T1: ['video'] }
};

const configDeletePropsByFeature = {
    'LN-10/article': deleteArticleLN10
};

export const validatePropsFeatures = (props, configs) => {
    if (!props) {
        throw new TypeError('The props missing in feature');
    }

    // Set properties by default

    const {
        // eslint-disable-next-line prefer-const
        template,
        // eslint-disable-next-line prefer-const
        metaValue,
        // eslint-disable-next-line prefer-const
        tree,
        // eslint-disable-next-line prefer-const
        globalContent,
        // eslint-disable-next-line prefer-const
        globalContentConfig,
        // eslint-disable-next-line prefer-const
        contextPath,
        // eslint-disable-next-line prefer-const
        deployment,

        // eslint-disable-next-line prefer-const
        displayProperties,
        ...newProps
    } = props;

    return configDeletePropsByFeature[props.type]
        ? configDeletePropsByFeature[props.type](props, configs)
        : newProps;
};

export default validatePropsFeatures;
