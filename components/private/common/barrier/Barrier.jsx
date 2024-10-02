import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@ln/common-ui-icon';
import { Badge } from '@ln/contenidos-ui-badge';
import { Button } from '@ln/contenidos-ui-button';
import { Link } from '@ln/contenidos-ui-link';
import { Text } from '@ln/contenidos-ui-text';
import IconSprite from '../../../features/private-global/common/iconSprite/IconSprite';
import ModalBody from '../ModalBody';
import get from '../utils/get';
import CONFIG from './_config';
import toggleBookmark from '../utils/bookmarkHelper';
import getToken from '../utils/getToken';
import classNames from 'classnames';

const Barrier = ({
    handleBarrier,
    type,
    isLogged,
    redirectCallback,
    bookmarkId,
    dispatch,
    deleteArticle,
    substractOne
}) => {
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
            <div
                className={classNames(
                    `barrier flex flex-column jc-center ai-center rounded-4 m-16 py-16 px-20`,
                    {
                        'w-328 bg-light-50': type === 'delete-note'
                    },
                    {
                        'w-720_md bg-dark-200 text-light-200':
                            type === 'exclusive-ln'
                    }
                )}
            >
                <Button
                    onClick={handleBarrier}
                    title="Cerrar"
                    className={classNames('as-flex-end mb-24', {
                        'text-white': type === 'exclusive-ln'
                    })}
                    size="inherit"
                    iconOnly
                >
                    <IconSprite name="close" />
                </Button>
                {
                    {
                        'delete-note': (
                            <div className="flex jc-center ai-center rounded-circle w-40 h-40 bg-orange-200 mb-24">
                                <Icon size={16}>
                                    <IconSprite name="warning" fill="#C6480C" />
                                </Icon>
                            </div>
                        ),
                        'exclusive-ln': (
                            <Badge
                                type="subscriberNegative"
                                text="Suscriptores"
                                className="mb-24"
                            />
                        )
                    }[type]
                }
                <div className="description text-center mb-16">
                    {title && (
                        <p
                            className="--font-primary --l --font-medium"
                            // eslint-disable-next-line react/no-danger
                            dangerouslySetInnerHTML={{ __html: title }}
                        />
                    )}
                    {subTitle && <Text as="p">{subTitle}</Text>}
                </div>
                <div
                    className={classNames(
                        'interaction-container w-100 text-center',
                        {
                            'flex jc-between px-8': type === 'delete-note'
                        },
                        {
                            'flex flex-column jc-center ai-center':
                                type === 'exclusive-ln'
                        }
                    )}
                >
                    {type === 'delete-note' && (
                        <>
                            <Button
                                onClick={handleBarrier}
                                variant="secondary"
                                title="Cancelar"
                            >
                                {buttons.cancel.label}
                            </Button>
                            <Button
                                id="confirm-button-note"
                                variant="primary"
                                title="Confirmar"
                                onClick={() => {
                                    toggleBookmark({
                                        isDelete: bookmarkId,
                                        dispatch
                                    }).then(response => {
                                        if (response === 200) {
                                            deleteArticle(bookmarkId);
                                            substractOne();
                                        }
                                    });
                                    handleBarrier();
                                }}
                            >
                                {buttons.confirm.label}
                            </Button>
                        </>
                    )}
                    {type === 'exclusive-ln' && (
                        <>
                            <Button
                                onClick={Redirect}
                                variant="custom"
                                className="w-250 bg-light-100 mb-16"
                                title="Suscribirme"
                            >
                                {buttons.label}
                            </Button>
                            <Text as="p" className="font-bold mb-4">
                                {message.text}
                            </Text>
                            <Link
                                href={message.href + redirectCallback}
                                title="Iniciar sesión"
                                className="text-blue-300 font-bold"
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
    dispatch: PropTypes.func.isRequired,
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
