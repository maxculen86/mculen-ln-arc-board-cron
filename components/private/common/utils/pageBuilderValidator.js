import get from './get';

const pageBuilderValidator = (rules, type = 'warning') => {
    const message = get(
        rules.find(({ validation }) => validation),
        'message',
        null
    );

    return message && { type, message };
};

export default pageBuilderValidator;
