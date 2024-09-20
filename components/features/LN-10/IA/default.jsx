import React, { useEffect, useState } from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import { groupCustomFields } from '../../../private/common/utils/propTypesHelper';
import { Collapse } from '../glossary/collapse';
import SummaryNote from '../../../private/LN/common/summaryNote';
import useTermica from '../../../private/common/hooks/useTermica';
import get from '../../../private/common/utils/get';
import { Button } from '@ln/contenidos-ui-button';
import { addEventToDataLayerV2 } from '../../../private/LN/common/utils/addEventToDataLayer';
import { determineActiveTab, handleTabChange } from './helpers';
import { Closebutton } from '@ln/common-ui-closebutton';

import '../../../../resources/packages/css/@ln/common-ui-collapse/index.css';

const LnIa = ({ customFields: { hideSummary, hideGlossary } = {} }) => {
    const { globalContent } = useAppContext();

    const [isVisible, setIsVisible] = useState(false);
    const [activeTab, setActiveTab] = useState('');

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

    const shouldShowSummary =
        !hideSummary && arrayBullets.length && isThermalSummaryEnabled;
    const shouldShowGlossary =
        !hideGlossary && glossaryData.length && isThermalGlossaryEnabled;

    useEffect(() => {
        const handleShowIa = data => {
            setIsVisible(data?.show || false);
            setActiveTab(determineActiveTab(arrayBullets, glossaryData));
        };

        window.LN.observable.subscribe('showIa', handleShowIa);

        return () => {
            window.LN.observable.unsubscribe('showIa', handleShowIa);
        };
    }, [arrayBullets, glossaryData]);

    if (!isVisible || (!shouldShowSummary && !shouldShowGlossary)) {
        return null;
    }

    return (
        <>
            {/*TODO: CAMBIAR BOTÓN POR EL DE TABS */}

            <div>
                {!!shouldShowSummary && (
                    <Button
                        id="btnIASummary"
                        title="Resumen de la nota"
                        variant="secondary"
                        dataEvent="LinkClick"
                        dataSection="IA"
                        onClick={() => {
                            handleTabChange(
                                'summary',
                                'resumen_nota',
                                setActiveTab
                            );
                        }}
                    >
                        Resumen de la nota
                    </Button>
                )}
                {!!shouldShowGlossary && (
                    <Button
                        id="btnIAGlossary"
                        title="Glosario"
                        variant="secondary"
                        dataEvent="LinkClick"
                        dataSection="IA"
                        onClick={() => {
                            handleTabChange(
                                'glossary',
                                'glosario',
                                setActiveTab
                            );
                        }}
                    >
                        Glosario
                    </Button>
                )}
            </div>

            <Closebutton
                onClick={() => {
                    addEventToDataLayerV2({
                        event: 'e_linkclick',
                        action: 'IA',
                        category: 'nota_ln9',
                        label: 'cerrar_ia'
                    });
                    setIsVisible(false);
                }}
                id={'closeButtonIA'}
                type="button"
                aria-label="Close"
                className="button ln-button"
                iconProps={{
                    className: 'icon-close',
                    color: 'dark'
                }}
            />

            {activeTab === 'summary' && shouldShowSummary && (
                <SummaryNote paragraphs={arrayBullets} className="mb-32" />
            )}
            {activeTab === 'glossary' && shouldShowGlossary && (
                <Collapse glossaryData={glossaryData} />
            )}
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
