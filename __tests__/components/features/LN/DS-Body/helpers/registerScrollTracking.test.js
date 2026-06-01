import { registerScrollTrigger } from '../../../../../../components/features/LN-common/hooks/useScrollDispatcher';
import { addEventToDataLayerV2 } from '../../../../../../components/private/LN/common/utils/addEventToDataLayer';
import registerScrollTracking from '../../../../../../components/features/LN/DS-Body/helpers/registerScrollTracking';

jest.mock(
    '../../../../../../components/features/LN-common/hooks/useScrollDispatcher',
    () => ({
        registerScrollTrigger: jest.fn()
    })
);

jest.mock(
    '../../../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({
        addEventToDataLayerV2: jest.fn()
    })
);

describe('registerScrollTracking', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('adds ARC note ID to the scroll tracking event payload', () => {
        const noteId = 'MDF2WYHSG5AJTLA2VNKUB53HSU';

        registerScrollTracking(noteId);

        const { callback } = registerScrollTrigger.mock.calls[0][0];
        callback(25);

        expect(addEventToDataLayerV2).toHaveBeenCalledWith({
            event: 'scroll_tracking_nota',
            contentType: 'nota',
            rest: {
                scroll_percent: 25,
                nota_ID_Arc: noteId
            }
        });
    });

    it('keeps the scroll tracking payload valid when note ID is missing', () => {
        registerScrollTracking();

        const { callback } = registerScrollTrigger.mock.calls[0][0];
        callback(50);

        expect(addEventToDataLayerV2).toHaveBeenCalledWith({
            event: 'scroll_tracking_nota',
            contentType: 'nota',
            rest: {
                scroll_percent: 50
            }
        });
    });
});
