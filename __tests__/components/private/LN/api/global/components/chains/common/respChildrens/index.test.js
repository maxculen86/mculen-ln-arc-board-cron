import respChain from '../../../../../../../../../../components/private/LN/api/global/components/chains/common/respChildrens/index';
describe('respChain', () => {
    it('should return an object with information and articles', () => {
        const props = {
            customFields: { foo: 'bar' },
            typeChain: 'apertura',
            version: '1.0'
        };
        const containerImage = 'https://example.com/image.jpg';
        const result = respChain(props, containerImage);

        expect(result).toMatchObject({
            information: {
                ...props.customFields,
                image: containerImage,
                typeChain: props.typeChain
            }
        });
    });
});
