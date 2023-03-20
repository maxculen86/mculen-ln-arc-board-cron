/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import { Cajaopinion } from '@ln/contenidos-ui-cajaopinion';
import {
    customFieldsOpinion,
    getCardsEditorial,
    getCardsOpinion,
    getDataOpinion
} from './_helpers';
import getDataChainCollection from '../../../chains/utils/getDataChainCollection';
import {
    getCommonProps,
    getMarkupForDatalayer
} from '../../../private/LN/common/utils/cajaTemasHelperLN10';
import diagramationRules from '../../../private/common/utils/diagramationRules';
import StaticContent from '../../../private/common/staticContent';
import setRender from '../../../chains/utils/setRender';
import { validateFeatureOpinion } from './_helper-WebApi';
import '../../../../resources/packages/css/@ln/contenidos-ui-cajaopinion/index.css';
import { useRoofData } from '../../../chains/utils/_helpers';
import BuildRoof from '../../../chains/utils/_BuildRoof/default';
import getGridType from '../../../chains/utils/getGridType';

const Opinion = props => {
    const { id: featureId, customFields } = props;
    const { renderables, layout: pageLayout, tree, website, isAdmin } =
        useAppContext() || {};

    const {
        idCollectionOpinion,
        idCollectionEditorial,
        layout,
        hideCaja,
        initialPosition,
        ...propsForRoof
    } = customFields;

    const roofData = useRoofData({
        ...propsForRoof,
        title: propsForRoof.title || 'Opinión',
        isAdmin
    });

    const {
        collectionsInPage,
        notesQuantity,
        position,
        positionInsideSection
    } = getCommonProps({
        ...props,
        layout: pageLayout,
        renderables
    });

    const {
        isInSiteService,
        idsArticlesToExclude,
        diagramation,
        isHome
    } = getDataChainCollection({
        idCollectionOpinion,
        pageLayout,
        renderables,
        layout,
        initialPosition,
        collectionsInPage,
        tree,
        notesQuantity,
        featureId
    });
    const rules = diagramationRules(layout) || [];

    const { articlesEditorial, articlesOpinion } = getDataOpinion({
        idCollectionEditorial,
        idCollectionOpinion,
        idsArticlesToExclude,
        diagramation,
        initialPosition,
        isHome,
        isInSiteService,
        layout,
        notesQuantity,
        rules,
        website
    });

    const error = validateFeatureOpinion({
        idCollectionEditorial,
        idCollectionOpinion,
        articlesEditorial,
        articlesOpinion,
        layout
    });

    const { extraOptsDiv, extraOpts: viewabilityData } = getMarkupForDatalayer(
        'Opinion',
        layout,
        position,
        '',
        positionInsideSection
    );
    const {
        extraOptsDiv: extraOptsDivEditoriales,
        extraOpts: viewabilityDataEditorial
    } = getMarkupForDatalayer(
        'Editoriales',
        layout,
        position,
        '',
        positionInsideSection
    );

    const cardsEditoriales = getCardsEditorial(articlesEditorial);

    const { cardsOpinionTop = [], cardsOpinionBottom = [] } = getCardsOpinion({
        articlesOpinion,
        rules
    });

    const [cardPrincipal, cardLeft1, cardLeft2, cardRight] = cardsOpinionTop;

    const haveCardsBottom = cardsOpinionBottom && cardsOpinionBottom.length > 0;

    const [
        cardBottom1,
        cardBottom2,
        cardBottom3,
        cardBottom4
    ] = cardsOpinionBottom;

    return (
        <StaticContent>
            <div {...extraOptsDiv}>
                {setRender({
                    chainId: featureId,
                    viewabilityData,
                    isAdmin,
                    error,
                    hideBox: hideCaja,
                    extraOptions: {
                        opinion: (
                            <>
                                <BuildRoof {...roofData} />
                                <Cajaopinion gridType={getGridType(layout)}>
                                    {cardPrincipal}
                                    <Cajaopinion.OpinionFlexCol>
                                        {cardLeft1}
                                        {cardLeft2}
                                    </Cajaopinion.OpinionFlexCol>
                                    <Cajaopinion.OpinionFlexCol>
                                        <div {...extraOptsDivEditoriales}>
                                            <Cajaopinion.Cardeditoriales
                                                {...viewabilityDataEditorial}
                                            >
                                                {cardsEditoriales}
                                            </Cajaopinion.Cardeditoriales>
                                        </div>
                                        {cardRight}
                                    </Cajaopinion.OpinionFlexCol>
                                    {haveCardsBottom && cardBottom1}
                                    {haveCardsBottom && cardBottom2}
                                    {haveCardsBottom && cardBottom3}
                                    {haveCardsBottom && cardBottom4}
                                </Cajaopinion>
                            </>
                        )
                    }
                })}
            </div>
        </StaticContent>
    );
};

Opinion.label = 'LN10 Opinion';

Opinion.propTypes = {
    id: PropTypes.string.isRequired,
    customFields: PropTypes.shape({
        ...customFieldsOpinion
    }).isRequired
};

export default Opinion;
