import get from '../../../../../../common/utils/get';

export const validatePropsFeatures = props => {
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
    return newProps;
};

export default validatePropsFeatures;
