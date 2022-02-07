import React from 'react';
import { shallow } from 'enzyme';
import AMPScripts from '../../../../components/private/common/ampIndex';
// import getOembedScripts from '../../../../components/private/common/scriptManager/getOembedScripts';
// import get from '../../../../components/private/common/utils/get';

describe('Check ampScrips works correctly', () => {
    const props = {
        layout: 'LN-nota-receta',
        arcSite: 'la-nacion-ar',
        contentFeatures: [
            'LN-common/bannerRefactor',
            'LN-common/bannerRefactor',
            'LN-nota/breadcrumbArticle',
            'LN-nota/tituloNota',
            'LN-nota/aperturaReceta',
            'LN-nota/share',
            'LN-nota/bajadaNota',
            'LN-nota/autorYFechaNota',
            'LN-common/bannerRefactor',
            'LN-nota/cuerpo',
            'LN-nota/firmaLogoExterno',
            'LN-nota/masNotas',
            'LN-common/bannerRefactor',
            'LN-common/bannerRefactor',
            'LN-common/bannerRefactor',
            'LN-common/ranking',
            'LN-common/bannerRefactor',
            'LN-nota/masNotas',
            'LN-nota/tePuedeInteresar',
            'LN-nota/commentsViafoura',
            'LN-common/anexo',
            'LN-common/bannerRefactor'
        ],
        globalContent: {
            _id: 'S6AWXXODTFFPTFSKYUPDEJHBXI',
            canonical_url:
                '/recetas/dulces/prueba-cake-de-couscous-nid10122021/',
            content_elements: [
                {
                    powerUp: [
                        {
                            _id: '256RFM63BBANFNJ4QZJEYZV3UE',
                            embed: {
                                config: {
                                    items: [
                                        'Item nuevo en sandbox (y editado)',
                                        'Cous Cous editado enter',
                                        'Huevos, 3.',
                                        'Azafrán editado click',
                                        'Ciboulette o cebolla de verdeo, 20 gr.',
                                        'Queso provolone o muzzarella, 100 gr.',
                                        'Manteca, 60 gr.',
                                        'Sal y pimienta, a gusto.',
                                        'Item agregado',
                                        'Item agregado 2'
                                    ],
                                    titleList: 'Ingredientes',
                                    typeList: 'ingredientes'
                                }
                            },
                            subtype: 'custom-ingrediente',
                            type: 'custom_embed'
                        },
                        {
                            _id: '6VKDX76U55BRRIBZ2M5MVCQVAY',
                            embed: {
                                config: {
                                    items: [
                                        'Paso de preparación 1 editado sandbox click',
                                        'Paso de preparación 2 editado sandbox enter',
                                        'Paso 3 preparacion',
                                        'Poner 2 cucharadas de manteca en una sartén a fuego medio-alto. Bajar el fuego a medio y freie los cakes en tandas, agregando más manteca si es necesario. Cocinar cada una durante 5 minutos, dándolas vueltas, hasta que esté crujiente y dorado.',
                                        'Separar el cous cous con un tenedor y luego agrega el yogur, los huevos, las cebollas, el queso, 1 cucharadita de sal y un poco de pimienta negra. Mezclar bien y luego con las manos dar al cous cous forma de cakes redondos y firmes de aproximadamente 1,5 cm de grosor y de 55 g de peso cada una. Presionar y compactar bien para que no se desintegre durante la cocción.',
                                        'Ultimo paso preparacion nuevo'
                                    ],
                                    titleList: 'Para el relleno',
                                    typeList: 'preparacion'
                                }
                            },
                            subtype: 'custom-preparacion',
                            type: 'custom_embed'
                        },
                        {
                            _id: 'FC6R7DGMSVE4DDG73TI7CQ2O44',
                            embed: {
                                config: {
                                    items: [
                                        'un item',
                                        'dos items',
                                        'tres items'
                                    ],
                                    titleList: 'Para la masa',
                                    typeList: 'preparacion'
                                }
                            },
                            subtype: 'custom-preparacion',
                            type: 'custom_embed'
                        },
                        {
                            _id: 'MRE33RWFYNCDJA2Y3PT2PLGJFA',
                            embed: {
                                config: {
                                    items: [
                                        {
                                            text: 'Calorías',
                                            unit: 'kcal',
                                            value: 2
                                        },
                                        {
                                            text: 'Carbohidratos',
                                            unit: 'g',
                                            value: 3
                                        },
                                        {
                                            text: 'Colesterol',
                                            unit: 'mg',
                                            value: 1
                                        },
                                        {
                                            text: 'Grasas',
                                            unit: 'g',
                                            value: 1
                                        },
                                        {
                                            text: 'Fibras',
                                            unit: 'g',
                                            value: 2
                                        },
                                        {
                                            text: 'Proteínas',
                                            unit: 'g',
                                            value: 200
                                        }
                                    ],
                                    typeList: 'nutritional-info'
                                }
                            },
                            subtype: 'custom-nutrition',
                            type: 'custom_embed'
                        }
                    ],
                    subtype: 'power-up-receta',
                    type: 'custom_embed'
                },
                {
                    _id: 'YS4YBYLHRRCPRMGGTJT67ONS7E',
                    additional_properties: {},
                    content:
                        'Entrada o plato. Los cakes de couscous pueden ir como entrada con un rico hummus o algún topping, o también como plato principal. Pueden ir como terminación de una ensalada o hacer un pastel de vegetales intercalando los cakes. Esta receta de cake de couscous nace como parte del brunch de los loscales de @pianibylamarguerite “La idea era salir del concepto standard de cakes o pancakes que tanto se ve, y darle una vuelta de identidad”, dice Magdalena Marquevich, la chef. “Son súper versátiles y nosotros los servimos en el brunch: van con queso Straciatella, huevo poche y se acompaña con un buen vaso de vermú”. Este cake de couscous, se puede acompañar con una mermelada casera de tomate y ají molido.',
                    type: 'text'
                },
                {
                    _id: 'HWBUA2ZRMJGJBHYB7BYKJGLAYQ',
                    additional_properties: {},
                    content: 'Tips para para adaptar el cake de couscous',
                    level: 1,
                    type: 'header'
                },
                {
                    _id: 'RB34P53HMBD2ZDSVQ3RL4CGQSA',
                    additional_properties: {},
                    items: [
                        {
                            _id: 'AQOUTGCALVDG5N7JUQBSLMQAUA',
                            content:
                                'El cake de cuscous se puede hacer en forma de croquetitas, y pueden servirse en una ensalada o en un plato de pasta',
                            type: 'text'
                        },
                        {
                            _id: 'FNI5ETM4XNGQFOQOUUHL7D5AQI',
                            content:
                                'Una opción del cake de cous cous es usarlo como pan para quienes no comen gluten. Puede ser para una hamburguesa o para armarse algún sandwich saludable.',
                            type: 'text'
                        }
                    ],
                    list_type: 'unordered',
                    type: 'list'
                }
            ],
            subtype: '7',
            type: 'story'
        }
    };
    const wrapper = shallow(<AMPScripts {...props} />);
    it('Expect to throw correct length and snapshot test', () => {
        expect(wrapper.length).toBe(8);
        expect(wrapper).toBeDefined();
        expect(wrapper).toMatchSnapshot();
    });
});
