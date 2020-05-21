jest.mock(
    '../../../../../../components/private/LN/api/v1/nota/relacionados/categoria',
    () => {
        return () => {
            return 'categoria-mock';
        };
    }
);

jest.mock(
    '../../../../../../components/private/LN/api/v1/nota/relacionados/tag',
    () => {
        return () => {
            return 'tag-mock';
        };
    }
);

import Relacionados from '../../../../../../components/private/LN/api/v1/nota/relacionados';
import article from '../../../../../../__mocks__/data/articles/QAZ7BVHG5BCNFN7S67XCBP6PA4.json';

describe('Test de JSON de relacionados en article', () => {
    const resp = Relacionados(article);
    it('Render de tags de los relacionados', () => {
        resp.tags.forEach(tag => {
            expect(tag).toBe('tag-mock');
        });
    });

    it('Render de categorias de los relacionados', () => {
        resp.categorias.forEach(categoria => {
            expect(categoria).toBe('categoria-mock');
        });
    });
});
