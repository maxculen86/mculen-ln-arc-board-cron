import pageBuilderValidator from '../../../../../components/private/common/utils/pageBuilderValidator';

describe('Private - Common - Utils - pageBuilderValidator', () => {
    const globalMock = [
        {
            validation: false,
            message: 'Debe especificar una fuente de notas'
        },
        {
            validation: false,
            message: 'Debe especificar un tag, seccíon o id de collection'
        },
        {
            validation: false,
            message: 'No se encontraron notas'
        }
    ];

    it('returns null when all validations are false', () => {
        const result = pageBuilderValidator(globalMock);
        expect(result).toBeNull();
    });

    it('returns object with a message and type when there are errors', () => {
        const props = [
            ...globalMock,
            {
                validation: true,
                message: 'Error message test'
            }
        ];

        const result = pageBuilderValidator(props);

        expect(result.hasOwnProperty('message')).toBeTruthy();
        expect(result.hasOwnProperty('type')).toBeTruthy();
        expect(result).toEqual({
            type: 'warning',
            message: props[props.length - 1].message
        });
    });
});
