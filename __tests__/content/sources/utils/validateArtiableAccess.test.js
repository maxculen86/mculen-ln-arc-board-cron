import validateArticleAccess from '../../../../content/sources/utils/validateArticleAccess';
import Redirect from '../../../../content/sources/utils/redirect';

describe('content - sources - ultils - validateArticleAccess', () => {
    const mocks = {
        redirect: { contentCode: 'cerrada', meteringVariant: 'M' },
        exclusive: { contentCode: 'cerrada', meteringVariant: 'S' },
        default: { contentCode: 'comun', meteringVariant: 'S' }
    };

    it('should redirect to Paywall', () => {
        expect(() => validateArticleAccess(mocks.redirect)).toThrow(Redirect);
    });

    it('should be exclusive access', () => {
        expect(validateArticleAccess(mocks.exclusive)).toMatchObject({
            access: true,
            exclusive: true
        });
    });

    it('should be default access', () => {
        expect(validateArticleAccess(mocks.default)).toMatchObject({
            access: true,
            exclusive: false
        });
    });
});
