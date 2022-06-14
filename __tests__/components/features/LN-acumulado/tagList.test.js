import React from 'react';
import Context from 'fusion:context';
import Consumer from 'fusion:consumer';
import { render, screen } from '@testing-library/react';
import TagsListFeature, {
    getUltimasNoticiasSectionsIds
} from '../../../../components/features/LN-acumulado/tagList';
import mockTags from '../../../../__mocks__/data/tags/mockTags.json';
import mockRenderables from '../../../../__mocks__/data/tags/mockRenderables.json';

import '@testing-library/jest-dom';

jest.mock('fusion:context', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

jest.mock('../../../../components/private/common/utils/tags', () => {
    const tags = jest.requireActual(
        '../../../../components/private/common/utils/tags'
    );
    return {
        ...tags,
        getOrderAndCountTags: () => mockTags
    };
});

describe('Features - LN-acumulado - Tag list', () => {
    it('should render the feature correctly for home', () => {
        Context.useAppContext = jest.fn(() => ({
            globalContent: {}
        }));
        render(<TagsListFeature title={'Temas del día:'} />);
        expect(screen.getByRole('heading')).toHaveTextContent('Temas del día:');
        expect(screen.getAllByRole('listitem')).toHaveLength(12);
    });
    it('should render the feature correctly for acumulado', () => {
        Context.useAppContext = jest.fn(() => ({
            globalContent: {}
        }));
        render(<TagsListFeature />);
        expect(screen.queryByRole('heading')).toBe(null);
        expect(screen.getAllByRole('listitem')).toHaveLength(12);
    });

    it('should test getUltimasNoticiasSectionsIds func', () => {
        expect(getUltimasNoticiasSectionsIds(mockRenderables)).toStrictEqual(
            '("/economia","/sociedad","/deportes","/politica","/espectaculos","/el-mundo","/turismo","/tecnologia","/transito","/propiedades","/dolar-hoy","/autos","/buenos-aires","/seguridad","/educacion","/cultura","/comunidad","/salud","/ciencia","/sabado")'
        );
    });
});
