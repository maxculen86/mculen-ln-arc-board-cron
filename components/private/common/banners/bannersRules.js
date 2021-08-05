import getParagraphCount from '../../LN/common/utils/getParagraphCount';
import get from '../utils/get';

export default {
    nota: {
        desktop: {
            adhesion_dsk: {
                validateInclusion: ({ subscription }) => subscription !== 'S'
            },
            caja3_dsk: {
                validateInclusion: ({ content_elements: contentElements }) =>
                    getParagraphCount(contentElements) >= 5
            },
            caja4_dsk: {
                validateInclusion: ({ content_elements: contentElements }) =>
                    getParagraphCount(contentElements) >= 5
            },
            caja5_dsk: {
                validateInclusion: ({ comments = {} }) =>
                    get(comments, 'display_comments', true)
            },
            middle_1_dsk: {
                validateInclusion: ({ subscription }) => subscription !== 'S'
            },
            middle_2_dsk: {
                validateInclusion: ({ subscription }) => subscription !== 'S'
            },
            middle_3_dsk: {
                validateInclusion: ({ subscription }) => subscription !== 'S'
            }
        },
        mobile: {
            adhesion_mob: {
                validateInclusion: ({ subscription }) => subscription !== 'S'
            }
        },
        tablet: {}
    }
};
