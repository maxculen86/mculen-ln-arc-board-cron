import * as fusionConsumer from 'fusion:consumer';
import * as Juegos from '../../../../../components/features/LN-common/Juego/json';

jest.mock('fusion:consumer', component => {
    return function (component) {
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

    describe('gameType Interno/Externo', () => {
        beforeEach(() => {
            Juegos.default.prototype.fetchContent.mockClear();
        });

        it('When gameType is Externo should use sectionId and not fetch content', () => {
            const externoProps = {
                ...props,
                customFields: {
                    ...props.customFields,
                    gameType: 'Externo'
                }
            };
            const objArticle = new Juegos.default(externoProps);
            const result = objArticle.render();

            expect(
                Juegos.default.prototype.fetchContent
            ).not.toHaveBeenCalled();
            expect(result.id).toBe('/juegos/crucigrama');
        });

        it('When gameType is Interno should fetch lnAcuSource', () => {
            const internoProps = {
                ...props,
                customFields: {
                    ...props.customFields,
                    gameType: 'Interno'
                }
            };
            new Juegos.default(internoProps);

            expect(Juegos.default.prototype.fetchContent).toHaveBeenCalledWith({
                lnAcuSource: {
                    source: 'lnAcuSource',
                    query: {
                        sectionId: '/juegos/crucigrama',
                        size: 1,
                        website: 'la-nacion-ar'
                    }
                }
            });
        });

        it('When gameType is Interno should use article link as id', () => {
            const internoProps = {
                ...props,
                customFields: {
                    ...props.customFields,
                    gameType: 'Interno'
                }
            };
            const objArticle = new Juegos.default(internoProps);
            objArticle.state = {
                lnAcuSource: {
                    content_elements: [
                        { website_url: '/juegos/criptograma/articulo' }
                    ]
                }
            };
            const result = objArticle.render();

            expect(result.id).toBe('/juegos/criptograma/articulo/');
        });

        it('When gameType is Interno without article data should fallback to sectionId', () => {
            const internoProps = {
                ...props,
                customFields: {
                    ...props.customFields,
                    gameType: 'Interno'
                }
            };
            const objArticle = new Juegos.default(internoProps);
            const result = objArticle.render();

            expect(result.id).toBe('/juegos/crucigrama');
        });
    });
});
