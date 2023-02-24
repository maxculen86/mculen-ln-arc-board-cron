import get from '../../../../../../../../common/utils/get';
import { customFieldsRulesByDiagramations } from '../../configs/configPropsLN10';

const validateRules = (rules, props, configs) => {
    const newProps = props;
    const { customFields = {} } = newProps;
    const { variant = 'regular' } = customFields;

    rules.exclude &&
        Array.isArray(rules.exclude) &&
        rules.exclude.forEach(field => {
            newProps.customFields[field] = null;
        });

    rules.variants &&
        typeof rules.variants === 'object' &&
        rules.variants[variant] &&
        Array.isArray(rules.variants[variant].exclude) &&
        rules.variants[variant].exclude.forEach(field => {
            newProps.customFields[field] = null;
        });
    return newProps;
};

const validatePropsBasic = (props, configs) => {
    const newProps = props;
    if (get(props, 'customFields.hideAuthors', false)) {
        newProps.customFields.authors = null;
    }
    return newProps;
};
const validatePropsByConfig = (props, configs) => {
    const newProps = validatePropsBasic(props, configs);
    if (
        configs &&
        configs.layout &&
        customFieldsRulesByDiagramations[configs.layout] &&
        typeof customFieldsRulesByDiagramations[configs.layout] === 'object' &&
        configs.index >= 0
    ) {
        const position = 'T'.concat(Number(configs.index) + 1);
        const rules =
            customFieldsRulesByDiagramations[configs.layout][position];
        if (rules) {
            return validateRules(rules, props, configs);
        }
    }
    return newProps;
};

export const validateProps = (props, configs) => {
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

    return validatePropsByConfig(newProps, configs);
};

export default validateProps;
