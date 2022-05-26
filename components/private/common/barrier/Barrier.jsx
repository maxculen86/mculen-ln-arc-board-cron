import React from 'react';
import PropTypes from 'prop-types';
import Text from '../text';
import Icon from '../icon';
import ComButton from '../com-button';
import ModalBody from '../ModalBody';
import Badge from '../badge/Badge';
import Link from '../link';
import get from '../utils/get';
import '../../../../resources/dist/css/ln/components/barrier.css';
import CONFIG from './_config';

const Barrier = ({ show, handleBarrier, type, isLogged, redirectCallback }) => {
    const classType = get(CONFIG, `${type}.className`, '');
    const buttons = get(CONFIG, `${type}.buttons`, '');
    const title = get(CONFIG, `${type}.title`, '');
    const subTitle = get(CONFIG, `${type}.subTitle`, '');
    const unLogged = get(CONFIG, `${type}.unLogged`, '');
    const logged = get(CONFIG, `${type}.logged`, '');

    const message = isLogged ? logged : unLogged;
    const Redirect = () => {
        window.open(buttons.link + redirectCallback, '_blank');
    };

    return (
        <>
            {show && (
                <ModalBody>
                    <div className={`barrier ${classType}`}>
                        <ComButton
                            onClick={handleBarrier}
                            iconName="close"
                            title="Cerrar"
                        />
                        {
                            {
                                'delete-note': (
                                    <div className="icon-container">
                                        <Icon name="alert" />
                                    </div>
                                ),
                                'exclusive-ln': (
                                    <Badge
                                        type="exclusive-ln"
                                        className="--large --dark"
                                    />
                                )
                            }[type]
                        }
                        <div className="description">
                            {title && (
                                <span
                                    className="com-text --sueca --m"
                                    // eslint-disable-next-line react/no-danger
                                    dangerouslySetInnerHTML={{ __html: title }}
                                />
                            )}
                            {subTitle && <Text size="2xs">{subTitle}</Text>}
                        </div>
                        <div className="interaction-container">
                            {type === 'delete-note' && (
                                <>
                                    <ComButton
                                        onClick={handleBarrier}
                                        textname={buttons.cancel.label}
                                        size="5xs"
                                        classCondition={buttons.cancel.style}
                                    />
                                    <ComButton
                                        textname={buttons.confirm.label}
                                        size="5xs"
                                        classCondition={buttons.confirm.style}
                                    />
                                </>
                            )}
                            {type === 'exclusive-ln' && (
                                <>
                                    <ComButton
                                        onClick={Redirect}
                                        textname={buttons.label}
                                        size="5xs"
                                        classCondition={buttons.style}
                                    />
                                    <Text size="2xs" weight="bold">
                                        {message.text}
                                    </Text>
                                    <Link
                                        size="--twoxs --font-bold"
                                        href={message.href + redirectCallback}
                                    >
                                        {[message.textLink]}
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </ModalBody>
            )}
        </>
    );
};
Barrier.propTypes = {
    show: PropTypes.bool,
    handleBarrier: PropTypes.func,
    type: PropTypes.oneOf(['delete-note', 'exclusive-ln']),
    isLogged: PropTypes.bool,
    redirectCallback: PropTypes.string
};
Barrier.defaultProps = {
    show: false,
    handleBarrier: () => {},
    type: 'exclusive-ln',
    isLogged: false,
    redirectCallback: ''
};

export default Barrier;
