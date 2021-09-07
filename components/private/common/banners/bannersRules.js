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
                        getScriptForCabezalSticky(
                            'header',
                            'lay-sidebar',
                            'cabezal_dsk'
                        )
                    );
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
            adhesion_mob: {
                validateInclusion: ({ subscription }) => subscription !== 'S'
            },
            caja2_mob: {
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
            }
        },
        mobile: {
            sticky2_mob: {
                validateInclusion: ({ subscription }) => subscription !== 'S'
            },
            comercial_mob: {
                customScript: () => {
                    return getScriptForComercial('comercial_mob');
                }
            }
        }
    },
    home: {
        desktop: {
            adhesion_dsk: {
                validateInclusion: ({ subscription }) => !subscription
            },
            '1x1_dsk': {
                validateInclusion: ({ subscription }) => !subscription
            }
        },
        mobile: {
            adhesion_mob: {
                validateInclusion: ({ subscription }) => !subscription
            },
            '1x1_mob': {
                validateInclusion: ({ subscription }) => !subscription
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

const getScriptForCabezalSticky = (header, sidebar, classCabezal) => {
    return (
        <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
                __html: `
                window.addEventListener('DOMContentLoaded', () => {
                    const sidebar = document.querySelector(".${sidebar}") || {};
                    const header = document.querySelector("#${header}") || {};                    
                    const cabezal = document.querySelector('.--${classCabezal}') || {};
                    window.addEventListener('scroll', () => {
                        const { top: topSidebar } = sidebar.getBoundingClientRect();
                        const viewPoint = topSidebar - cabezal.clientHeight - header.clientHeight;
                        if (viewPoint <= 0 && cabezal.classList.contains('--sticky')) {
                            const { top: topCabezal } = cabezal.getBoundingClientRect();
                            cabezal.classList.remove('--sticky');
                            cabezal.style.top = Math.abs(sidebar.offsetTop - cabezal.clientHeight) + 'px';
                            cabezal.style.position = 'relative';
                            cabezal.style.zIndex = '101';
                        } else if (viewPoint > 0 && !cabezal.classList.contains('--sticky')) {
                            cabezal.classList.add('--sticky');
                            cabezal.style.cssText = '';
                        }
                    });
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
                        document.getElementById("${slodId}").parentNode.classList.add('hlp-none');
                      },10000)
                })
            `
            }}
        />
    );
};
