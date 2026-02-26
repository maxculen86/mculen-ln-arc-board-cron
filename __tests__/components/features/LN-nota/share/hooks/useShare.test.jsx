import { renderHook, act } from '@testing-library/react';
import useShare from '../../../../../../components/features/LN-nota/share/hooks/useShare';
import { getTwitterTitle } from '../../../../../../components/private/LN/common/utils/shareHelper';

jest.mock(
    '../../../../../../components/private/LN/common/utils/shareHelper',
    () => ({
        getTwitterTitle: jest.fn()
    })
);

describe('Components - Features - LN-nota - share - hooks - useShare', () => {
    const mockMobileTitle =
        'La marcha por los jubilados aglutinó a la oposición y esta vez no hubo enfrentamientos con la Policía';
    const mockBasic =
        'La marcha por los jubilados aglutinó a la oposición y esta vez no hubo enfrentamientos con la Policía';
    const mockHost = 'https://www.lanacion.com.ar';
    const mockRequestUri =
        'politica/la-marcha-de-los-jubilados-aglutino-a-la-oposicion-y-esta-vez-no-hubo-enfrentamientos-con-la-policia-nid19032025/';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return shareNativeTrigger function', () => {
        const { result } = renderHook(() =>
            useShare({
                mobileTitle: mockMobileTitle,
                basic: mockBasic,
                host: mockHost,
                requestUri: mockRequestUri
            })
        );

        expect(typeof result.current.shareButton).toBe('function');
    });

    it('should call navigator.share with correct data when shareNativeTrigger is executed', () => {
        const mockShare = jest.fn();
        global.navigator.share = mockShare;
        global.navigator.canShare = jest.fn(() => true);

        getTwitterTitle.mockReturnValue(
            'La marcha por los jubilados aglutinó a la oposición y esta vez no hubo enfrentamientos con la Policía'
        );

        const { result } = renderHook(() =>
            useShare({
                mobileTitle: mockMobileTitle,
                basic: mockBasic,
                host: mockHost,
                requestUri: mockRequestUri
            })
        );

        act(() => {
            result.current.shareButton();
        });

        expect(getTwitterTitle).toHaveBeenCalledWith(
            mockMobileTitle,
            mockBasic
        );
        expect(mockShare).toHaveBeenCalledWith({
            title: 'La marcha por los jubilados aglutinó a la oposición y esta vez no hubo enfrentamientos con la Policía',
            text: 'La marcha por los jubilados aglutinó a la oposición y esta vez no hubo enfrentamientos con la Policía',
            url: 'https://www.lanacion.com.arpolitica/la-marcha-de-los-jubilados-aglutino-a-la-oposicion-y-esta-vez-no-hubo-enfrentamientos-con-la-policia-nid19032025/'
        });
    });

    it('should not call navigator.share if canShare is not available when shareNativeTrigger is executed', () => {
        const mockShare = jest.fn();
        global.navigator.share = mockShare;
        global.navigator.canShare = undefined;

        getTwitterTitle.mockReturnValue(
            'La marcha por los jubilados aglutinó a la oposición y esta vez no hubo enfrentamientos con la Policía'
        );

        const { result } = renderHook(() =>
            useShare({
                mobileTitle: mockMobileTitle,
                basic: mockBasic,
                host: mockHost,
                requestUri: mockRequestUri
            })
        );

        act(() => {
            result.current.shareButton();
        });

        expect(getTwitterTitle).toHaveBeenCalledWith(
            mockMobileTitle,
            mockBasic
        );
        expect(mockShare).not.toHaveBeenCalled();
    });
});
