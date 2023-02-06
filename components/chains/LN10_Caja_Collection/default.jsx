/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import '../../../resources/packages/css/@ln/contenidos-ui-bngrid/index.css';
import CajaTema from '../../private/LN/common/cajaTema';
import {
    getArticlesOfChain,
    getCommonProps,
    isInApertura
} from '../../private/LN/common/utils/cajaTemasHelperLN10';
import { getPlaceholder } from '../../private/LN/common/utils/cajaTemasPlaceholder';
import { productClickFromClient } from '../../private/common/utils/viewability';
import StaticContent from '../../private/common/staticContent';
import getDataChainCollection from '../utils/getDataChainCollection';
import getArticleInCollection from '../../private/LN/common/hooks/useGetArticleInCollection';
import { validateChain, getBreakingChildren } from './_helper';
import ExclusiveSubscriptor from '../../private/LN10/home/components/exclusiveSubscriptor/default';
import setCommonCustomFields from '../utils/setCommonCustomFields';
import diagramationRules from '../../private/common/utils/diagramationRules';
import checkChildInSection from '../../private/LN/common/utils/LN10/checkChildBySection';
import setRender from '../utils/setRender';

export const roofData = {
    textButton: 'Text button',
    hrefButton: 'https://www.lanacion.com.ar/',
    links: [
        {
            text: 'LA NACION',
            href: 'https://www.lanacion.com.ar/',
            target: 'blank'
        },
        {
            text: 'LA NACION',
            href: 'https://www.lanacion.com.ar/',
            target: 'blank'
        },
        {
            text: 'LA NACION',
            href: 'https://www.lanacion.com.ar/',
            target: 'blank'
        }
    ],
    logo: {
        src:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Logo_La_Naci%C3%B3n.svg/1200px-Logo_La_Naci%C3%B3n.svg.png',
        alt: 'imagen ejemplo alt',
        width: 55,
        height: 55
    }
};

const CajaCollection = props => {
    const {
        id: chainId,
        isAdmin,
        customFields: {
            idCollection,
            url,
            title,
            layout = '',
            initialPosition,
            imageId,
            hideTitle,
            hideCaja,
            website,
            chainStyle
        },
        outputType,
        renderables,
        tree = {},
        layout: pageLayout
    } = props;

    const {
        collectionsInPage,
        notesQuantity,
        classCondition,
        position,
        sectionName,
        positionInsideSection
    } = getCommonProps(props);

    const {
        isInSiteService,
        articlesFromCollectionSiteService,
        idsArticlesToExclude,
        titleSize,
        diagramation,
        isHome
    } = getDataChainCollection({
        idCollection,
        pageLayout,
        renderables,
        layout,
        initialPosition,
        collectionsInPage,
        tree,
        notesQuantity,
        featureId: chainId
    });

    const breakingsChildren = getBreakingChildren(renderables);
    const isInBreakings = checkChildInSection(chainId, breakingsChildren);

    const isExclusiveSuscriptor = chainStyle === 'exclusiveSub';

    const articlesToShow = !isInSiteService
        ? getArticleInCollection(
              isExclusiveSuscriptor ? 5 : notesQuantity,
              diagramation,
              idCollection,
              20,
              Number(initialPosition) - 1,
              idsArticlesToExclude,
              true,
              !isInSiteService,
              layout,
              website,
              isHome
          )
        : [];

    const _articles = getArticlesOfChain({
        isInSiteService,
        articlesFromCollectionSiteService,
        articlesToShow
    });

    const error = validateChain({
        idCollection,
        renderables,
        layout,
        articles: _articles,
        chainId,
        isInBreakings
    });

    const Component = (
        <CajaTema
            title={title}
            hideTitle={hideTitle}
            url={url}
            imageId={imageId}
            outputType={outputType}
            layout={layout}
            classCondition={`${classCondition}${(isInApertura &&
                layout.includes('focal') &&
                ' --apertura') ||
                ''}`}
            notesQuantity={notesQuantity}
            position={position}
            positionInsideSection={positionInsideSection}
            sectionName={sectionName}
            articles={_articles}
            titleSize={titleSize}
            handleClick={productClickFromClient}
            pageLayout={pageLayout}
        />
    );

    const noStaticComponent =
        (_articles && _articles.length && Component) || getPlaceholder(layout);

    return setRender({
        isAdmin,
        error,
        hideBox: hideCaja,
        extraOptions: {
            isExclusiveSuscriptor: isExclusiveSuscriptor && (
                <ExclusiveSubscriptor
                    layout={layout}
                    roof={roofData}
                    rules={diagramationRules(layout)}
                    articles={_articles}
                />
            ),
            isHome: isHome && <StaticContent>{Component}</StaticContent>,
            default: noStaticComponent
        }
    });
};

CajaCollection.label = 'LN10 Caja Collection';

CajaCollection.propTypes = {
    id: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool,
    outputType: PropTypes.string,
    renderables: PropTypes.arrayOf(
        PropTypes.shape({
            type: PropTypes.string,
            props: PropTypes.shape({
                customFields: PropTypes.shape({
                    layout: PropTypes.string,
                    idCollection: PropTypes.string,
                    initialPosition: PropTypes.number
                })
            })
        })
    ),
    customFields: PropTypes.shape({
        ...setCommonCustomFields('cajaCollection')
    }),
    tree: PropTypes.shape(PropTypes.node),
    globalContent: PropTypes.shape({
        name: PropTypes.string
    })
};

export default Consumer(CajaCollection);
