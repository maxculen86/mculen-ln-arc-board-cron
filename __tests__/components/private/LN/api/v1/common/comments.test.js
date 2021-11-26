import {
    displayComments,
    openComments
} from '../../../../../../../components/private/LN/api/v1/common/story/comments';
import Article from '../../../../../../../__mocks__/data/nota/cuerpo/notaCuerpo.json';

describe('Test unitarios para espacio patrocinado y content lab', () => {
    it('test unitario en caso de enviar un null', () => {
        const resp = displayComments(Article);
    });
});
