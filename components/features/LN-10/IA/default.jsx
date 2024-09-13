import React, { useEffect, useState } from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import { groupCustomFields } from '../../../private/common/utils/propTypesHelper';
import { Collapse } from '../glossary/collapse';
import SummaryNote from '../../../private/LN/common/summaryNote';
import useTermica from '../../../private/common/hooks/useTermica';
import get from '../../../private/common/utils/get';
import { Button } from '@ln/contenidos-ui-button';

import '../../../../resources/packages/css/@ln/common-ui-collapse/index.css';

const LnIa = ({ customFields: { hideSummary, hideGlossary } = {} }) => {
    const { globalContent } = useAppContext();

    const [isVisible, setIsVisible] = useState(false);
    const [activeTab, setActiveTab] = useState('summary');

    useEffect(() => {
        const handleShowIa = data => {
            setIsVisible(data?.show || false);
        };

        window.LN.observable.subscribe('showIa', handleShowIa);

        return () => {
            window.LN.observable.unsubscribe('showIa', handleShowIa);
        };
    }, []);

    if (!isVisible) return null;

    const glossaryData = get(
        globalContent,
        'promo_items.glossary.embed.config.arrayData',
        []
    );
    const isThermalGlossaryEnabled = useTermica('glosario');

    const arrayBullets = get(
        globalContent,
        'promo_items.summary.embed.config.arrayBullets',
        []
    );
    const isThermalSummaryEnabled = useTermica('resumen_nota');

    if (
        (hideGlossary || !glossaryData.length || !isThermalGlossaryEnabled) &&
        (hideSummary || !isThermalSummaryEnabled)
    ) {
        return null;
    }

    const shouldShowSummary =
        !hideSummary && arrayBullets.length && isThermalSummaryEnabled;
    const shouldShowGlossary =
        !hideGlossary && glossaryData.length && isThermalGlossaryEnabled;

    return (
        <>
            {/*TODO: CAMBIAR BOTÓN POR EL DE TABS */}
            {shouldShowSummary ? (
                <Button
                    id="btnIASummary"
                    title="Resumen de la nota"
                    variant="secondary"
                    dataEvent="LinkClick"
                    dataSection="IA"
                    onClick={() => {
                        setActiveTab('summary');
                    }}
                >
                    Resumen de la nota
                </Button>
            ) : null}
            {shouldShowGlossary ? (
                <Button
                    id="btnIAGlossary"
                    title="Glosario"
                    variant="secondary"
                    dataEvent="LinkClick"
                    dataSection="IA"
                    onClick={() => {
                        setActiveTab('glossary');
                    }}
                >
                    Glosario
                </Button>
            ) : null}
            {activeTab === 'summary' && shouldShowSummary ? (
                <SummaryNote paragraphs={arrayBullets} className="mb-32" />
            ) : null}
            {activeTab === 'glossary' && shouldShowGlossary ? (
                <Collapse glossaryData={glossaryData} />
            ) : null}
        </>
    );
};

LnIa.label = 'LN-IA';

LnIa.propTypes = {
    customFields: PropTypes.shape({
        hideSummary: PropTypes.bool.tag({
            name: 'Ocultar Resumen',
            description: 'Definí la visibilidad del resumen',
            default: false,
            group: groupCustomFields
        }),
        hideGlossary: PropTypes.bool.tag({
            name: 'Ocultar Glosario',
            description: 'Definí la visibilidad del glosario',
            default: false,
            group: groupCustomFields
        })
    })
};

LnIa.defaultProps = {
    customFields: {
        hideSummary: false,
        hideGlossary: false
    }
};

export default LnIa;
