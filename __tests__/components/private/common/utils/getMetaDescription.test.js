import getMetaDescription from '../../../../../components/private/common/utils/getMetaDescription';

jest.mock(
    '../../../../../components/private/common/utils/transformISODate',
    () => jest.fn().mockReturnValue('14/09/2023')
);

describe('Common - utils - getMetaDescription.js', () => {
    const cases = [
        [
            'With description',
            'La descripcion',
            'Title hasta el primer punto.',
            'Subheadline',
            '1',
            '',
            'La descripcion - LA NACION'
        ],
        [
            'Without description must be subheadline',
            '',
            'Title hasta el primer punto.',
            'Subheadline',
            '1',
            '',
            'Subheadline - LA NACION'
        ],
        [
            'Without description and subheadline must be title',
            '',
            'Title hasta el primer punto.',
            '',
            '1',
            '',
            'Title hasta el primer punto. - LA NACION'
        ]
    ];
    test.each(cases)(
        '%s',
        (
            message,
            description,
            title,
            subheadline,
            subtype,
            publishedTime,
            result
        ) => {
            const metaDescription = getMetaDescription(
                description,
                title,
                subheadline,
                subtype,
                publishedTime
            );
            expect(metaDescription).toBe(result);
        }
    );
});

describe('Common - utils - getMetaDescription.js', () => {
    test('for receta (subtype 7)', () => {
        const metaDescription = getMetaDescription(
            '',
            'Pastel de papa con canela',
            'Subheadline hasta el primer punto. Mas subheadline',
            '7',
            ''
        );
        expect(metaDescription).toStrictEqual(
            'Subheadline hasta el primer punto. Encontrá acá la receta de Pastel de papa con canela - LA NACION'
        );
    });
});

describe('Common - utils - getMetaDescription.js for video (subtype 5)', () => {
    const cases = [
        [
            'Without subheadline must be video title plus publishedDate',
            '',
            'Title',
            '',
            '5',
            '2023-09-14T16:02:28.163Z',
            'Video de Title - 14/09/2023 - LA NACION'
        ],
        [
            'With subheadlines must be subheadline',
            'La descripcion',
            'Title',
            'Subheadline',
            '5',
            '2023-09-14T16:02:28.163Z',
            'Subheadline - LA NACION'
        ]
    ];
    test.each(cases)(
        '%s',
        (
            message,
            description,
            title,
            subheadline,
            subtype,
            publishedTime,
            result
        ) => {
            const metaDescription = getMetaDescription(
                description,
                title,
                subheadline,
                subtype,
                publishedTime
            );
            expect(metaDescription).toBe(result);
        }
    );
});
