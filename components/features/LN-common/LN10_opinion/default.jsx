/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import Static from 'fusion:static';
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
} from '../../../private/LN/common/utils/cajaTemasHelper';
import diagramationRules from '../../../private/common/utils/diagramationRules';
import setRender from '../../../chains/utils/setRender';
import { validateFeatureOpinion } from './_helper-WebApi';
import { useRoofData } from '../../../chains/utils/_helpers';
import BuildRoof from '../../../chains/utils/_BuildRoof/default';
import getGridType from '../../../chains/utils/getGridType';
import getViewabilityRoof from '../../../chains/utils/getViewabilityRoof';

function Opinion(props) {
    const { id: featureId, customFields } = props;
    const {
        renderables,
        layout: pageLayout,
        tree,
        website,
        isAdmin
    } = useAppContext() || {};

    const {
        idCollectionOpinion,
        idCollectionEditorial,
        layout,
        hideCaja,
        initialPosition,
        url,
        ...propsForRoof
    } = customFields;

    const viewabilityRoof = getViewabilityRoof(
        featureId,
        renderables,
        propsForRoof
    );

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

    const { isInSiteService, idsArticlesToExclude, diagramation, isHome } =
        getDataChainCollection({
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
        isInSiteService,
        layout,
        notesQuantity,
        rules,
        website,
        isHome
    });

    const error = validateFeatureOpinion({
        idCollectionEditorial,
        idCollectionOpinion,
        articlesEditorial,
        articlesOpinion,
        layout
    });

    const roofData = useRoofData({
        ...propsForRoof,
        title: propsForRoof.title || 'Opinión',
        link: url,
        isAdmin,
        isStatic: true,
        shouldLoadRoof: !hideCaja
    });

    const { extraOptsDiv, extraOpts: viewabilityData } = getMarkupForDatalayer(
        'Opinion',
        layout,
        position,
        '',
        positionInsideSection,
        false,
        false,
        viewabilityRoof
    );
    const {
        extraOptsDiv: extraOptsDivEditoriales,
        extraOpts: viewabilityDataEditorial
    } = getMarkupForDatalayer(
        'Editoriales',
        layout,
        position,
        '',
        positionInsideSection,
        false,
        false,
        viewabilityRoof
    );

    const cardsEditoriales = getCardsEditorial(articlesEditorial);

    const { cardsOpinionTop = [], cardsOpinionBottom = [] } = getCardsOpinion({
        articlesOpinion,
        rules
    });

    const [cardPrincipal, cardLeft1, cardLeft2, cardRight] = cardsOpinionTop;

    const haveCardsBottom = cardsOpinionBottom && cardsOpinionBottom.length > 0;

    const [cardBottom1, cardBottom2, cardBottom3, cardBottom4] =
        cardsOpinionBottom;

    return (
        <Static id={featureId} htmlOnly>
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
        </Static>
    );
}

Opinion.label = 'LN10 Opinion';

Opinion.propTypes = {
    id: PropTypes.string.isRequired,
    customFields: PropTypes.shape({
        ...customFieldsOpinion
    }).isRequired
};

export default Opinion;
