import Context from 'fusion:context';
import useSubtype from '../../../../../components/private/common/hooks/useSubtype';

jest.mock('fusion:context', () => () => ({
    default: props => {
        const mockAvailableProps = {
            outputType: 'default',
            arcSite: 'la-nacion-ar'
        };

        return props.children(mockAvailableProps);
    }
}));

const subtypes = [
    { value: '1', expected: '1', description: 'Noticia' },
    { value: '2', expected: '2', description: 'Infografia' },
    { value: '4', expected: '4', description: 'StoryTelling' },
    { value: '5', expected: '5', description: 'Video' },
    { value: '6', expected: '6', description: 'Liveblog' },
    { value: '7', expected: '7', description: 'Receta' },
    { value: '8', expected: '8', description: 'Foto al 100' },
    { value: '9', expected: '9', description: 'Html Libre' },
    { value: '10', expected: '10', description: 'Agencia' },
    {
        value: '99',
        expected: '0',
        description: 'Generico',
        globalContent: {
            subtype: '99',
            content_restrictions: { content_code: 'comun' }
        }
    }
];

describe('Private - Common - Hooks - useSubtype', () => {
    subtypes.forEach(({ value, expected, description, globalContent }) => {
        it(`Debería traer el subtype ${description}`, () => {
            Context.useAppContext = jest.fn(() => ({
                globalContent: globalContent || { subtype: value }
            }));

            const { subtype } = useSubtype();
            expect(subtype.id).toEqual(expected);
        });
    });
});
