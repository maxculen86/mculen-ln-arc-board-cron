import get from '../../../common/utils/get';

const pageBuilderValidator = ({ rules }) => {
    const message = get(
        rules.find(({ validation }) => validation),
        'message',
        null
    );
    return message && { type: 'warning', message };
};

export default pageBuilderValidator;
