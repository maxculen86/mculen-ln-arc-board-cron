/* eslint-disable react-hooks/rules-of-hooks */
import config from '../../../../../properties/sites/la-nacion-ar';
import get from '../../../common/utils/get';
import { formatText } from '../../../common/utils/sectionUtils';
import sectionsValidation from '../../../../layouts/config/LN10-Home.config.json';

export const getLayoutType = (layout, artWithoutDate, _children) => {
    const types = {
        grillaUltimasNoticias: 'Timeline',
        opinion4: 'Opinion',
        editoriales2: 'Editoriales',
        focal: 'Focal'
    };

    const typesKeys = Object.keys(types);
    const resultKey = typesKeys.find(type => layout.includes(type));

    return (
        (resultKey && types[resultKey]) ||
        (artWithoutDate && artWithoutDate.length && 'Grilla') ||
        (_children && _children.length && 'ArticleFeature')
    );
};

// TODO:  reemplezar por el que esta en cajaTemasHelper
export const getCommonProps = props => {
    const {
        customFields: { layout = 'grilla3', backgroundColor },
        renderables = [],
        id: idFeature,
        globalContent: { name, acumuladoGeneral } = {},
        layout: pageBuilderLayout
    } = props;

    const { layoutsName = {} } = config || {};
    const { collectionsInPage = [] } = [];
    const notesQuantity = (layout && Number(layout.slice(-1))) || 3;

    const positionInsideSection = findPositionInsideSection(
        idFeature,
        renderables
    );

    const sectionName = formatText(
        pageBuilderLayout === layoutsName.HomeLN10 ? '' : `${name}_`
    );

    return {
        collectionsInPage,
        notesQuantity,
        sectionName,
        positionInsideSection
    };
};

export const findPositionInPageBuilder = (idFeature, renderables = []) => {
    return (
        renderables
            .filter(ren => ren.collection === 'chains')
            .filter(
                chain =>
                    get(chain, 'props.customFields.hideCaja', false) !== true
            )
            .findIndex(chain => chain.props.id === idFeature) || 0
    );
};

export const findPositionInsideSection = (idFeature, renderables = []) => {
    const sections = renderables.filter(ren => ren.collection === 'sections');
    const mySection = sections.find(sec =>
        sec.children.find(child => child.props.id === idFeature)
    ) || { children: [] };
    const position = mySection.children.findIndex(
        child => child.props.id === idFeature
    );

    return `0${Number(position) + 1}`.slice(-2);
};

export const calculateSizeOfCollection = (collections, notesQuantity) => {
    const totalArticlesInCollections = collections.reduce(
        (total, currentValue) => {
            return total + currentValue.articles.length;
        },
        0
    );
    const totalArticlesToAsk = notesQuantity + totalArticlesInCollections;
    return totalArticlesToAsk < 20 ? totalArticlesToAsk : 20;
};

export const getChildrenFromSectionHome = (
    renderables,
    sectionName,
    sectionPosition
) => {
    const INDEX_SECTION =
        get(sectionsValidation, `${sectionName}.position`, sectionPosition) + 1;

    return get(renderables, `[${INDEX_SECTION}].children`, []) || [];
};

export const hastVariant = (childProps = []) => {
    return childProps.some(
        elem => elem && elem.variants && !!Object.keys(elem.variants).length
    );
};

export const getChildrenFromAperturaHome = (renderables, childProps) => {
    const hasVariantForABTesting = hastVariant(childProps) || false;
    return hasVariantForABTesting
        ? getChildrenFromSectionHome(renderables, 'Apertura_1', 3)
        : [
              ...getChildrenFromSectionHome(renderables, 'Apertura_1', 3),
              ...getChildrenFromSectionHome(renderables, 'Apertura_2', 4)
          ];
};

export const getArticlesIdsFromApertura = (renderables = []) => {
    const childrenFromApertura = getChildrenFromAperturaHome(renderables);
    const ids = [];
    childrenFromApertura.forEach(section => {
        get(section, 'children', []).forEach(child => {
            if (
                child.collection === 'features' &&
                get(child, 'props.type') === 'LN-common/articulo'
            ) {
                ids.push(get(child, 'props.customFields.noteId', ''));
            }
        });
    });
    return ids.join();
};

export const isInApertura = (idFeature, tree = {}) => {
    const sectionApertura = get(tree, 'children[4].children', []);
    return sectionApertura.find(child => child.props.id === idFeature);
};

export const validateoutItem = itemNota => {
    const regex = new RegExp(`/video/`);
    const results = regex.exec(itemNota.url_nota);
    if (results) return false;

    return true;
};

export const getArticlesOfChain = ({
    isInSiteService,
    articlesFromCollectionSiteService = [],
    articlesToShow = []
}) => (isInSiteService ? articlesFromCollectionSiteService : articlesToShow);
