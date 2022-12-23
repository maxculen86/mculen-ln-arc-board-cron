import getProperties from 'fusion:properties';
import getPageElements from '../../../../../components/private/LN/api/v1/global/pages';
import articlesbyIds from '../../../articlesSourcebyIds';
import get from '../../../../../components/private/common/utils/get';
import getArticlesAcumulados from './apiPageAcumuladosSource/getArticlesAcumulados';
import rankingArticlesSource from '../../../rankingArticlesSource';

const getAcusbyFeatures = {
    'LN-acumulado/ultimasNoticias': getArticlesAcumulados,
    'LN-acumulado/timeline': getArticlesAcumulados
};

const getNotesIdWithImageConfig = sectionsPreview => {
    return sectionsPreview
        .filter(p => {
            return p && Array.isArray(p.articles) && p.articles?.length > 0;
        })
        .map(p => {
            return p.articles
                ?.filter(
                    x =>
                        get(x, 'additionalProperties.noteId', null) != null &&
                        get(x, 'additionalProperties.imageConfig', null) != null
                )
                .map(x => {
                    return {
                        noteId: get(
                            x,
                            'additionalProperties.noteId',
                            null
                        )?.trim(),
                        imageConfig: get(
                            x,
                            'additionalProperties.imageConfig',
                            null
                        )?.trim()
                    };
                });
        })
        .reduce((old, now, indice, vector) => {
            return old?.concat(now);
        }, []);
};

const getParamSections = sectionsPreview => {
    //return sectionsPreview;
    const findParams = sectionsPreview.filter(
        e =>
            e &&
            get(e, 'information', null) != null &&
            get(e, 'information.sections', [])?.length > 0
    );

    if (findParams && findParams?.length > 0) {
        return findParams.map(e => {
            return {
                sections: get(e, 'information.sections', []),
                size: get(e, 'information.size', 0),
                nameFeature: get(e, 'information.nameFeature', null),
                idRender: get(e, 'information.idRender', null)
            };
        });
    }
    return [];
};

const getParamRanking = (sectionsPreview, query) => {
    const { website } = query;
    //return sectionsPreview;

    const findParams = sectionsPreview
        .filter(
            e =>
                e &&
                get(e, 'information', null) != null &&
                get(e, 'information.imageConfig', null) != null &&
                get(e, 'information.sectionId', null) != null &&
                get(e, 'information.notesQuantity', null) != null &&
                get(e, 'information.nameFeature', null) ===
                    'LN-common/ranking' &&
                get(e, 'information.idRender', null) != null
        )
        ?.map(e => {
            return {
                sectionId: get(e, 'information.sectionId', null),
                size: get(e, 'information.notesQuantity', 0),
                imageConfig: get(e, 'information.imageConfig', null),
                idRender: get(e, 'information.idRender', null),
                website
            };
        });
    return findParams;
};

const getListArticlesbyNoteIds = async (pageSections, query) => {
    const { website } = query;
    const properties = getProperties(website);
    const paramsArticles = [];
    const listImageConfig = Object.keys(
        get(properties, `imageConfig.resize`, {})
    );
    const notesWithImageConfig = getNotesIdWithImageConfig(pageSections);
    // return { typesImageConfigs };
    if (!notesWithImageConfig || notesWithImageConfig?.length === 0) {
        return [];
    }
    //return notesWithImageConfig;
    const resultParamsArticle = listImageConfig?.forEach(imgConfig => {
        const filterbyImageConfig = notesWithImageConfig
            ?.filter(y => y?.imageConfig === imgConfig)
            .map(x => {
                return x?.noteId?.trim();
            });

        if (filterbyImageConfig && filterbyImageConfig?.length > 0) {
            paramsArticles.push({
                imageConfig: imgConfig,
                Ids: filterbyImageConfig.join(',')
            });
        }
    });
    //return { paramsArticles };

    const res = await Promise.all(
        paramsArticles.map(el => {
            return articlesbyIds.fetch({
                Ids: el.Ids,
                sizeMax: 100,
                imageConfig: el.imageConfig,
                published: true,
                checkExclusiveAccess: false,
                website: query?.website
            });
        })
    );
    let articleList = await Promise.all(res.map(r => r));

    //return articleList;

    articleList = articleList?.reduceRight(
        (valuePreview, valueActual, indice, array) => {
            return valuePreview?.concat(valueActual);
        },
        []
    );
    return articleList;
};

