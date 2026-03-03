import React from 'react';
import { useAppContext } from 'fusion:context';
import getParagraphCount from '../../LN/common/utils/getParagraphCount';
import get from '../utils/get';
import { LIVEBLOG_EDITORIAL } from '../utils/subtypes/subtypeHelper';

export const getStickyBanner = (bannerClass, viewport) => {
    const { contextPath, deployment } = useAppContext();
    return (
        <script
            defer
            id="getStickyBanner"
            type="text/javascript"
            data-banner-classes={bannerClass}
            data-viewport={viewport}
            src={deployment(
                `${contextPath}/resources/js/LN/scriptBannerRulesSticky.min.js`
            )}
        />
    );
};

export const getScriptForComercial = () => {
    const { contextPath, deployment } = useAppContext();
    return (
        <script
            async
            id="getScriptForComercial"
            type="text/javascript"
            src={deployment(
                `${contextPath}/resources/js/LN/scriptBannerRulesComercial.min.js`
            )}
        />
    );
};

export default {
    nota: {
        desktop: {
            cabezal_dsk: {
                customScript: ({ sticky }) =>
                    sticky && getStickyBanner('.--cabezal_dsk', '.lay-sidebar')
            },
            comercial_dsk: {
                customScript: () => getScriptForComercial()
            },
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
            },
            '1x1_dsk': {
                validateInclusion: ({ subscription }) => subscription !== 'S'
            }
        },
        mobile: {
            comercial_mob: {
                customScript: () => getScriptForComercial()
            },
            adhesion_mob: {
                validateInclusion: ({ subscription }) => subscription !== 'S'
            },
            caja2_mob: {
                validateInclusion: ({ subscription, subtype }) =>
                    subtype === LIVEBLOG_EDITORIAL || subscription !== 'S'
            },
            caja5_mob: {
                validateInclusion: ({ subscription, subtype }) =>
                    subtype === LIVEBLOG_EDITORIAL || subscription !== 'S'
            },
            caja7_mob: {
                validateInclusion: ({ subscription }) => subscription !== 'S'
            },
            caja8_mob: {
                validateInclusion: ({ subscription }) => subscription !== 'S'
            },
            caja9_mob: {
                validateInclusion: ({ subscription }) => subscription !== 'S'
            },
            caja10_mob: {
                validateInclusion: ({ subscription }) => subscription !== 'S'
            },
            '1x1_mob': {
                validateInclusion: ({ subscription }) => subscription !== 'S'
            }
        },
        tablet: {
            adhesion_tab: {
                validateInclusion: ({ subscription }) => subscription !== 'S'
            },
            '1x1_tab': {
                validateInclusion: ({ subscription }) => subscription !== 'S'
            }
        }
    },
    acumulado: {
        desktop: {
            comercial_dsk: {
                customScript: () => getScriptForComercial()
            },
            adhesion_dsk: {
                validateInclusion: ({ subscription }) => subscription !== 'S'
            }
        },
        mobile: {
            adhesion_mob: {
                validateInclusion: ({ subscription }) => subscription !== 'S'
            },
            comercial_mob: {
                customScript: () => getScriptForComercial()
            }
        },
        tablet: {
            adhesion_tab: {
                validateInclusion: ({ subscription }) => subscription !== 'S'
            }
        }
    },
    home: {
        desktop: {
            comercial_dsk: {
                customScript: () => getScriptForComercial()
            },
            adhesion_dsk: {
                validateInclusion: ({ subscription }) => !subscription
            },
            '1x1_dsk': {
                validateInclusion: ({ subscription }) => !subscription
            },
            megatop_dsk: {
                customScript: () =>
                    getStickyBanner(
                        'div[data-section="pre-apertura"]',
                        '.ln-banner-container.--megatop_dsk.--megatop'
                    )
            }
        },
        mobile: {
            adhesion_mob: {
                validateInclusion: ({ subscription }) => !subscription
            },
            '1x1_mob': {
                validateInclusion: ({ subscription }) => !subscription
            },
            comercial_mob: {
                customScript: () => getScriptForComercial()
            }
        },
        tablet: {
            adhesion_tab: {
                validateInclusion: ({ subscription }) => !subscription
            },
            '1x1_tab': {
                validateInclusion: ({ subscription }) => !subscription
            }
        }
    }
};
