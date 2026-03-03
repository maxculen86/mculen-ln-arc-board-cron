import React from 'react';
import Button from '../../../ui/ln/button/default';
import Icon from '../../../ui/ln/icon/default';
import IaSummaryContainer from '../../common/iaSummary/iaSummaryContainer';

function SummaryButton({
    isOpen,
    summaryData,
    openIa,
    closeIa,
    shouldShowSummary
}) {
    // TODO: Alternar icono correcto, sparkling (desactivado) sparkling-filled (activado) cuando se active el resumen en el nuevo cuerpo.
    if (!shouldShowSummary) return null;
    return (
        <>
            <Button
                id="btnsummary"
                variant="outline"
                size="custom"
                className="h-40 w-40 md:w-fit border border-secondary-default rounded-4 px-8 py-12 md:px-12"
                color="secondary"
                textTransform="none"
                title="Leer resumen"
                iconLeft={<Icon name="sparkling" />}
                onClick={openIa}
            >
                <span className="max-md:hidden text-label-sm">Resumen</span>
            </Button>
            <IaSummaryContainer
                isOpen={isOpen}
                summaryData={summaryData}
                onClose={closeIa}
            />
        </>
    );
}

export default SummaryButton;
