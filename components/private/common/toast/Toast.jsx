/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import PropTypes from 'fusion:prop-types';
import Icon from '../icon';
import Text from '../text';
import ComButton from '../com-button';
import '../../../../resources/dist/css/ln/components/toast.css';
import GetDescription from './GetDescription';

const Toast = ({
    action,
    buttonLabel,
    description,
    customDescription,
    status
}) => {
    const [showToast, setShowToast] = useState(true);
    const handleClose = () => {
        setShowToast(false);
    };
    const handleRequest = () => {
        // eslint-disable-next-line no-console
        console.log('reintentar');
        handleClose();
    };
    const className = `toast --${status}`;
    return (
        <>
            {showToast && (
                <div className={className}>
                    <div className="icon-container">
                        {
                            {
                                success: <Icon name="checkmark" />,
                                info: <Icon name="info" />,
                                alert: <Icon name="alert" />,
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
                                    alert: '¡Atención!',
                                    danger: '¡Ups!'
                                }[status]
                            }
                        </Text>
                        <GetDescription
                            status={status}
                            description={description}
                            custom={customDescription}
                        />
                        {action && status === 'danger' && (
                            <ComButton
                                onClick={handleRequest}
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
    action: PropTypes.boolean,
    buttonLabel: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.oneOf(['success', 'info', 'alert', 'danger']),
    customDescription: PropTypes.oneOf(['bookmark'])
};
Toast.defaultProps = {
    action: true,
    buttonLabel: 'reintentar',
    customDescription: '',
    description: '',
    status: 'success'
};

export default Toast;
