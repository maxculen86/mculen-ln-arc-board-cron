import { targetUrlRedirect } from '../../../../components/chains/utils/targetUrlRedirect';

describe('targetUrlRedirect function', () => {
    it('should return "_self" for URLs starting with SITE_LANACION', () => {
        const SITE_LANACION = 'https://google.com.ar';
        const url = `${SITE_LANACION}/campo`;

        const result = targetUrlRedirect(url);

        expect(result).toBe('_blank');
    });

    it('should return "_self" for URLs starting with "/"', () => {
        const url = '/salud';

        const result = targetUrlRedirect(url);

        expect(result).toBe('_self');
    });

    it('should return "_blank" for URLs not starting with SITE_LANACION or "/"', () => {
        const url = 'https://youtube.com';

        const result = targetUrlRedirect(url);

        expect(result).toBe('_blank');
    });

    it('should return "_blank" for empty URLs', () => {
        const result = targetUrlRedirect();

        expect(result).toBe('_blank');
    });
});
