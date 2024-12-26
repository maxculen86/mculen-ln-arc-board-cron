import * as fusionConsumer from 'fusion:consumer';
import Apertura from '../../../../../components/features/LN-acumulado/apertura/json';
import filter from '../../../../../content/filters/LN/acumulado/articleHomeMobile';

jest.mock('fusion:consumer', component => {
    return function (component) {
        const newComponent = component;
        // Mock fetchContent
        newComponent.prototype.fetchContent = jest.fn();
        newComponent.prototype.fetchContent.mockImplementation(() => {
            newComponent.prototype.state = {
                customFields: {
                    nameFeature: 'LN-acumulado/apertura'
                },
                collectionsSourceResult: {
                    content_elements: [{ id: 'nota1' }, { id: 'nota2' }]
                }
            };
        });
        return newComponent;
    };
});

describe('Test suite de feature LN-acumulados/apertura', () => {
    test('Should return right data if fetchContent updates state', () => {
        // Prepare
        const props = {
            globalContent: {
                acumuladoGeneral: {
                    id_collection_promo_items: 'IDCOLLECTION'
                }
            }
        };
        const apertura = new Apertura(props);

        // Act
        const result = apertura.render();

        // Assert
        expect(result).toEqual({
            articles: [
                {
                    id: 'nota1'
                },
                {
                    id: 'nota2'
                }
            ],
            information: {
                nameFeature: 'LN-acumulado/apertura'
            }
        });
    });

    test('should pass right arguments to collection source', () => {
        // Prepare
        const props = {
            _id: 'fake-test-id',
            taxonomy: {
                primary_section: {
                    _id: '/politica'
                }
            },
            globalContent: {
                acumuladoGeneral: {
                    id_collection_promo_items: 'IDCOLLECTION'
                }
            }
        };

        // Act
        const apertura = new Apertura(props);
        const spy = jest.spyOn(apertura, 'fetchContent');

        // Assert
        expect(spy).toBeCalledWith({
            collectionsSourceResult: {
                filter,
                query: {
                    id: 'IDCOLLECTION',
                    size: 2,
                    website: 'la-nacion-ar'
                },
                source: 'collectionsSource'
            }
        });
    });
});
