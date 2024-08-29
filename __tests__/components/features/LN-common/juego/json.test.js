import * as fusionConsumer from 'fusion:consumer';
import * as Juegos from '../../../../../components/features/LN-common/juego/json';

jest.mock('fusion:consumer', component => {
    return function(component) {
        const newComponent = component;
        // Mock fetchContent
        newComponent.prototype.fetchContent = jest.fn();
        return newComponent;
    };
});

describe('components - features - LN-common - Juegos - json.js', () => {
    const props = {
        arcSite: 'la-nacion-ar',
        contextPath: '/pf',
        isAdmin: false,
        layout: 'LN10-Home_Main',
        outputType: 'json',
        requestUri: '/homepage-LN10/?_website=la-nacion-ar&outputType=json',
        siteProperties: {},
        key: 3,
        collection: 'features',
        type: 'LN-common/Juegos',
        id: 'f0fmW4FQNhmg6iz',
        name: null,
        customFields: {
            sectionId: '/juegos/crucigrama',
            subscriber: 'NO',
            isNewGame: 'SI'
        }
    };
    describe('Check props', () => {
        it('When articles load props Ok', () => {
            const objArticle = new Juegos.default(props);
            expect(objArticle.props).toMatchObject(props);
        });

        it('When props is OK ', () => {
            const objArticle = new Juegos.default(props);
            const result = objArticle.render();
            expect(result).toMatchObject({
                closed: 'NO',
                id: '/juegos/crucigrama',
                badge: 'NUEVO'
            });
        });

        it('When isNewGame = NO ', () => {
            const newProps = { ...props };
            newProps.customFields = { ...props.customFields, isNewGame: 'NO' };
            const objArticle = new Juegos.default(newProps);
            const result = objArticle.render();
            expect(result).toMatchObject({
                closed: 'NO',
                id: '/juegos/crucigrama',
                badge: null
            });
        });

        it('When props is null ', () => {
            const objArticle = new Juegos.default(null);
            const result = objArticle.render();
            expect(result.Message).toBe(
                `Cannot read properties of null (reading 'customFields')`
            );
        });
    });
});
