import { showGlossaryByLayout } from '../../../../../../components/features/LN-10-global/common/baseLayout/helpers';

jest.mock('../../../../../../properties/sites/la-nacion-ar', () => {
    return {
        layoutsName: {
            Acumulado: 'LN-acumulado',
            Columnistas: 'LN-acumulado-columnistas',
            Deportes: 'LN-Home_Sports',
            FotoAl100: 'LN-nota-foto-al-100',
            HomeLN10: 'LN10-Home_Main',
            Noticia: 'LN-nota-noticia',
            StoryTelling: 'LN-nota-storytelling',
            Video: 'LN-nota-video',
            HtmlLibre: 'LN-nota-html-libre',
            Infografia: 'LN-nota-infografia',
            Receta: 'LN-nota-receta'
        }
    };
});
describe('showGlossaryByLayout', () => {
    it('should return true for allowed layouts', () => {
        expect(showGlossaryByLayout('LN-nota-foto-al-100')).toBe(true);
        expect(showGlossaryByLayout('LN-nota-noticia')).toBe(true);
        expect(showGlossaryByLayout('LN-nota-infografia')).toBe(true);
        expect(showGlossaryByLayout('LN-nota-storytelling')).toBe(true);
    });

    it('should return false for non-allowed layouts', () => {
        expect(showGlossaryByLayout('LN-Home_Sports')).toBe(false);
        expect(showGlossaryByLayout('layout-unknown')).toBe(false);
    });

    it('should return false for empty layout parameter', () => {
        expect(showGlossaryByLayout('')).toBe(false);
    });

    it('should return false when layout parameter is not provided', () => {
        expect(showGlossaryByLayout()).toBe(false);
    });
});
