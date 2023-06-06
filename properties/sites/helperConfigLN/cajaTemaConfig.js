const fontExtra = '--font-extra';

export default {
    focalLeft3: {
        className: '--focal --left',
        articles: {
            0: {
                titleSize: '--threexl',
                titleWeight: fontExtra,
                titleTagApertura: 'h1',
                subheadTagApertura: 'h2',
                withSubheadAndMedia: true,
                withSubhead: true,
                imageConfig: 'featuredFocalIzquierdo',
                isApertura: true
            },
            1: {
                titleSize: '--l',
                withSubheadAndMedia: false,
                imageConfig: 'mediumFocalIzquierdo'
            },
            2: {
                titleSize: '--l',
                withSubheadAndMedia: false,
                imageConfig: 'mediumFocalIzquierdo'
            }
        }
    },
    focalRight2: {
        className: '--focal --right',
        articles: {
            0: {
                titleSize: '--l',
                withSubheadAndMedia: true,
                imageConfig: 'featuredFocalDerecho'
            },
            1: {
                titleSize: '--threexl',
                titleWeight: fontExtra,
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
                titleSize: '--xl',
                titleWeight: fontExtra,
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
                titleSize: '--xl',
                titleWeight: fontExtra,
                imageConfig: 'boxArticlesTwoArticles'
            },
            1: {
                titleSize: '--xl',
                titleWeight: fontExtra,
                imageConfig: 'boxArticlesTwoArticles'
            }
        }
    },
    grilla3: {
        className: '',
        articles: {
            0: {
                titleSizeNoMedia: '--m',
                imageConfig: 'boxArticles'
            },
            1: { titleSizeNoMedia: '--m', imageConfig: 'boxArticles' },
            2: { titleSizeNoMedia: '--m', imageConfig: 'boxArticles' }
        }
    },
    grilla6: {
        className: '',
        articles: {
            0: {
                titleSizeNoMedia: '--m',
                imageConfig: 'boxArticles'
            },
            1: { titleSizeNoMedia: '--m', imageConfig: 'boxArticles' },
            2: { titleSizeNoMedia: '--m', imageConfig: 'boxArticles' },
            3: { titleSizeNoMedia: '--m', imageConfig: 'boxArticles' },
            4: { titleSizeNoMedia: '--m', imageConfig: 'boxArticles' },
            5: { titleSizeNoMedia: '--m', imageConfig: 'boxArticles' }
        }
    },
    grilla9: {
        className: '',
        articles: {
            0: {
                titleSizeNoMedia: '--m',
                imageConfig: 'boxArticles'
            },
            1: { titleSizeNoMedia: '--m', imageConfig: 'boxArticles' },
            2: { titleSizeNoMedia: '--m', imageConfig: 'boxArticles' },
            3: { titleSizeNoMedia: '--m', imageConfig: 'boxArticles' },
            4: { titleSizeNoMedia: '--m', imageConfig: 'boxArticles' },
            5: { titleSizeNoMedia: '--m', imageConfig: 'boxArticles' },
            6: { titleSizeNoMedia: '--m', imageConfig: 'boxArticles' },
            7: { titleSizeNoMedia: '--m', imageConfig: 'boxArticles' },
            8: { titleSizeNoMedia: '--m', imageConfig: 'boxArticles' }
        }
    },
    bomba1: {
        className: '--bomba',
        articles: {
            0: {
                titleSize: '--threexl',
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
                titleSize: '--l',
                withChapita: true,
                imageConfig: 'featuredOpinion'
            },
            1: {
                titleSize: '--xs',
                authorSize: '--fourxs',
                isRenderAuthorOpinion: true,
                imageConfig: 'featuredOpinion'
            },
            2: {
                titleSize: '--xs',
                authorSize: '--fourxs',
                isRenderAuthorOpinion: true,
                imageConfig: 'featuredOpinion'
            },
            3: {
                titleSize: '--l',
                authorSize: '--fourxs',
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
                titleSize: '--twoxs'
            },
            1: {
                titleSize: '--twoxs'
            }
        }
    }
};
