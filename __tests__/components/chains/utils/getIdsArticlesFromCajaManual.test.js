import getIdsArticlesFromCajaManual from '../../../../components/chains/utils/getIdsArticlesFromCajaManual';

const renderables = [
    {
        collection: 'chains',
        type: 'Ln_Caja_Manual',
        children: [
            {
                props: {
                    customFields: {
                        noteId: 'KTEHDOTSHNAAVJWRTBQVVS57P4'
                    }
                }
            },
            {
                props: {
                    customFields: {
                        noteId: 'BBJOYLSSTRESHLNQVVLCJ26ZO4'
                    }
                }
            }
        ]
    },
    {
        collection: 'chains',
        type: 'Ln_Caja_Manual',
        children: [
            {
                collection: 'features',
                type: 'LN-common/articulo',
                props: {
                    customFields: {
                        noteId: 'JJJOYLSSTRESHLNQUULCJ26ZO4'
                    }
                }
            }
        ]
    }
];

const renderables2 = [
    {
        collection: 'chains',
        type: 'Ln_Caja_Manual',
        children: [
            {
                props: {
                    customFields: {
                        noteId: 'KTEHDOTSHNAAVJWRTBQVVS57P4'
                    }
                }
            },
            {
                props: {
                    customFields: {}
                }
            }
        ]
    }
];

describe('components - chains - utils - getIdsArticlesFromCajaManual', () => {
    test('Should return ids from caja manual', () => {
        expect(getIdsArticlesFromCajaManual(renderables)).toStrictEqual([
            'KTEHDOTSHNAAVJWRTBQVVS57P4',
            'BBJOYLSSTRESHLNQVVLCJ26ZO4',
            'JJJOYLSSTRESHLNQUULCJ26ZO4'
        ]);
    });

    test('If undefined return empty array', () => {
        expect(getIdsArticlesFromCajaManual(undefined)).toStrictEqual([]);
    });

    test('If some noteId is missing, exclude from final array', () => {
        expect(getIdsArticlesFromCajaManual(renderables2)).toStrictEqual([
            'KTEHDOTSHNAAVJWRTBQVVS57P4'
        ]);
    });
});
