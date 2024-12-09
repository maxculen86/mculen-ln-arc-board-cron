import React from 'react';
import PropTypes from 'fusion:prop-types';
import { Groupbutton } from '@ln/common-ui-groupbutton';
import { Button } from '@ln/foodit-ui-button';
import classNames from 'classnames';
import { useFloatingGroupButton } from './useFloatingGroupButton';
import useGetUserConfig from '../../hooks/useGetUserConfig';

function FloatingGroupButton({
    buttons = [],
    className = '',
    observerSelector
}) {
    const { visible } = useFloatingGroupButton({ observerSelector });
    const { userType } = useGetUserConfig();

    const _className = classNames(
        'print-hide inline-flex fixed bottom-0 left-50 -translate-x-50 mb-16 z-5 shadow-down-2xs bg-primary-positive rounded-4 overflow-hidden',
        'transition transition-all transition-duration-400 sm-only',
        { 'translate-y-100': !visible },
        className
    );

    return (
        <Groupbutton className={_className}>
            {buttons.map((button, i) => (
                <Button
                    // eslint-disable-next-line react/no-array-index-key
                    key={`button-${i}`}
                    size={32}
                    {...button}
                    disabled={userType !== 'subscribed'}
                />
            ))}
        </Groupbutton>
    );
}

FloatingGroupButton.propTypes = {
    buttons: PropTypes.arrayOf(
        PropTypes.shape({
            onClick: PropTypes.func,
            title: PropTypes.string,
            disabled: PropTypes.bool
        })
    ),
    className: PropTypes.string,
    observerSelector: PropTypes.string
};

FloatingGroupButton.defaultProps = {
    buttons: [],
    className: '',
    observerSelector: ''
};

export default FloatingGroupButton;
