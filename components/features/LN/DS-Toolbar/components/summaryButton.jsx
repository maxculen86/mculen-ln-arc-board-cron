import React from 'react';
import Button from '../../../ui/ln/button/default';
import Icon from '../../../ui/ln/icon/default';

function SummaryButton({ onOpen, onClose, shouldShowSummary, isOpen }) {
    if (!shouldShowSummary) return null;
    const toggleOpen = () => {
        if (isOpen) {
            onClose();
        } else {
            onOpen();
        }
    };
    return (
        <Button
            id="btnsummary"
            variant="outline"
            size="custom"
            className="h-40 w-40 md:w-fit border border-secondary-default rounded-4 px-8 py-12 md:px-12"
            color="secondary"
            textTransform="none"
            title="Leer resumen"
            iconLeft={<Icon name={isOpen ? 'sparkling-filled' : 'sparkling'} />}
            onClick={toggleOpen}
        >
            <span className="max-md:hidden text-label-sm">Resumen</span>
        </Button>
    );
}

export default SummaryButton;
