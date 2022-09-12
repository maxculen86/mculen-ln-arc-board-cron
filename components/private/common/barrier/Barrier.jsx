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
import toggleBookmark from '../utils/bookmarkHelper';
import getToken from '../utils/getToken';

const Barrier = ({
    handleBarrier,
    type,
    isLogged,
    redirectCallback,
    bookmarkId,
    setToast,
    dispatch,
    deleteArticle,
    substractOne
}) => {
    const classType = get(CONFIG, `${type}.className`, '');
    const buttons = get(CONFIG, `${type}.buttons`, '');
    const title = get(CONFIG, `${type}.title`, '');
    const subTitle = get(CONFIG, `${type}.subTitle`, '');
    const unLogged = get(CONFIG, `${type}.unLogged`, '');
    const logged = get(CONFIG, `${type}.logged`, '');

    const message = isLogged ? logged : unLogged;
    const Redirect = () => {
        window.open(buttons.link + redirectCallback, '_self');
    };

    if (!handleBarrier && !type) return null;

    return (
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
                                onClick={() => {
                                    toggleBookmark(
                                        getToken(),
                                        {},
                                        bookmarkId,
                                        false,
                                        // setToast,
                                        dispatch
                                    ).then(response => {
                                        if (response === 200) {
                                            deleteArticle(bookmarkId);
                                            substractOne();
                                        }
                                    });
                                    handleBarrier();
                                }}
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
                                title="Suscribirme"
                            />
                            <Text size="2xs" weight="bold">
                                {message.text}
                            </Text>
                            <Link
                                size="--twoxs --font-bold"
                                href={message.href + redirectCallback}
                                title="Iniciar sesión"
                            >
                                {[message.textLink]}
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </ModalBody>
    );
};
Barrier.propTypes = {
    handleBarrier: PropTypes.func.isRequired,
    type: PropTypes.oneOf(['delete-note', 'exclusive-ln']).isRequired,
    isLogged: PropTypes.bool,
    redirectCallback: PropTypes.string,
    bookmarkId: PropTypes.string,
    setToast: PropTypes.func.isRequired,
    deleteArticle: PropTypes.func.isRequired,
    substractOne: PropTypes.func
};
Barrier.defaultProps = {
    isLogged: false,
    redirectCallback: '',
    bookmarkId: '',
    substractOne: null
};

export default Barrier;
