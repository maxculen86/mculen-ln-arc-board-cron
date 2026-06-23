import {
    openIaSummary,
    closeIaSummary,
    hasIaFeature,
    isIaSummaryAvailable
} from '../../../../../../components/features/LN/common/iaSummary/helpers';
import { iaSummaryStore } from '../../../../../../components/features/LN/common/iaSummary/store/iaSummaryStore';
import { addEventToDataLayerV2 } from '../../../../../../components/private/LN/common/utils/addEventToDataLayer';

jest.mock(
    '../../../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({
        addEventToDataLayerV2: jest.fn()
    })
);

describe('Components - features - LN - common - iaSummary - helpers', () => {
    const event = {
        event: 'e_linkclick',
        action: 'IA',
        category: 'nota_ln9',
        label: 'resumen_nota'
    };

    beforeEach(() => {
        jest.clearAllMocks();
        iaSummaryStore.close();
    });

    const closeEvent = {
        event: 'e_linkclick',
        action: 'IA',
        category: 'nota_ln9',
        label: 'cerrar_ia'
    };

    it('opens the store and fires the event when subscribed', () => {
        openIaSummary({ suscription: true, event });

        expect(iaSummaryStore.getSnapshot()).toEqual({
            isOpen: true,
            closeEvent: null
        });
        expect(addEventToDataLayerV2).toHaveBeenCalledWith(event);
    });

    it('registers the closeEvent in the store when opening', () => {
        openIaSummary({ suscription: true, event, closeEvent });

        expect(iaSummaryStore.getSnapshot().closeEvent).toEqual(closeEvent);
    });

    it('calls openBarrier and does not open when not subscribed', () => {
        const openBarrier = jest.fn();

        openIaSummary({ suscription: false, openBarrier, event });

        expect(openBarrier).toHaveBeenCalledTimes(1);
        expect(iaSummaryStore.getSnapshot().isOpen).toBe(false);
        expect(addEventToDataLayerV2).not.toHaveBeenCalled();
    });

    it('does not throw when openBarrier is undefined and not subscribed', () => {
        expect(() => openIaSummary({ suscription: false })).not.toThrow();
    });

    it('does not fire any event when none is provided', () => {
        openIaSummary({ suscription: true });

        expect(addEventToDataLayerV2).not.toHaveBeenCalled();
    });

    describe('closeIaSummary', () => {
        it('closes the store and fires the registered closeEvent', () => {
            openIaSummary({ suscription: true, event, closeEvent });
            jest.clearAllMocks();

            closeIaSummary();

            expect(iaSummaryStore.getSnapshot().isOpen).toBe(false);
            expect(addEventToDataLayerV2).toHaveBeenCalledWith(closeEvent);
        });

        it('closes without firing when no closeEvent was registered', () => {
            openIaSummary({ suscription: true, event });
            jest.clearAllMocks();

            closeIaSummary();

            expect(iaSummaryStore.getSnapshot().isOpen).toBe(false);
            expect(addEventToDataLayerV2).not.toHaveBeenCalled();
        });
    });
});

describe('Components - features - LN - common - iaSummary - hasIaFeature', () => {
    it('returns true when the LN-10/IA feature is a top-level renderable', () => {
        expect(
            hasIaFeature([{ collection: 'features', type: 'LN-10/IA' }])
        ).toBe(true);
    });

    it('returns true when the LN-10/IA feature is nested inside a section', () => {
        const renderables = [
            {
                collection: 'sections',
                type: 'LN10_Section',
                children: [{ collection: 'features', type: 'LN-10/IA' }]
            }
        ];

        expect(hasIaFeature(renderables)).toBe(true);
    });

    it('returns false when there is no LN-10/IA feature', () => {
        expect(
            hasIaFeature([{ collection: 'features', type: 'LN-10/Other' }])
        ).toBe(false);
    });

    it('returns false when the type matches but the collection does not', () => {
        expect(hasIaFeature([{ collection: 'chains', type: 'LN-10/IA' }])).toBe(
            false
        );
    });

    it('returns false for an empty array', () => {
        expect(hasIaFeature([])).toBe(false);
    });
});

describe('Components - features - LN - common - iaSummary - isIaSummaryAvailable', () => {
    const renderables = [{ collection: 'features', type: 'LN-10/IA' }];

    it('returns true when the feature exists, there is data and termica is on', () => {
        expect(
            isIaSummaryAvailable({
                renderables,
                summaryData: ['a'],
                isThermalSummaryEnabled: true
            })
        ).toBe(true);
    });

    it('returns false when the LN-10/IA feature is not present', () => {
        expect(
            isIaSummaryAvailable({
                renderables: [],
                summaryData: ['a'],
                isThermalSummaryEnabled: true
            })
        ).toBe(false);
    });

    it('returns false when there is no summary data', () => {
        expect(
            isIaSummaryAvailable({
                renderables,
                summaryData: [],
                isThermalSummaryEnabled: true
            })
        ).toBe(false);
    });

    it('returns false when the termica is disabled', () => {
        expect(
            isIaSummaryAvailable({
                renderables,
                summaryData: ['a'],
                isThermalSummaryEnabled: undefined
            })
        ).toBe(false);
    });

    it('returns false when called without arguments', () => {
        expect(isIaSummaryAvailable()).toBe(false);
    });
});