const getListArticlesbySections = async (pageSections, query) => {
    const {
        restriction,
        website,
        uri,
        title,
        configuration,
        categoryUri,
        versionUri
    } = query;

    const listParams = getParamSections(pageSections);
    //return listParams;

    const res = await Promise.all(
        listParams.map(async params => {
            const { size, sections, nameFeature, idRender } = params;
            const queryParams = {
                page: 1,
                size,
                restriction,
                website,
                uri,
                title,
                sections,
                configuration,
                categoryUri,
                versionUri
            };
            //return { queryParams };
            const articles = await getAcusbyFeatures[nameFeature](queryParams);
            //return articles;
            return {
                idRender,
                articles: get(articles, 'content_elements', [])
            };
        })
    );
    const articleList = await Promise.all(
        res.map(r => {
            return r;
        })
    );
    return articleList;
};

const getListArticlesRanking = async (pageSections, query) => {
    const {
        restriction,
        website,
        uri,
        title,
        configuration,
        categoryUri,
        versionUri,
        sectionSource
    } = query;
    //return query;
    const listParams = getParamRanking(pageSections, query);
    //return listParams;

    const res = await Promise.all(
        listParams.map(async params => {
            const { size, sectionId, imageConfig, idRender } = params;
            const queryParams = {
                sectionId,
                size,
                imageConfig,
                'arc-site': website
            };
            //return { queryParams };
            const articles = await rankingArticlesSource.fetch(queryParams);
            //return articles;
            return {
                idRender,
                articles
            };
        })
    );
    const articleList = await Promise.all(
        res.map(r => {
            return r;
        })
    );
    return articleList;
};

const assignArticlesbyNoteIds = (sections, articleList) => {
    const previewSections = sections;
    sections &&
        sections.forEach((e, i) => {
            previewSections[i].articles =
                e.articles &&
                e.articles.map((elem, index) => {
                    let article = elem;
                    const noteId = get(
                        elem,
                        'additionalProperties.noteId',
                        null
                    );
                    if (noteId != null) {
                        const articleFind = articleList.find(
                            x => x._id?.trim() === noteId?.trim()
                        );
                        if (articleFind != null) {
                            article = {
                                ...articleFind,
                                ...elem
                            };
                        }
                    }
                    return {
                        ...article
                    };
                });
        });
    return previewSections;
};

const assignArticlesbyIdRender = (sections, articleList) => {
    const previewSections = sections;
    const listRenderIds = articleList?.map(a => a.idRender);

    const setArticles = sections
        .map((v, i) => ({ v, i }))
        .filter(t => listRenderIds?.includes(get(t.v, 'information.idRender')))
        ?.forEach(t => {
            const idRender = get(t.v, 'information.idRender');
            previewSections[t.i].articles = articleList?.find(
                a => a?.idRender === idRender
            )?.articles;
        });

    return previewSections;
};

const settListArticlesbyNoteIds = async (pageSections, query) => {
    //return pageSections;
    const articleListbyNoteId = await getListArticlesbyNoteIds(
        pageSections,
        query
    );
    //return articleListbyNoteId;
    return assignArticlesbyNoteIds(pageSections, articleListbyNoteId);
};

const setListArticlesbySections = async (
    pageSections,
    query,
    newPageSections
) => {
    const articleListbySections = await getListArticlesbySections(
        newPageSections,
        query
    );
    //return articleListbySections;

    if (articleListbySections && articleListbySections?.length > 0) {
        return assignArticlesbyIdRender(pageSections, articleListbySections);
    }
    return newPageSections;
};

const setListArticlesRanking = async (pageSections, query, newPageSections) => {
    const articleListbyRanking = await getListArticlesRanking(
        newPageSections,
        query
    );
    //return articleListbyRanking;

    if (articleListbyRanking && articleListbyRanking?.length > 0) {
        return assignArticlesbyIdRender(pageSections, articleListbyRanking);
    }
    return newPageSections;
};

const transform = async (data, query) => {
    const respData = data;
    try {
        const pageSections = getPageElements(respData);
        //return pageSections;

        let newPageSections = pageSections;
        newPageSections = await settListArticlesbyNoteIds(pageSections, query);
        //return newPageSections;
        newPageSections = await setListArticlesbySections(
            pageSections,
            query,
            newPageSections
        );
        //return newPageSections;
        newPageSections = await setListArticlesRanking(
            pageSections,
            query,
            newPageSections
        );
        //return newPageSections;
        return newPageSections;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(
            `Error Transform - content/apiPageSource :  siteprops: ${JSON.stringify(
                query
            )} - errorMsj:${error.message}`
        );
        throw new Error(error);
    }
};

export default transform;
