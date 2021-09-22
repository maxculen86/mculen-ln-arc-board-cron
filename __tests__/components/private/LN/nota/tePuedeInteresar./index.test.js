import React, { Component } from 'react';
import { mount, shallow, render } from 'enzyme';
import Consumer from 'fusion:consumer';
import cajaTema from '../../../../../../components/private/LN/common/cajaTema';
import Index from '../../../../../../components/private/LN/nota/tePuedeInteresar/index';

// const articles = [

// ]
jest.mock('fusion:consumer', Component => {
    return function(Component) {
        class element extends Component {
            constructor(props) {
                super(props);
                this.props = props;
            }
            fetchContent() {
                return {
                    articles: [
                        {
                            by: {},
                            headlines: {
                                basic:
                                    'Así fue el romance de Juana Viale y Roberto García Moritán, el marido de Pampita',
                                mobile: ''
                            },
                            label: {
                                volanta: {
                                    text: ''
                                }
                            },
                            promo_items: {
                                basic: {
                                    type: 'image',
                                    url:
                                        'https://resizer.glanacion.com/resizer/Ovvdkcs13HUJ7VQysRS-3JO1NIo=/768x513/smart/filters:quality(70)/bucket2.glanacion.com/anexos/fotos/94/3446794.jpg',
                                    width: 768,
                                    height: 513,
                                    resized_urls: [
                                        {
                                            resizedUrl:
                                                'https://resizer.glanacion.com/resizer/2Rifu6S-2jyVOQlG4gkWJPDFkxQ=/360x240/filters:quality(70)/bucket2.glanacion.com/anexos/fotos/94/3446794.jpg',
                                            option: {
                                                width: 360,
                                                height: 240,
                                                media: '(min-width: 1024px)'
                                            }
                                        }
                                    ],
                                    resized_urls_zoom: []
                                }
                            },
                            subtype: 1,
                            website_url:
                                'https://www.lanacion.com.ar/espectaculos/asi-fue-el-romance-fugaz-de-juana-viale-y-roberto-garcia-moritan-el-marido-de-pampita-nid22082021/',
                            _id: 'MXMP436H7FDEHORVYDHFZP6NFA'
                        },
                        {
                            by: {},
                            headlines: {
                                basic:
                                    'Cuando no quería tener relaciones me llevaba desnuda al patio a la madrugada en pleno invierno',
                                mobile: ''
                            },
                            label: {
                                volanta: {
                                    text: ''
                                }
                            },
                            promo_items: {
                                basic: {
                                    type: 'image',
                                    url:
                                        'https://resizer.glanacion.com/resizer/Ovvdkcs13HUJ7VQysRS-3JO1NIo=/768x513/smart/filters:quality(70)/bucket2.glanacion.com/anexos/fotos/94/3446794.jpg',
                                    width: 768,
                                    height: 513,
                                    resized_urls: [
                                        {
                                            resizedUrl:
                                                'https://resizer.glanacion.com/resizer/2Rifu6S-2jyVOQlG4gkWJPDFkxQ=/360x240/filters:quality(70)/bucket2.glanacion.com/anexos/fotos/94/3446794.jpg',
                                            option: {
                                                width: 360,
                                                height: 240,
                                                media: '(min-width: 1024px)'
                                            }
                                        }
                                    ],
                                    resized_urls_zoom: []
                                }
                            },
                            subtype: 1,
                            website_url:
                                'https://www.lanacion.com.ar/lifestyle/lo-denuncio-25-veces-cuando-no-queria-tener-relaciones-me-llevaba-desnuda-al-patio-a-la-madrugada-en-nid17092021/',
                            _id: 'WON57236RJELPAMGPFQB4644TE'
                        }
                    ]
                };
            }
        }
        return element;
    };
});

const props = {
    userId: null,
    cantidadNotas: 15,
    excludeItems: [],
    outputType: 'default',
    url:
        'https://www.lanacion.com.ar/economia/ultima-prueba-syndication-nid14052020/?_website=la-nacion-ar',
    idArticle: 'IIEEJBWQWNCZNDOUTKP47C4L24',
    arcSite: 'la-nacion-ar'
};

describe('Te puede interesar index.jsx', () => {
    it('should render component', () => {
        const wrapper = mount(
            <Index {...props} dataLayerSection={'TePuedeInteresar'} />
        );
        console.log('AAAAAAAAAAAAAAAAAAAAA', wrapper.debug());
        expect(wrapper).toBeNull();
    });
    it('should be null', () => {
        const wrapper = render(
            <Index
                {...props}
                dataLayerSection={'TePuedeInteresar'}
                articles={[]}
            />
        );
        expect(wrapper).toBeNull();
    });
});
