import { renderHook } from '@testing-library/react';
import get from '../../../../../../components/private/common/utils/get';
import { useSignature } from '../../../../../../components/features/LN/DS-Signature/hooks/useSignature';
import {
    filterByAuthor,
    getPropsBuilder,
    getPropsBuilderFromContentElements
} from '../../../../../../components/private/common/utils/firmaHelper';

jest.mock(
    '../../../../../../components/private/common/utils/firmaHelper',
    () => ({
        filterByAuthor: jest.fn(),
        getPropsBuilder: jest.fn(),
        getPropsBuilderFromContentElements: jest.fn()
    })
);

jest.mock('../../../../../../components/private/common/utils/get', () =>
    jest.fn()
);

describe('components - feature - LN-nota - signature - hook - useSignature', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should use creditsBy and call getPropsBuilder and filterByAuthor when creditsBy is available', () => {
        const creditsBy = [
            {
                _id: 'guillermo-idiart-111',
                additional_properties: {
                    original: {
                        author_type: 'Estándar',
                        bio_page: '/autor/guillermo-idiart-111/',
                        byline: 'Guillermo Idiart',
                        image: 'https://www.lanacion.com.ar/resizer/v2/https%3A%2F%2Fs3.amazonaws.com%2Farc-authors%2Flanacionar%2Ff587ae13-9ebe-4e83-8d8d-c98ec56b81e7.png?auth=4bd3f8127b6117a5c73c5289021b15aba8fa6a018f5c92ce1476fdaf1cd22588&width=80&quality=70&smart=false',
                        role: 'LA NACION'
                    }
                },
                name: 'Guillermo Idiart',
                type: 'author',
                url: '/autor/guillermo-idiart-111/'
            }
        ];
        const position = 'Top';
        const contentElements = [{}];

        const mockPropsBuilder = jest.fn().mockReturnValue({
            photo: 'https://www.lanacion.com.ar/resizer/v2/https%3A%2F%2Fs3.amazonaws.com%2Farc-authors%2Flanacionar%2Ff587ae13-9ebe-4e83-8d8d-c98ec56b81e7.png?auth=4bd3f8127b6117a5c73c5289021b15aba8fa6a018f5c92ce1476fdaf1cd22588&width=80&quality=70&smart=false',
            medio: 'LA NACION',
            authors: ['Guillermo Idiart']
        });

        getPropsBuilder.mockReturnValue(mockPropsBuilder);
        filterByAuthor.mockImplementation(authors => authors);
        get.mockReturnValue('Guillermo Idiart');

        const { result } = renderHook(() =>
            useSignature({ creditsBy, position, contentElements })
        );

        expect(getPropsBuilder).toHaveBeenCalledWith(position);
        expect(filterByAuthor).toHaveBeenCalledWith(creditsBy);
        expect(get).toHaveBeenCalledWith(
            creditsBy,
            '[0].additional_properties.original',
            {}
        );
        expect(result.current).toEqual({
            photo: 'https://www.lanacion.com.ar/resizer/v2/https%3A%2F%2Fs3.amazonaws.com%2Farc-authors%2Flanacionar%2Ff587ae13-9ebe-4e83-8d8d-c98ec56b81e7.png?auth=4bd3f8127b6117a5c73c5289021b15aba8fa6a018f5c92ce1476fdaf1cd22588&width=80&quality=70&smart=false',
            medio: 'LA NACION',
            authors: ['Guillermo Idiart'],
            dataAuthor: 'Guillermo Idiart'
        });
    });

    it('should use contentElements and call getPropsBuilderFromContentElements when creditsBy is not available', () => {
        const creditsBy = [];
        const position = 'Top';
        const contentElements = [
            {
                additional_properties: {}
            }
        ];

        const mockPropsBuilder = jest.fn().mockReturnValue({
            photo: null,
            medio: null,
            authors: []
        });

        getPropsBuilderFromContentElements.mockReturnValue(mockPropsBuilder);
        get.mockReturnValue({});

        const { result } = renderHook(() =>
            useSignature({ creditsBy, position, contentElements })
        );

        expect(getPropsBuilderFromContentElements).toHaveBeenCalledWith(
            position
        );
        expect(get).toHaveBeenCalledWith(
            creditsBy,
            '[0].additional_properties.original',
            {}
        );
        expect(result.current).toEqual({
            photo: null,
            medio: null,
            authors: [],
            dataAuthor: {}
        });
    });
});
