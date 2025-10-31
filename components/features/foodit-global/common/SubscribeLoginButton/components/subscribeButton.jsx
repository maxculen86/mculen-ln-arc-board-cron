import React from 'react';
import { Button } from '@ln/foodit-ui-button';
import PropTypes from 'prop-types';

export function SubscribeButton({
    classNameButtons,
    buttonSubscribeText,
    handleSubscribeClick
}) {
    return (
        <Button
            className={classNameButtons}
            title={buttonSubscribeText}
            variant="accent"
            size={{ sm: 32, md: 32, lg: 40 }}
            data-testid="button-suscribe"
            data-interaction="dataLayerInteraction"
            data-event="subscription_start"
            data-button="buttonSubscribeText"
            onClick={handleSubscribeClick}
        >
            <span className="roboto-bold">{buttonSubscribeText}</span>
        </Button>
    );
}

SubscribeButton.propTypes = {
    classNameButtons: PropTypes.string,
    buttonSubscribeText: PropTypes.string.isRequired,
    handleSubscribeClick: PropTypes.func.isRequired
};

SubscribeButton.defaultProps = {
    classNameButtons: ''
};
