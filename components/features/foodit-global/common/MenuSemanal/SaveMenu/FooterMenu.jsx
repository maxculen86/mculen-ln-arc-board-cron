import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@ln/foodit-ui-button';

export function FooterMenu({
    onClose,
    saveMenuWeekly,
    selectedDay,
    selectedFood
}) {
    const isDisabled = !selectedDay || !selectedFood;

    return (
        <div className="flex gap-16">
            <Button
                onClick={() => saveMenuWeekly()}
                fullWidth
                title="aceptar"
                variant="primary"
                disabled={isDisabled}
            >
                Aceptar
            </Button>
            <Button
                onClick={onClose}
                fullWidth
                title="cancelar"
                variant="secondary"
            >
                Cancelar
            </Button>
        </div>
    );
}

FooterMenu.propTypes = {
    onClose: PropTypes.func.isRequired,
    saveMenuWeekly: PropTypes.func.isRequired,
    selectedDay: PropTypes.string.isRequired,
    selectedFood: PropTypes.string.isRequired
};
