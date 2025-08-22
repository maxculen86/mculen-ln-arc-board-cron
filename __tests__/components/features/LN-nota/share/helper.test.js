import {
    handleOpenIAFeature,
    hasSticky,
    layoutBySubtype
} from '../../../../../components/features/LN-nota/share/_children/helper';
import {
    FOTOAL100,
    LIVEBLOG_EDITORIAL,
    NOTICIA,
    VIDEO
} from '../../../../../components/private/common/utils/subtypes/subtypeHelper';
import { addEventToDataLayerV2 } from '../../../../../components/private/LN/common/utils/addEventToDataLayer';

jest.mock(
    '../../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({
        addEventToDataLayerV2: jest.fn()
    })
);

describe('components - features - LN-nota - share - helper', () => {
    describe('handleOpenIAFeature', () => {
        let setIaButtonIsClicked;
        let iaButtonIsClicked;
        let publish;
        let subscribe;
        let unsubscribe;
        let openBarrier;

        beforeEach(() => {
            setIaButtonIsClicked = jest.fn();
            iaButtonIsClicked = false;
            publish = jest.fn();
            subscribe = jest.fn();
            unsubscribe = jest.fn();
            openBarrier = jest.fn();
            window.LN = {
                observable: {
                    publish,
                    subscribe,
                    unsubscribe
                }
            };

            Storage.prototype.setItem = jest.fn();
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        it('should display the AI component, publish an event with defaultTab, and set localStorage when subscribed', () => {
            const defaultTab = 'summary';
            const suscription = true;
            handleOpenIAFeature({
                defaultTab,
                iaButtonIsClicked,
                setIaButtonIsClicked,
                suscription,
                openBarrier
            });

            expect(addEventToDataLayerV2).toHaveBeenCalledWith({
                event: 'e_linkclick',
                action: 'IA',
                category: 'nota_ln9',
                label: defaultTab
            });

            expect(setIaButtonIsClicked).toHaveBeenCalledWith(true);

            expect(publish).toHaveBeenCalledWith('showIa', { show: true });
        });

        it('should call openBarrier when not subscribed', () => {
            const callback = jest.fn();
            const defaultTab = 'summary';
            const suscription = false;

            handleOpenIAFeature({
                defaultTab,
                iaButtonIsClicked,
                setIaButtonIsClicked,
                suscription,
                openBarrier,
                callback
            });

            expect(openBarrier).toHaveBeenCalled();
            expect(addEventToDataLayerV2).not.toHaveBeenCalled();
            expect(setIaButtonIsClicked).not.toHaveBeenCalled();
            expect(publish).not.toHaveBeenCalled();
            expect(callback).not.toHaveBeenCalled();
        });

        it('should not execute any actions if iaButtonIsClicked is true', () => {
            iaButtonIsClicked = true;
            const defaultTab = 'summary';
            const suscription = true;

            handleOpenIAFeature({
                defaultTab,
                iaButtonIsClicked,
                setIaButtonIsClicked,
                suscription,
                openBarrier
            });

            expect(addEventToDataLayerV2).not.toHaveBeenCalled();
            expect(setIaButtonIsClicked).not.toHaveBeenCalled();
            expect(publish).not.toHaveBeenCalled();
            expect(openBarrier).not.toHaveBeenCalled();
        });
    });

    describe('layoutBySubtype', () => {
        it('should return the correct layout for each subtype', () => {
            expect(layoutBySubtype[FOTOAL100]).toBe('fotoAl100');
            expect(layoutBySubtype[VIDEO]).toBe('video');
            expect(layoutBySubtype[LIVEBLOG_EDITORIAL]).toBe(
                'liveblogEditorial'
            );
            expect(layoutBySubtype[NOTICIA]).toBeUndefined();
        });

        it('should not return sticky for FOTOAL100', () => {
            expect(hasSticky(FOTOAL100)).toBe(false);
        });
        it('should not return sticky for VIDEO', () => {
            expect(hasSticky(VIDEO)).toBe(false);
        });
        it('should not return sticky for LIVEBLOG_EDITORIAL', () => {
            expect(hasSticky(LIVEBLOG_EDITORIAL)).toBe(false);
        });

        it('should return sticky for other subtype', () => {
            expect(hasSticky(NOTICIA)).toBe(true);
        });
    });
});
