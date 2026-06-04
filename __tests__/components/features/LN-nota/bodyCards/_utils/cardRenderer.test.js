import { addEventToDataLayerV2 } from '../../../../../../components/private/LN/common/utils/addEventToDataLayer';
import { scrollCallback } from '../../../../../../components/features/LN-nota/bodyCards/_utils/cardRenderer';

jest.mock(
    '../../../../../../components/features/LN-nota/body/_children/_buildBody',
    () => jest.fn()
);

jest.mock(
    '../../../../../../components/features/LN-nota/bodyCards/components/linkedCard/LinkedCard',
    () => jest.fn()
);

jest.mock(
    '../../../../../../components/features/LN-nota/bodyCards/_utils/linkedSummaryCardsHelper',
    () => ({
        normalizeCardColor: jest.fn(value => value)
    })
);

jest.mock(
    '../../../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({
        addEventToDataLayerV2: jest.fn()
    })
);

describe('cardRenderer scrollCallback', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('adds ARC note ID to the scroll tracking event payload', () => {
        const noteId = 'MDF2WYHSG5AJTLA2VNKUB53HSU';

        scrollCallback(75, noteId);

        expect(addEventToDataLayerV2).toHaveBeenCalledWith({
            event: 'scroll_tracking_nota',
            contentType: 'nota',
            rest: {
                scroll_percent: 75,
                nota_ID_Arc: noteId
            }
        });
    });
});
