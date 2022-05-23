import React from 'react';
import Schemas from '../../../../../components/private/common/scriptManager/schemas';
import { shallow } from 'enzyme';
import Context from 'fusion:context';

jest.mock('fusion:consumer', component => {
    return function(component) {
        return component;
    };
});

jest.mock('fusion:context', () => () => ({
    default: props => {
        const mockAvailableProps = {
            outputType: 'default',
            arcSite: 'la-nacion-ar'
        };

        return props.children(mockAvailableProps);
    }
}));

jest.mock('fusion:static', () => 'mock-static');

describe('Private - Common - Schemas =>', () => {
    Context.useAppContext = jest.fn(() => ({
        globalContent: { subtype: '1' },
        deployment: () => {},
        contextPath: ''
    }));
    const shallowSelf = props => shallow(<Schemas {...props} />);
    const verifyHtml = (wrapper, output = '', finder = 'html') => {
        const cleanOutput = output.toString().replace(/\s/g, '');
        const cleanWrapper = wrapper[finder]()
            .toString()
            .replace(/\s/g, '');
        return expect(cleanWrapper).toEqual(cleanOutput);
    };

    describe('with empty section or not home', () => {
        const wrappers = [
            shallowSelf(),
            shallowSelf({ section: 'nota' }),
            shallowSelf({ section: 'acumulado' })
        ];
        it('should returns null', () => {
            wrappers.map(x => verifyHtml(x));
        });
    });

    describe('with section equal to home', () => {
        const wrapper = shallowSelf({ section: 'home' });

        const scripts = [
            `{
                "@context": "http://schema.org",
                "@type": "NewsMediaOrganization",
                "name": "LA NACION",
                "url": "https://www.lanacion.com.ar/",
                "description": "Últimas noticias de Argentina y el mundo – LA NACION",
                "alternateName": "LN",
                "diversityPolicy": "https://www.lanacion.com.ar/sociedad/diversidad-redaccion-nid2413327/",
                "ethicsPolicy": "https://www.lanacion.com.ar/sociedad/la-nacion-mision-estructura-empresarial-principios-eticos-nid2393569/",
                "masthead": "https://www.lanacion.com.ar/sociedad/equipo-editorial-la-nacion-nid2390490/",
                "publishingPrinciples": "https://www.lanacion.com.ar/sociedad/los-veinte-20-principios-del-periodismo-la-nid2390521/",
                "verificationFactCheckingPolicy": "https://www.lanacion.com.ar/sociedad/verificacion-chequeo-datos-nid2406825/",
                "foundingDate": "1870-01-04",
                "sameAs": [
                  "https://www.facebook.com/lanacion/",
                  "https://www.instagram.com/lanacioncom/",
                  "https://twitter.com/LANACION"
                ]
              }`,
            `{
                "@context":"http://schema.org",
                "@type":"WebSite",
                "url":"https://www.lanacion.com.ar/"
            }`
        ];

        const nodes = scripts.map(x => (
            <script
                dangerouslySetInnerHTML={{ __html: x }}
                type="application/ld+json"
            ></script>
        ));
        it('should returns content', () => {
            verifyHtml(wrapper, nodes, 'getElements');
        });
    });
});
