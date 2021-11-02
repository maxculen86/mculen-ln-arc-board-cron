import get from 'lodash.get';
import articleFull from '../../../../../../../__mocks__/data/articles/2KOBND62KNFVVBFQZOADNN6WNY.json';
import NotaRelacionadas from '../../../../../../../components/private/LN/api/global/v1/nota/relacionados/notaRelacionada';

describe('Test de JSON de notas relacionadas en article', () => {
    it('Elementos de nota la nota relacionada, con todos los datos', () => {
        const relatedNotes = get(articleFull, 'related_content.basic');
        const relatedNote = NotaRelacionadas(relatedNotes[1]);

        expect(relatedNote.id).toBe(relatedNotes[1]._id);
        expect(relatedNote.titulo).toBe(relatedNotes[1].headlines.basic);
        expect(relatedNote.url).toBe(relatedNotes[1].website_url);
        expect(relatedNote.volanta).toBe(relatedNotes[1].label.volanta.text);
    });

    it('Elementos de nota la nota relacionada, sin volanta', () => {
        const relatedNotes = get(articleFull, 'related_content.basic');
        const relatedNote = NotaRelacionadas(relatedNotes[0]);

        expect(relatedNote.id).toBe(relatedNotes[0]._id);
        expect(relatedNote.titulo).toBe(relatedNotes[0].headlines.basic);
        expect(relatedNote.url).toBe(relatedNotes[0].website_url);
        expect(relatedNote.volanta).toBeUndefined();
    });

    it('Valor en caso de ser null', () => {
        const relatedNote = NotaRelacionadas(null);
        expect(relatedNote).toBe(null);
    });
});
