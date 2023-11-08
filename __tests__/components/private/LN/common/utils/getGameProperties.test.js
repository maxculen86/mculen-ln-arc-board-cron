import getGameProperties from '../../../../../../components/private/LN/common/utils/getGameProperties';

jest.mock(
    '../../../../../../components/private/common/utils/getAssetsPath',
    () => ({
        __esModule: true,
        default: jest
            .fn()
            .mockImplementation(contextPath => deployment => filename => {
                return `${contextPath}/resources/images/${deployment}/${filename}`;
            })
    })
);

const contextPath = '/pf';
const deployment = 'assets';

describe('Games test funcion gameProperties', () => {
    it('returns expected object for valid arguments', () => {
        const sectionId = 'criptograma';
        const sectionTitle = 'Primary Game Title';
        const expected = {
            title: 'Primary Game Title',
            logo: {
                src: `${contextPath}/resources/images/${deployment}/games/${sectionId}.svg`
            },
            borderColor: `bg-${sectionId}`
        };

        const result = getGameProperties(
            sectionTitle,
            sectionId,
            contextPath,
            deployment
        );

        expect(result).toEqual(expected);
    });

    it('should return false when sectionId is undefined', () => {
        const sectionId = undefined;
        const result = getGameProperties(
            undefined,
            sectionId,
            '/contextPath',
            'deployment'
        );
        expect(result).toBe(false);
    });

    it('should return false when sectionId is null', () => {
        const sectionId = null;
        const result = getGameProperties(
            undefined,
            sectionId,
            '/contextPath',
            'deployment'
        );
        expect(result).toBe(false);
    });

    it('should return false when sectionId is an empty string', () => {
        const sectionId = '';
        const result = getGameProperties(
            undefined,
            sectionId,
            '/contextPath',
            'deployment'
        );
        expect(result).toBe(false);
    });
});
