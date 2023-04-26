import configPropsByTypeChain from '../../../../../../../../../components/private/LN/api/global/components/chains/config/configPropsByTypeChain';

describe('configPropsByTypeChain', () => {
    const mockProps = {
        customFields: {
            idCollection: 'testID',
            initialPosition: 'testPosition',
            layout: 'testLayout'
        }
    };

    it('should return the modified props for hashtag type chain', () => {
        const expected = {
            ...mockProps,
            customFields: {
                hideCaja: false,
                hideTitle: true,
                idCollection: 'testID',
                initialPosition: 'testPosition',
                layout: 'testLayout'
            }
        };

        const result = configPropsByTypeChain.hashtag(mockProps);

        expect(result).toEqual(expected);
    });

    it('should return the same props for suscriptor type chain', () => {
        const result = configPropsByTypeChain.suscriptor(mockProps);

        expect(result).toEqual(mockProps);
    });
});
