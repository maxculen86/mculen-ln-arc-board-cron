/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon';
import Text from '../text';
import ComButton from '../com-button';
import '../../../../resources/dist/css/ln/components/toast.css';

const Toast = ({ data, handleTimeout }) => {
    const { buttonLabel, description, status, buttonAction, timeout } =
        data || {};
    const [showToast, setShowToast] = useState(true);
    const handleClose = () => {
        setShowToast(false);
    };

    useEffect(() => {
        const hideTimeout = timeout
            ? setTimeout(() => {
                  handleTimeout();
              }, 2750)
            : null;
        return () => clearTimeout(hideTimeout);
    }, [handleTimeout, timeout]);

    if (!status) return null;

    return (
        <>
            {showToast && (
                <div className={`toast --${status}`}>
                    <div className="icon-container">
                        {
                            {
                                success: <Icon name="checkmark" />,
                                info: <Icon name="info" />,
                                warning: <Icon name="alert" />,
                                danger: <Icon name="error-warning" />
                            }[status]
                        }
                    </div>
                    <div className="body-toast">
                        <Text extraClass="--title" size="small" weight="bold">
                            {
                                {
                                    success: '¡Listo!',
                                    info: 'Info',
                                    warning: '¡Atención!',
                                    danger: '¡Ups!'
                                }[status]
                            }
                        </Text>
                        {description && (
                            <span
                                className="--twoxs"
                                // eslint-disable-next-line react/no-danger
                                dangerouslySetInnerHTML={{
                                    __html: description
                                }}
                            />
                        )}
                        {buttonAction && (
                            <ComButton
                                onClick={buttonAction}
                                title={buttonLabel}
                                textname={buttonLabel}
                                classCondition="--tertiary"
                            />
                        )}
                    </div>
                    <ComButton
                        onClick={handleClose}
                        iconName="close"
                        title="Cerrar"
                    />
                </div>
            )}
        </>
    );
};
Toast.propTypes = {
    data: PropTypes.shape({
        status: PropTypes.oneOf(['success', 'info', 'warning', 'danger'])
            .isRequired,
        description: PropTypes.string,
        buttonLabel: PropTypes.string,
        buttonAction: PropTypes.func
    }),
    handleTimeout: PropTypes.func
};
Toast.defaultProps = {
    data: {
        description: '',
        buttonLabel: 'reintentar',
        buttonAction: null
    },
    handleTimeout: null
};

export default Toast;
