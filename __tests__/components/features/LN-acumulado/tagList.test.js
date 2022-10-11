import React from 'react';
import Context from 'fusion:context';
import Consumer from 'fusion:consumer';
import { useContent } from 'fusion:content';
import { render, screen } from '@testing-library/react';
import TagsListFeature, {
    getSectionProps,
    getUltimasNoticiasSectionsIds
} from '../../../../components/features/LN-acumulado/tagList';
import mockTags from '../../../../__mocks__/data/tags/mockTags.json';
import mockRenderables from '../../../../__mocks__/data/tags/mockRenderables.json';
import renderables1 from '../../../../__mocks__/data/renderables/data1';

import '@testing-library/jest-dom';

jest.mock('fusion:static', () => 'mock-static');

jest.mock('fusion:context', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

describe('Features - LN-acumulado - Tag list', () => {
    it('should render the feature correctly for home', () => {
        Context.useAppContext = jest.fn(() => ({
            globalContent: {},
            renderables: mockRenderables
        }));
        useContent.mockImplementation(() => mockTags);
        render(<TagsListFeature title={'Temas del día:'} />);
        expect(screen.getByRole('heading')).toHaveTextContent('Temas del día:');
        expect(screen.getAllByRole('listitem')).toHaveLength(12);
    });

    it('should render the feature correctly for acumulado', () => {
        Context.useAppContext = jest.fn(() => ({
            globalContent: { node_type: 'section' },
            renderables: mockRenderables
        }));
        useContent.mockImplementation(() => mockTags);
        render(<TagsListFeature />);
        expect(screen.queryByRole('heading')).toBe(null);
        expect(screen.getAllByRole('listitem')).toHaveLength(12);
    });

    it('should test getUltimasNoticiasSectionsIds func', () => {
        expect(getUltimasNoticiasSectionsIds(mockRenderables)).toStrictEqual(
            '("/economia","/sociedad","/deportes","/politica","/espectaculos","/el-mundo","/turismo","/tecnologia","/transito","/propiedades","/dolar-hoy","/autos","/buenos-aires","/seguridad","/educacion","/cultura","/comunidad","/salud","/ciencia","/sabado")'
        );
    });

    it('should test getSectionProps func', () => {
        const config = {
            sectionName: undefined,
            sectionId: undefined,
            renderables: undefined,
            arcSite: undefined
        };

        const { sourceName, query } = getSectionProps(config);

        expect(sourceName).toStrictEqual('acuArticlesSource');
        expect(query).toStrictEqual({
            page: 0,
            promoItemsOnly: false,
            sectionId: undefined,
            sectionsIds: undefined,
            sourceOrigin: undefined,
            website: undefined
        });
    });

    it('should test getSectionProps func for Home', () => {
        const config1 = {
            sectionName: 'home',
            sectionId: undefined,
            renderables: renderables1,
            arcSite: 'la-nacion-ar'
        };

        const { sourceName: source1, query: query1 } = getSectionProps(config1);

        expect(source1).toStrictEqual('acuArticlesSourcebyIds');
        expect(query1).toStrictEqual({
            Ids: 'ILXGTYXUWNF3HKJ3ROQQCQPRVE,Z62GTRQMINHNRDLWGGMKGE3ZCE',
            website: 'la-nacion-ar'
        });
    });

    it('should test getSectionProps func for ACU', () => {
        const config2 = {
            sectionName: 'section',
            sectionId: '/cultura/',
            renderables: renderables1,
            arcSite: 'la-nacion-ar'
        };

        const { sourceName: source2, query: query2 } = getSectionProps(config2);

        expect(source2).toStrictEqual('acuArticlesSource');
        expect(query2).toStrictEqual({
            page: 0,
            promoItemsOnly: false,
            sectionId: '/cultura/',
            sectionsIds: undefined,
            sourceOrigin: undefined,
            website: 'la-nacion-ar'
        });
    });

    it('should test getSectionProps func for Ultimas Noticias', () => {
        const config = {
            sectionName: 'section',
            sectionId: '/ultimas-noticias',
            renderables: mockRenderables,
            arcSite: 'la-nacion-ar'
        };

        const { sourceName, query } = getSectionProps(config);

        expect(sourceName).toStrictEqual('acuArticlesSource');
        expect(query).toStrictEqual({
            page: 0,
            promoItemsOnly: false,
            sectionId: '/ultimas-noticias',
            sectionsIds:
                '("/economia","/sociedad","/deportes","/politica","/espectaculos","/el-mundo","/turismo","/tecnologia","/transito","/propiedades","/dolar-hoy","/autos","/buenos-aires","/seguridad","/educacion","/cultura","/comunidad","/salud","/ciencia","/sabado")',
            sourceOrigin: 'composer',
            website: 'la-nacion-ar'
        });
    });
});
