import { renderHook } from '@testing-library/react';
import { useContent } from 'fusion:content';
import { checkForId } from '../../../../../../components/features/LN-10/article/common/_helper-WebApi';
import { getImageSettings } from '../../../../../../components/features/LN/DS-CardPromo/_helpers';
import {
    getShortestImage,
    getImagesToLoadWithPicture
} from '../../../../../../components/private/LN/common/utils/mediaHelper';
import get from '../../../../../../components/private/common/utils/get';
import useGetImage from '../../../../../../components/features/LN/DS-CardPromo/hooks/useGetImage';

jest.mock(
    '../../../../../../components/features/LN-10/article/common/_helper-WebApi',
    () => ({ checkForId: jest.fn() })
);

jest.mock(
    '../../../../../../components/features/LN/DS-CardPromo/_helpers',
    () => ({ getImageSettings: jest.fn() })
);

jest.mock(
    '../../../../../../components/private/LN/common/utils/mediaHelper',
    () => ({
        getShortestImage: jest.fn(),
        getImagesToLoadWithPicture: jest.fn()
    })
);

jest.mock('../../../../../../components/private/common/utils/get', () =>
    jest.fn()
);

describe('useGetImage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        getImageSettings.mockReturnValue('cardPromoDefault');
        get.mockReturnValue([]);
        getShortestImage.mockReturnValue(null);
        getImagesToLoadWithPicture.mockReturnValue([]);
        useContent.mockReturnValue(null);
    });

    describe('when imageId is valid', () => {
        it('should call useContent with relatedImageSource when checkForId returns true', () => {
            checkForId.mockReturnValue(true);

            renderHook(() =>
                useGetImage({
                    imageId: 'abc123',
                    isFirstCard: false,
                    parentLayout: ''
                })
            );

            expect(useContent).toHaveBeenCalledWith(
                expect.objectContaining({ source: 'relatedImageSource' })
            );
        });

        it('should pass imageId and imageConfig in the query', () => {
            checkForId.mockReturnValue(true);
            getImageSettings.mockReturnValue('cardPromoT1');

            renderHook(() =>
                useGetImage({
                    imageId: 'abc123',
                    isFirstCard: true,
                    parentLayout: 'oneLargeFourSmall'
                })
            );

            expect(useContent).toHaveBeenCalledWith(
                expect.objectContaining({
                    query: expect.objectContaining({
                        id: 'abc123',
                        imageConfig: 'cardPromoT1'
                    })
                })
            );
        });
    });

    describe('when imageId is invalid', () => {
        it('should call useContent with null source when checkForId returns false', () => {
            checkForId.mockReturnValue(false);

            renderHook(() =>
                useGetImage({
                    imageId: '',
                    isFirstCard: false,
                    parentLayout: ''
                })
            );

            expect(useContent).toHaveBeenCalledWith(
                expect.objectContaining({ source: null })
            );
        });
    });

    describe('return values', () => {
        it('should return empty resizedUrl and empty sources when useContent returns null', () => {
            checkForId.mockReturnValue(false);
            useContent.mockReturnValue(null);
            get.mockReturnValue([]);
            getShortestImage.mockReturnValue(null);
            getImagesToLoadWithPicture.mockReturnValue([]);

            const { result } = renderHook(() =>
                useGetImage({
                    imageId: '',
                    isFirstCard: false,
                    parentLayout: ''
                })
            );

            expect(result.current.resizedUrl).toBe('');
            expect(result.current.sources).toEqual([]);
        });

        it('should return resizedUrl from getShortestImage result', () => {
            checkForId.mockReturnValue(true);
            useContent.mockReturnValue({ promo_items: {} });
            get.mockReturnValue(['url1', 'url2']);
            getShortestImage.mockReturnValue({
                resizedUrl: 'https://img.example.com/photo.jpg'
            });
            getImagesToLoadWithPicture.mockReturnValue([]);

            const { result } = renderHook(() =>
                useGetImage({
                    imageId: 'valid-id',
                    isFirstCard: false,
                    parentLayout: ''
                })
            );

            expect(result.current.resizedUrl).toBe(
                'https://img.example.com/photo.jpg'
            );
        });

        it('should return sources from getImagesToLoadWithPicture', () => {
            const mockSources = [
                { srcSet: 'url 1x', media: '(min-width: 600px)' }
            ];
            checkForId.mockReturnValue(true);
            useContent.mockReturnValue({});
            get.mockReturnValue([]);
            getShortestImage.mockReturnValue(null);
            getImagesToLoadWithPicture.mockReturnValue(mockSources);

            const { result } = renderHook(() =>
                useGetImage({
                    imageId: 'valid-id',
                    isFirstCard: false,
                    parentLayout: ''
                })
            );

            expect(result.current.sources).toEqual(mockSources);
        });

        it('should return empty resizedUrl when getShortestImage returns null', () => {
            checkForId.mockReturnValue(true);
            useContent.mockReturnValue({});
            get.mockReturnValue([]);
            getShortestImage.mockReturnValue(null);

            const { result } = renderHook(() =>
                useGetImage({
                    imageId: 'valid-id',
                    isFirstCard: false,
                    parentLayout: ''
                })
            );

            expect(result.current.resizedUrl).toBe('');
        });

        it('should call getImagesToLoadWithPicture with false as first argument', () => {
            checkForId.mockReturnValue(true);
            useContent.mockReturnValue({});
            get.mockReturnValue(['url1']);
            getShortestImage.mockReturnValue(null);
            getImagesToLoadWithPicture.mockReturnValue([]);

            renderHook(() =>
                useGetImage({
                    imageId: 'valid-id',
                    isFirstCard: false,
                    parentLayout: ''
                })
            );

            expect(getImagesToLoadWithPicture).toHaveBeenCalledWith(
                false,
                expect.anything()
            );
        });
    });

    describe('getImageSettings integration', () => {
        it('should call getImageSettings with isFirstCard and parentLayout as diagramation', () => {
            checkForId.mockReturnValue(true);
            useContent.mockReturnValue({});

            renderHook(() =>
                useGetImage({
                    imageId: 'abc',
                    isFirstCard: true,
                    parentLayout: 'oneLargeFourSmall'
                })
            );

            expect(getImageSettings).toHaveBeenCalledWith({
                isFirstCard: true,
                diagramation: 'oneLargeFourSmall'
            });
        });
    });
});
