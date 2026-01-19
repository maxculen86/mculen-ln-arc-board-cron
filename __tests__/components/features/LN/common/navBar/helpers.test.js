import {
    getEventData,
    getNavbarItems
} from '../../../../../../components/features/LN/common/navBar/helpers';
import { drawerManager } from '@ln/ds-common-drawer';
import { addEventToDataLayerV2 } from '../../../../../../components/private/LN/common/utils/addEventToDataLayer';

jest.mock('@ln/ds-common-drawer', () => ({
    drawerManager: {
        show: jest.fn()
    }
}));

jest.mock(
    '../../../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({
        addEventToDataLayerV2: jest.fn()
    })
);

jest.mock('fusion:environment', () => ({
    SITE_LANACION: 'https://www.lanacion.com.ar',
    MY_ACCOUNT_URL: 'https://suscripciones.lanacion.com.ar/micuenta',
    SITE_FOODIT: 'https://www.foodit.com.ar'
}));

describe('components - features - LN - common - navBar - helpers', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getEventData', () => {
        it('returns correct event data structure', () => {
            const result = getEventData('test_label');

            expect(result).toEqual({
                event: 'e_linkclick',
                action: 'navbar',
                category: 'home_ln10',
                label: 'test_label'
            });
        });

        it('returns event data for different labels', () => {
            const labels = [
                'inicio',
                'secciones',
                'foodit',
                'club_la_nacion',
                'perfil'
            ];

            labels.forEach(label => {
                const result = getEventData(label);
                expect(result.label).toBe(label);
                expect(result.event).toBe('e_linkclick');
                expect(result.action).toBe('navbar');
                expect(result.category).toBe('home_ln10');
            });
        });
    });

    describe('getNavbarItems', () => {
        it('returns array with 5 navbar items', () => {
            const items = getNavbarItems({ userType: 'subscribed' });
            expect(items).toHaveLength(5);
        });

        it('returns correct structure for each item', () => {
            const items = getNavbarItems({ userType: 'subscribed' });

            items.forEach(item => {
                expect(item).toHaveProperty('text');
                expect(item).toHaveProperty('iconName');
                expect(item.onClick).toBeInstanceOf(Function);
            });
        });

        describe('Inicio item', () => {
            it('has correct properties', () => {
                const items = getNavbarItems({ userType: 'subscribed' });
                const inicioItem = items[0];

                expect(inicioItem.text).toBe('Inicio');
                expect(inicioItem.iconName).toBe('home');
                expect(inicioItem.href).toBe('https://www.lanacion.com.ar/');
            });

            it('triggers correct event on click', () => {
                const items = getNavbarItems({ userType: 'subscribed' });
                const inicioItem = items[0];

                inicioItem.onClick();

                expect(addEventToDataLayerV2).toHaveBeenCalledWith({
                    event: 'e_linkclick',
                    action: 'navbar',
                    category: 'home_ln10',
                    label: 'inicio'
                });
            });
        });

        describe('Secciones item', () => {
            it('has correct properties', () => {
                const items = getNavbarItems({ userType: 'subscribed' });
                const seccionesItem = items[1];

                expect(seccionesItem.text).toBe('Secciones');
                expect(seccionesItem.iconName).toBe('fuction');
                expect(seccionesItem.href).toBeUndefined();
            });

            it('opens drawer and triggers event on click', () => {
                const items = getNavbarItems({ userType: 'subscribed' });
                const seccionesItem = items[1];

                seccionesItem.onClick();

                expect(drawerManager.show).toHaveBeenCalledWith(
                    'drawer-sections'
                );
                expect(addEventToDataLayerV2).toHaveBeenCalledWith({
                    event: 'e_linkclick',
                    action: 'navbar',
                    category: 'home_ln10',
                    label: 'secciones'
                });
            });
        });

        describe('Foodit item', () => {
            it('has correct properties', () => {
                const items = getNavbarItems({ userType: 'subscribed' });
                const fooditItem = items[2];

                expect(fooditItem.text).toBe('Foodit');
                expect(fooditItem.iconName).toBe('logo-foodit');
                expect(fooditItem.href).toBe('https://www.foodit.com.ar/');
            });

            it('triggers correct event on click', () => {
                const items = getNavbarItems({ userType: 'subscribed' });
                const fooditItem = items[2];

                fooditItem.onClick();

                expect(addEventToDataLayerV2).toHaveBeenCalledWith({
                    event: 'e_linkclick',
                    action: 'navbar',
                    category: 'home_ln10',
                    label: 'foodit'
                });
            });
        });

        describe('Club LN item', () => {
            it('has correct properties', () => {
                const items = getNavbarItems({ userType: 'subscribed' });
                const clubItem = items[3];

                expect(clubItem.text).toBe('Club LN');
                expect(clubItem.iconName).toBe('logo-club');
                expect(clubItem.href).toBe('https://club.lanacion.com.ar/');
            });

            it('triggers correct event on click', () => {
                const items = getNavbarItems({ userType: 'subscribed' });
                const clubItem = items[3];

                clubItem.onClick();

                expect(addEventToDataLayerV2).toHaveBeenCalledWith({
                    event: 'e_linkclick',
                    action: 'navbar',
                    category: 'home_ln10',
                    label: 'club_la_nacion'
                });
            });
        });

        describe('User account item', () => {
            it('shows "Mi cuenta" for subscribed users', () => {
                const items = getNavbarItems({ userType: 'subscribed' });
                const accountItem = items[4];

                expect(accountItem.text).toBe('Mi cuenta');
                expect(accountItem.iconName).toBe('user');
                expect(accountItem.href).toBe(
                    'https://suscripciones.lanacion.com.ar/micuenta/'
                );
            });

            it('shows "Ingresar" for unlogged users', () => {
                const items = getNavbarItems({ userType: 'unlogged' });
                const accountItem = items[4];

                expect(accountItem.text).toBe('Ingresar');
                expect(accountItem.iconName).toBe('user');
            });

            it('shows "Mi cuenta" for logged users', () => {
                const items = getNavbarItems({ userType: 'logged' });
                const accountItem = items[4];

                expect(accountItem.text).toBe('Mi cuenta');
            });

            it('triggers correct event on click', () => {
                const items = getNavbarItems({ userType: 'subscribed' });
                const accountItem = items[4];

                accountItem.onClick();

                expect(addEventToDataLayerV2).toHaveBeenCalledWith({
                    event: 'e_linkclick',
                    action: 'navbar',
                    category: 'home_ln10',
                    label: 'perfil'
                });
            });
        });

        describe('Event tracking for all items', () => {
            it('all items trigger events when clicked', () => {
                const items = getNavbarItems({ userType: 'subscribed' });

                items.forEach(item => {
                    addEventToDataLayerV2.mockClear();
                    item.onClick();
                    expect(addEventToDataLayerV2).toHaveBeenCalledTimes(1);
                });
            });

            it('events have correct structure', () => {
                const items = getNavbarItems({ userType: 'subscribed' });
                const expectedLabels = [
                    'inicio',
                    'secciones',
                    'foodit',
                    'club_la_nacion',
                    'perfil'
                ];

                items.forEach((item, index) => {
                    addEventToDataLayerV2.mockClear();
                    item.onClick();

                    expect(addEventToDataLayerV2).toHaveBeenCalledWith({
                        event: 'e_linkclick',
                        action: 'navbar',
                        category: 'home_ln10',
                        label: expectedLabels[index]
                    });
                });
            });
        });

        describe('Constants validation', () => {
            it('uses correct DRAWERS_ID constant for sections', () => {
                const items = getNavbarItems({ userType: 'subscribed' });
                const seccionesItem = items[1];

                seccionesItem.onClick();

                expect(drawerManager.show).toHaveBeenCalledWith(
                    'drawer-sections'
                );
            });
        });
    });
});
