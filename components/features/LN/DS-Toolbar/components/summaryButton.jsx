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
    if (!shouldShowSummary) return null;
    return (
        <>
            <Button
                id="btnsummary"
                isIconOnly
                variant="outline"
                color="secondary"
                title="Leer resumen"
                onClick={openIa}
            >
                <Icon name="sparkling" />
            </Button>
            <span>Resumen</span>
            <IaSummaryContainer
                isOpen={isOpen}
                summaryData={summaryData}
                onClose={closeIa}
            />
        </>
    );
}

export default SummaryButton;
