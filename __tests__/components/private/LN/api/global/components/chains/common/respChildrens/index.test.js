jest.mock(
    '../../../../../../../../../../components/private/LN/api/global/components/chains/config/configReponseByTypeChain.js',
    () => ({
        respChildrens: {
            bnPlayer: jest.fn(),
            apertura: jest.fn(),
            LN: jest.fn()
        }
    })
);

import { respChildrens } from '../../../../../../../../../../components/private/LN/api/global/components/chains/config/configReponseByTypeChain.js';

import respChain from '../../../../../../../../../../components/private/LN/api/global/components/chains/common/respChildrens/index.js';
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

    it('should use bnPlayer chain and spread responseChildren when layout is focal video vertical', () => {

        respChildrens.bnPlayer.mockReturnValue({
            title: 'mock title',
            children: ['a', 'b']
        });

        const props = {
            customFields: { layout: 'left-focal-video-vertical' },
            typeChain: 'apertura',
            version: '1.0'
        };

        const result = respChain(props, 'image.jpg');

        expect(respChildrens.bnPlayer).toHaveBeenCalledWith(props);

        expect(result.information).toMatchObject({
            layout: 'left-focal-video-vertical',
            image: 'image.jpg',
            typeChain: 'apertura'
        });

        expect(result.title).toBe('mock title');
        expect(result.children).toEqual(['a', 'b']);

        expect(result.responseChildren).toBeUndefined();
    });
});
