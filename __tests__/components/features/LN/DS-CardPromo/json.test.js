import * as DSCardPromo from '../../../../../components/features/LN/DS-CardPromo/json';

jest.mock('fusion:consumer', component => {
    return function (component) {
        const newComponent = component;
        newComponent.prototype.fetchContent = jest.fn();
        return newComponent;
    };
});

describe('components - features - LN - DS-CardPromo - json.js', () => {
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
        type: 'LN/DS-CardPromo',
        id: 'f0fmW4FQNhmg6iz',
        name: null,
        customFields: {
            sectionId: '/juegos/crucigrama',
            subscriber: 'NO',
            isNew: 'NUEVO'
        }
    };

    describe('Check props', () => {
        it('When articles load props Ok', () => {
            const cardPromo = new DSCardPromo.default(props);
            expect(cardPromo.props).toMatchObject(props);
        });

        it('When props is OK ', () => {
            const cardPromo = new DSCardPromo.default(props);
            const result = cardPromo.render();
            expect(result).toMatchObject({
                closed: 'NO',
                id: '/juegos/crucigrama',
                badge: 'NUEVO'
            });
        });

        it('When isNew is not NUEVO ', () => {
            const newProps = { ...props };
            newProps.customFields = { ...props.customFields, isNew: 'NO' };
            const cardPromo = new DSCardPromo.default(newProps);
            const result = cardPromo.render();
            expect(result).toMatchObject({
                closed: 'NO',
                id: '/juegos/crucigrama',
                badge: null
            });
        });

        it('When props is null ', () => {
            expect(() => new DSCardPromo.default(null)).toThrow(
                `Cannot read properties of null (reading 'customFields')`
            );
        });
    });

    describe('type Interno/Externo', () => {
        beforeEach(() => {
            DSCardPromo.default.prototype.fetchContent.mockClear();
        });

        it('When type is Externo should use sectionId and not fetch content', () => {
            const externoProps = {
                ...props,
                customFields: {
                    ...props.customFields,
                    type: 'Externo'
                }
            };
            const cardPromo = new DSCardPromo.default(externoProps);
            const result = cardPromo.render();

            expect(
                DSCardPromo.default.prototype.fetchContent
            ).not.toHaveBeenCalled();
            expect(result.id).toBe('/juegos/crucigrama');
        });

        it('When type is Interno should fetch lnAcuSource', () => {
            const internoProps = {
                ...props,
                customFields: {
                    ...props.customFields,
                    type: 'Interno'
                }
            };
            new DSCardPromo.default(internoProps);

            expect(
                DSCardPromo.default.prototype.fetchContent
            ).toHaveBeenCalledWith({
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

        it('When type is Interno should use article link as id', () => {
            const internoProps = {
                ...props,
                customFields: {
                    ...props.customFields,
                    type: 'Interno'
                }
            };
            const cardPromo = new DSCardPromo.default(internoProps);
            cardPromo.state = {
                lnAcuSource: {
                    content_elements: [
                        { website_url: '/juegos/criptograma/articulo' }
                    ]
                }
            };
            const result = cardPromo.render();

            expect(result.id).toBe('/juegos/criptograma/articulo/');
        });

        it('When type is Interno without article data should fallback to sectionId', () => {
            const internoProps = {
                ...props,
                customFields: {
                    ...props.customFields,
                    type: 'Interno'
                }
            };
            const cardPromo = new DSCardPromo.default(internoProps);
            const result = cardPromo.render();

            expect(result.id).toBe('/juegos/crucigrama');
        });
    });
});
