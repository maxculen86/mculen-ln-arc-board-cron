import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';
import NotaApertura from '../../private/LN/acumulado/notaApertura';
import useGlobalProviderAcu from '../../private/LN/acumulado/hooks/useGlobalProviderAcu';
import StaticContent from '../../private/common/staticContent';
import checkHydrateOnly from '../../private/LN/common/utils/checkHydrateOnly';

const AperturaFeature = props => {
    const { outputType = 'default', globalContent = {}, id: featureId } = props;
    const { node_type: nodeType } = globalContent;
    const { articlesInCollection = [] } = useGlobalProviderAcu();
    const hasHydrateOnly = checkHydrateOnly({ nodeType });

    const Component = (
        <NotaApertura
            {...props}
            articlesInCollection={articlesInCollection}
            outputType={outputType}
        />
    );

    return hasHydrateOnly ? (
        <StaticContent>{Component}</StaticContent>
    ) : (
        <Static id={featureId}>{Component}</Static>
    );
};

AperturaFeature.propTypes = {
    outputType: PropTypes.func.isRequired,
    globalContent: PropTypes.shape({
        node_type: PropTypes.string
    }).isRequired
};

AperturaFeature.label = 'LN-Acumulado-Apertura';

export default Consumer(AperturaFeature);
