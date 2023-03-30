/* eslint-disable react/prop-types */
/* eslint-disable react/no-danger */
import React from 'react';
import getParagraphCount from '../../LN/common/utils/getParagraphCount';
import get from '../utils/get';

export default {
    nota: {
        desktop: {
            cabezal_dsk: {
                customScript: ({ sticky }) => {
                    return (
                        sticky &&
                        getStickyBanner(
                            '.--cabezal_dsk',
                            '.lay-sidebar',
                            'header'
                        )
                    );
                }
            },
            comercial_dsk: {
                customScript: () => {
                    return getScriptForComercial('comercial_dsk');
                }
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
                customScript: () => {
                    return getScriptForComercial('comercial_mob');
                }
            },
            adhesion_mob: {
                validateInclusion: ({ subscription }) => subscription !== 'S'
            },
            caja2_mob: {
                validateInclusion: ({ subscription }) => subscription !== 'S'
            },
            caja5_mob: {
                validateInclusion: ({ subscription }) => subscription !== 'S'
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
                customScript: () => {
                    return getScriptForComercial('comercial_dsk');
                }
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
                customScript: () => {
                    return getScriptForComercial('comercial_mob');
                }
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
                customScript: () => {
                    return getScriptForComercial('comercial_dsk');
                }
            },
            adhesion_dsk: {
                validateInclusion: ({ subscription }) => !subscription
            },
            '1x1_dsk': {
                validateInclusion: ({ subscription }) => !subscription
            },
            megatop_dsk: {
                customScript: () => {
                    return getStickyBanner(
                        'div[data-section="pre-apertura"]',
                        '.ln-banner-container.--megatop_dsk.--megatop'
                    );
                }
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
                customScript: () => {
                    return getScriptForComercial('comercial_mob');
                }
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

export const getStickyBanner = (bannerClass, viewport, header) => {
    return (
        <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
                __html: `
                window.addEventListener('DOMContentLoaded', () => {
                    const banner = document.querySelector('${bannerClass}') || {};
                    const header = document.querySelector("#${header}");                 
                    const viewportLimit = document.querySelector('${viewport}') || {};
                    let oldScrollY = window.scrollY;
                    
                    window.addEventListener('scroll', () => {
                        const isScrollUp = oldScrollY > window.scrollY
                        const { top: topViewportLimit } = viewportLimit.getBoundingClientRect();
                        const viewPoint = topViewportLimit - banner.clientHeight - (${header} ? header.clientHeight : 0);

                        if (viewPoint <= 0 && banner.classList.contains('--sticky')) {
                            banner.classList.remove('--sticky');
                            banner.style.top = Math.abs(viewportLimit.offsetTop - banner.clientHeight) + 'px';
                            banner.style.position = 'relative';
                        } else if (viewPoint > 0 && !banner.classList.contains('--sticky')) {
                            banner.classList.add('--sticky');
                            banner.style.cssText = '';
                        }

                        if (isScrollUp) {
                            banner.classList.remove('--sticky');
                            banner.style.top = '0';
                        }

                        oldScrollY = window.scrollY;
                    })
                })
            `
            }}
        />
    );
};

export const getScriptForComercial = slodId => {
    return (
        <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
                __html: `
                window.addEventListener('DOMContentLoaded', () => {
                    setTimeout(function(){
                        
                        const bannerComercial = document.getElementById("${slodId}");
                        bannerComercial && bannerComercial.parentNode.classList.add('hlp-none');
                      },12000)
                })
            `
            }}
        />
    );
};
