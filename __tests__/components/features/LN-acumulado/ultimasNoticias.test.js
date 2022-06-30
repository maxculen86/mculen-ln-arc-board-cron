import React from 'react';
import Context from 'fusion:context';
import Consumer from 'fusion:consumer';
import UltimasNoticias from '../../../../components/features/LN-acumulado/ultimasNoticias';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import mockArticlesHtml from '../../../../__mocks__/data/ultimasNoticias/mockArticlesHtml';
import sectionsFormated from '../../../../components/private/common/utils/sectionsFormated';

jest.mock('fusion:context', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

jest.mock('fusion:consumer', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

jest.mock(
    '../../../../components/private/LN/common/hocs/WithAcuArticlesData',
    () => () => () => mockArticlesHtml
);
describe('Features - LN-acumulado - Ultimas Noticias', () => {
    it('should render ultimas noticias component', () => {
        Context.useAppContext = jest.fn(() => ({
            outputType: 'default',
            siteProperties: {}
        }));
        const props = {
            customFields: {
                sections: [],
                layout: 'Timeline',
                size: 30
            }
        };
        render(<UltimasNoticias {...props} />);
        expect(screen.getByRole('article')).toBeInTheDocument();
    });
    it('should test sectionsFormated func', () => {
        expect(sectionsFormated(['economia', 'politica'])).toStrictEqual(
            '("economia","politica")'
        );
    });
});
