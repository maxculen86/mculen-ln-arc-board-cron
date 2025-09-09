/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import { Card } from '@ln/contenidos-ui-card';
import setCommonCustomFields from '../../../chains/utils/setCommonCustomFields';
import getArticleInCollection from '../../../private/LN/common/hooks/useGetArticleInCollection';
import getCardConfig, {
    getTitleAndLeadForHome
} from '../../../private/LN10/home/components/CommonCollection/_helper';
import { getDataAttributesForViewability } from '../../LN-10/article/_helper';
import getAuthorsAsString from '../../../private/common/utils/getAuthorsAsString';
import get from '../../../private/common/utils/get';

const ajusCollection = 'Ajuste Collection';

export const getDataOpinion = ({
    idCollectionOpinion,
    idCollectionEditorial,
    rules,
    notesQuantity,
    initialPosition,
    idsArticlesToExclude,
    diagramation,
    isInSiteService,
    layout,
    website,
    isHome
}) => {
    const articlesOpinion = !isInSiteService
        ? getArticleInCollection({
              notesQuantity: rules.length || notesQuantity,
              diagramation,
              idCollection: idCollectionOpinion,
              size: 20,
              initialPosition: Number(initialPosition) - 1,
              idCollectionsInPage: idsArticlesToExclude,
              filterRecomendar: true,
              filterRepetead: !isInSiteService,
              layout,
              website,
              staticMode: isHome
          })
        : [];

    const articlesEditorial = !isInSiteService
        ? getArticleInCollection({
              notesQuantity: 2,
              diagramation,
              idCollection: idCollectionEditorial,
              size: 20,
              initialPosition: 0,
              idCollectionsInPage: [],
              filterRecomendar: true,
              filterRepetead: !isInSiteService,
              layout,
              website,
              staticMode: isHome
          })
        : [];
    return {
        articlesOpinion,
        articlesEditorial
    };
};
export const editorialRules = [
    {
        cardSize: 'm',
        imagePosition: {
            mobile: 'img-right',
            tablet: 'img-bottom',
            desktop: 'img-bottom'
        },
        isLoadWithPicture: true
    },
    {
        cardSize: 'm',
        imagePosition: {
            mobile: 'img-none',
            tablet: 'img-none',
            desktop: 'img-none'
        },
        isLoadWithPicture: true
    }
];
const createCards = ({ articles = [], skipCard = 0, rules }) =>
    articles.map((article, indexArray) => {
        const index = indexArray + skipCard;
        const { cardSize, marqueeImg, withImage, mediaData } = getCardConfig(
            rules[index],
            article
        );
        const { titleTag, subheadTag } = rules[index];

        const extraOpts = getDataAttributesForViewability(
            article._id,
            '98',
            index
        );

        const { title } = getTitleAndLeadForHome(article, true);
        const author = getAuthorsAsString(article, true);
        return (
            <Card
                variant="author"
                title={title}
                href={get(article, 'website_url', '')}
                titleTag={titleTag}
                subheadTag={subheadTag}
                marquee={author}
                marqueeImg={marqueeImg}
                mediaData={mediaData}
                cardSize={cardSize}
                withMedia={withImage}
                {...extraOpts}
            />
        );
    }) || [];
export const getCardsOpinion = ({ articlesOpinion = [], rules }) => {
    const quantityOpinionTop = 4;
    const haveCardsBottom = articlesOpinion.length === 8;
    const cardsOpinionTop = createCards({
        articles: articlesOpinion.slice(0, quantityOpinionTop),
        rules
    });

    const cardsOpinionBottom =
        haveCardsBottom &&
        createCards({
            articles: articlesOpinion.slice(-quantityOpinionTop),
            skipCard: quantityOpinionTop,
            rules
        });

    return {
        cardsOpinionTop: cardsOpinionTop || [],
        cardsOpinionBottom: cardsOpinionBottom || []
    };
};

export const getCardsEditorial = (articlesEditorial = []) =>
    articlesEditorial.map((article, index) => {
        const { cardSize, imagePosition, mediaData } = getCardConfig(
            editorialRules[index],
            article
        );

        const extraOpts = getDataAttributesForViewability(
            article._id,
            '99',
            index
        );

        const { title } = getTitleAndLeadForHome(article, true);
        return (
            <Card
                title={title}
                href={get(article, 'website_url', '')}
                mediaData={mediaData}
                cardSize={cardSize}
                imagePosition={imagePosition}
                {...extraOpts}
            />
        );
    }) || [];

export const customFieldsOpinion = {
    idCollectionOpinion: PropTypes.string.tag({
        label: 'ID opinion',
        description: 'Ingrese aquí el ID de la collection de opinion',
        defaultValue: '',
        group: ajusCollection,
        hidden: false
    }).isRequired,
    idCollectionEditorial: PropTypes.string.tag({
        label: 'ID editorial',
        description: 'Ingrese aquí el ID de la collection de editorial',
        defaultValue: '',
        group: ajusCollection,
        hidden: false
    }).isRequired,
    ...setCommonCustomFields('cajaOpinion')
};

export default customFieldsOpinion;
