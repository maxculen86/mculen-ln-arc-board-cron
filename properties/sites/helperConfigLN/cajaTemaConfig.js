const fontWeight = {
    medium: '--font-medium',
    extra: '--font-extra'
};
const fontSize = {
    fourXS: '--fourxs',
    twoXS: '--twoxs',
    xs: '--xs',
    m: '--m',
    l: '--l',
    xl: '--xl',
    threeXL: '--threexl'
};

export default {
    focalLeft3: {
        className: '--focal --left',
        articles: {
            0: {
                titleSize: fontSize.threeXL,
                titleWeight: fontWeight.extra,
                titleTagApertura: 'h1',
                subheadTagApertura: 'h2',
                withSubheadAndMedia: true,
                withSubhead: true,
                imageConfig: 'featuredFocalIzquierdo',
                isApertura: true
            },
            1: {
                titleSize: fontSize.l,
                withSubheadAndMedia: false,
                imageConfig: 'mediumFocalIzquierdo'
            },
            2: {
                titleSize: fontSize.l,
                withSubheadAndMedia: false,
                imageConfig: 'mediumFocalIzquierdo'
            }
        }
    },
    focalRight2: {
        className: '--focal --right',
        articles: {
            0: {
                titleSize: fontSize.l,
                withSubheadAndMedia: true,
                imageConfig: 'featuredFocalDerecho'
            },
            1: {
                titleSize: fontSize.threeXL,
                titleWeight: fontWeight.extra,
                titleTagApertura: 'h1',
                subheadTagApertura: 'h2',
                withSubheadAndMedia: true,
                imageConfig: 'mediumFocalDerecho',
                withSubhead: true,
                isApertura: true
            }
        }
    },
    notaColorRosa3: {
        className: '--highlight --pink',
        articles: {
            0: { imageConfig: 'boxArticlesVerticalArticles' },
            1: { imageConfig: 'boxArticlesVerticalArticles' },
            2: { imageConfig: 'boxArticlesVerticalArticles' }
        }
    },
    notaColorVerde3: {
        className: '--highlight --teal',
        articles: {
            0: { imageConfig: 'boxArticlesVerticalArticles' },
            1: { imageConfig: 'boxArticlesVerticalArticles' },
            2: { imageConfig: 'boxArticlesVerticalArticles' }
        }
    },
    notaColorQatar3: {
        className: '--highlight --qatar',
        articles: {
            0: { imageConfig: 'boxArticlesVerticalArticles' },
            1: { imageConfig: 'boxArticlesVerticalArticles' },
            2: { imageConfig: 'boxArticlesVerticalArticles' }
        }
    },
    author3: {
        className: '',
        articles: {
            0: { imageConfig: 'boxArticlesVerticalArticles' },
            1: { imageConfig: 'boxArticlesVerticalArticles' },
            2: { imageConfig: 'boxArticlesVerticalArticles' }
        }
    },
    grilla1: {
        className: '--cinema',
        articles: {
            0: {
                titleSize: fontSize.xl,
                titleWeight: fontWeight.extra,
                skipRenderAuthor: true,
                skipHtml: true,
                skipSubhead: true,
                imageConfig: 'boxArticlesSingleArticle'
            }
        }
    },
    grillaVideo1: {
        className: '--grilla --video',
        articles: []
    },
    grilla2: {
        className: '',
        articles: {
            0: {
                titleSize: fontSize.xl,
                titleWeight: fontWeight.medium,
                imageConfig: 'boxArticlesTwoArticles'
            },
            1: {
                titleSize: fontSize.xl,
                titleWeight: fontWeight.medium,
                imageConfig: 'boxArticlesTwoArticles'
            }
        }
    },
    grilla3: {
        className: '',
        articles: {
            0: {
                titleSizeNoMedia: fontSize.m,
                imageConfig: 'newBoxArticles'
            },
            1: { titleSizeNoMedia: fontSize.m, imageConfig: 'newBoxArticles' },
            2: { titleSizeNoMedia: fontSize.m, imageConfig: 'newBoxArticles' }
        }
    },
    grilla6: {
        className: '',
        articles: {
            0: {
                titleSizeNoMedia: fontSize.m,
                imageConfig: 'newBoxArticles'
            },
            1: { titleSizeNoMedia: fontSize.m, imageConfig: 'newBoxArticles' },
            2: { titleSizeNoMedia: fontSize.m, imageConfig: 'newBoxArticles' },
            3: { titleSizeNoMedia: fontSize.m, imageConfig: 'newBoxArticles' },
            4: { titleSizeNoMedia: fontSize.m, imageConfig: 'newBoxArticles' },
            5: { titleSizeNoMedia: fontSize.m, imageConfig: 'newBoxArticles' }
        }
    },
    grilla9: {
        className: '',
        articles: {
            0: {
                titleSizeNoMedia: fontSize.m,
                imageConfig: 'newBoxArticles'
            },
            1: { titleSizeNoMedia: fontSize.m, imageConfig: 'newBoxArticles' },
            2: { titleSizeNoMedia: fontSize.m, imageConfig: 'newBoxArticles' },
            3: { titleSizeNoMedia: fontSize.m, imageConfig: 'newBoxArticles' },
            4: { titleSizeNoMedia: fontSize.m, imageConfig: 'newBoxArticles' },
            5: { titleSizeNoMedia: fontSize.m, imageConfig: 'newBoxArticles' },
            6: { titleSizeNoMedia: fontSize.m, imageConfig: 'newBoxArticles' },
            7: { titleSizeNoMedia: fontSize.m, imageConfig: 'newBoxArticles' },
            8: { titleSizeNoMedia: fontSize.m, imageConfig: 'newBoxArticles' }
        }
    },
    bomba1: {
        className: '--bomba',
        articles: {
            0: {
                titleSize: fontSize.threeXL,
                titleTagApertura: 'h1',
                subheadTagApertura: 'h2',
                withSubheadAndMedia: true,
                imageConfig: 'bomba',
                isApertura: true
            }
        }
    },
    opinion4: {
        className: '--opinion',
        articles: {
            0: {
                titleSize: fontSize.l,
                withChapita: true,
                imageConfig: 'featuredOpinion'
            },
            1: {
                titleSize: fontSize.xs,
                authorSize: fontSize.fourXS,
                isRenderAuthorOpinion: true,
                imageConfig: 'featuredOpinion'
            },
            2: {
                titleSize: fontSize.xs,
                authorSize: fontSize.fourXS,
                isRenderAuthorOpinion: true,
                imageConfig: 'featuredOpinion'
            },
            3: {
                titleSize: fontSize.l,
                authorSize: fontSize.fourXS,
                isRenderAuthorOpinion: true,
                imageConfig: 'featuredOpinion'
            }
        }
    },
    editoriales2: {
        className: '--editoriales',
        headerSize: '--twoxs',
        articles: {
            0: {
                titleSize: fontSize.twoXS
            },
            1: {
                titleSize: fontSize.twoXS
            }
        }
    }
};
