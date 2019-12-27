/* eslint-disable no-undef */
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';

import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import customStrings from './strings';
import config from '../../../../../properties/sites/la-nacion-ar';
import handleCookie from '../../common/utils/handleCookie';
import withLoginData from '../../common/hocs/withLoginData';
import useGlobal from '../../common/hooks/useGlobal';

import '../../../../../resources/dist/css/ln/modules/comments.css';

const Comments = props => {
    const {
        globalContent: {
            _id,
            canonical_url: url,
            headlines: { basic: title },
            label,
            subtype
        },
        logueado,
        loginData
    } = props;

    const { isLoggedIn } = useGlobal();
    const [stylesLoaded, setStylesLoaded] = useState(false);
    const [showLegal, setShowLegal] = useState(false);

    let oldID = false;

    if (label.hasOwnProperty('livefyre_entrada_id')) {
        oldID = label.livefyre_entrada_id.text;
    }

    const { getCookie } = handleCookie();

    const cookie = getCookie('usuario%5Flogtkn');

    const commentSection = useRef(null);

    const metadata = {
        articleId: oldID || _id,
        title,
        url
    };

    const LiveFyre = {};

    const payload = crypto
        .createHash('md5')
        .update(JSON.stringify(metadata))
        .digest('hex');

    const sharedKey =
        subtype === '7'
            ? config.livefyre.recetas.sharedKey
            : config.livefyre.sharedKey;

    const collectionMeta = jwt.sign(payload, sharedKey, {
        algorithm: 'HS256'
    });

    const siteId =
        subtype === '7'
            ? config.livefyre.recetas.siteId
            : config.livefyre.siteId;

    const onDOMChange = () => {
        /* const lf = document.getElementById('livefyre');
        const boxes = lf.getElementsByClassName('fyre');
        if (boxes.length > 1) lf.firstChild.classList.add('hlp-none');
        // lf.removeChild(lf.firstChild);

        if (!stylesLoaded) {
            const styles = document.getElementById('comments');
            if (styles) styles.remove();
            const link = document.createElement('link');
            link.id = 'comments';
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = props.deployment(
                '/pf/resources/dist/css/ln/base/livefyre.css'
            );
            document.getElementsByTagName('head')[0].appendChild(link);

            if (cookie && cookie !== '')
                commentSection.current.classList.remove('no-logueado');

            setStylesLoaded(true);
        } */
    };

    useEffect(() => {
        console.log('la prop logueado: ', logueado);
        if (typeof window !== 'undefined') {
            LiveFyre.networkConfig = {
                network: config.livefyre.network
            };

            LiveFyre.convConfig = {
                siteId,
                articleId: oldID || _id,
                el: 'livefyre',
                collectionMeta,
                datetimeFormat: {
                    minutesUntilAbsoluteTime: 4,
                    absoluteFormat: 'HH:mm dd/MM/y'
                },
                editorCss: {
                    background: '#ccc',
                    color: 'red',
                    font:
                        '30px "Helvetica Neue", Helvetica, Arial, Geneva, sans-serif'
                }
            };

            LiveFyre.convConfig.initialNumVisible = '10';
            LiveFyre.attachmentDelegate = embedObj => {
                const providersToBlock = [
                    'slideshare',
                    'scribd',
                    'facebook',
                    'photobucket',
                    'twitter',
                    'imgur',
                    'tinypic',
                    'fbcdn',
                    'cloudfront',
                    'flickr',
                    '4.bp.blogspot',
                    '1.bp.blogspot',
                    'orig00.deviantart',
                    'tira-la-kadena.tumblr',
                    '41.media.tumblr',
                    'i.ytimg.',
                    'grand-hotel-calafate.tumblr',
                    'orig11.deviantart',
                    'orig07.deviantart',
                    'orig00.deviantart',
                    'orig10.deviantart',
                    'encrypted-tbn1',
                    'encrypted-tbn2'
                ];
                for (
                    let i = 0, len = providersToBlock.length;
                    i < len;
                    i += 1
                ) {
                    if (
                        embedObj.provider_url.indexOf(providersToBlock[i]) > -1
                    ) {
                        return false;
                    }
                }
                return true;
            };
            LiveFyre.networkConfig.attachmentDelegate =
                LiveFyre.attachmentDelegate;
            LiveFyre.networkConfig.strings = customStrings;
            LiveFyre.convConfig.postToButtons = ['tw', 'fb'];
        }
        return () => {};
    }, [
        _id,
        collectionMeta,
        cookie,
        oldID,
        siteId,
        logueado,
        LiveFyre.networkConfig,
        LiveFyre.convConfig,
        LiveFyre.attachmentDelegate
    ]); // isLoggedIn

    useEffect(() => {
        console.log('se ejecuta el useEffect');
        if (typeof window !== 'undefined') {
            Livefyre.require(['fyre.conv#3', 'auth'], (Conv, auth) => {
                auth.delegate({
                    login(callback) {
                        loginData.goToLoginUrl();
                        callback(null, { livefyre: cookie });
                    },
                    logout(finishLogout) {
                        props.goToLogout();
                    },
                    viewProfile(author) {
                        const authorId = author.id.match('[0-9]+');
                        if (author.profileUrl != null && authorId.length > 0) {
                            const win = window.open(
                                author.profileUrl,
                                '_blank'
                            );
                            win.focus();
                        }
                    }
                });
                const isUserLoggedIn = () => {
                    // debugger;
                    console.log('la cookie: ', cookie);
                    if (cookie && cookie !== '') {
                        // && isLoggedIn
                        // commentSection.current.classList.remove('no-logueado');
                        return true;
                    }
                    // Preguntar si ya no tiene la clase no-logueado para agregarla
                    if (
                        !commentSection.current.classList.contains(
                            'no-logueado'
                        )
                    )
                        commentSection.current.classList.add('no-logueado');

                    auth.logout();
                    return false;
                };
                if (!isUserLoggedIn()) {
                    auth.authenticate({ livefyre: cookie });
                }

                /* eslint-disable no-new */
                new Conv(
                    LiveFyre.networkConfig,
                    [LiveFyre.convConfig],
                    widget => {
                        widget.on('commentPosted', data => {});
                        widget.on('commentFlagged', data => {});
                        widget.on('commentLiked', data => {});
                        widget.on('commentShared', data => {});
                        widget.on('socialMention', data => {});
                        widget.on('showMore', data => {});
                        widget.on('initialRenderComplete', data => {
                            if (!auth.isAuthenticated()) {
                                auth.authenticate({ livefyre: cookie });
                            } else if (!isUserLoggedIn()) {
                                //! isLoggedIn
                                fyre.conv.logout();
                                auth.authenticate({ livefyre: cookie });
                            }
                        });
                    }
                );
            });

            // TODO: ver como mejorar esto :/
            const observer = new MutationObserver(onDOMChange);
            observer.observe(document.querySelector('#livefyre'), {
                subtree: false,
                childList: true
            });
        }
        return () => {};
    }, [
        LiveFyre.convConfig,
        LiveFyre.networkConfig,
        cookie,
        loginData,
        onDOMChange,
        props,
        logueado
    ]); // isLoggedIn

    console.log('cookie me rendereo PAPA');
    return (
        <>
            <section
                id="comentarios"
                className="comments"
                data-module="nota-sugeridas-comentarios"
                ref={commentSection}
            >
                <div className="techo">
                    <div
                        id="tokenLF"
                        data-id={collectionMeta}
                        data-entrada={oldID || _id}
                        data-lf-siteid={siteId}
                    />

                    <h4 className="comment-title">
                        Enviá <b>tu comentario </b>
                        <button
                            type="button"
                            className="item_link ver-legales"
                            onClick={() =>
                                showLegal
                                    ? setShowLegal(false)
                                    : setShowLegal(true)
                            }
                        >
                            {' '}
                            Ver legales
                        </button>
                    </h4>
                </div>

                {showLegal && (
                    <p className="comment-legal">
                        Los comentarios publicados son de exclusiva
                        responsabilidad de sus autores y las consecuencias
                        derivadas de ellos pueden ser pasibles de sanciones
                        legales. Aquel usuario que incluya en sus mensajes algún
                        comentario violatorio del reglamento será eliminado e
                        inhabilitado para volver a comentar. Enviar comentario
                        implica la aceptación del Reglamento.
                    </p>
                )}

                {!logueado && (
                    <div className="comment-reminder">
                        Para poder comentar tenés que ingresar con tu usuario de
                        LA NACION.
                    </div>
                )}
                <div id="livefyre" />
            </section>
        </>
    );
};

Comments.propTypes = {
    logueado: PropTypes.bool.isRequired,
    loginData: PropTypes.shape({
        goToLoginUrl: PropTypes.func
    }).isRequired,
    globalContent: PropTypes.shape({
        _id: PropTypes.string,
        canonical_url: PropTypes.string,
        headlines: PropTypes.shape({
            basic: PropTypes.string
        }),
        label: PropTypes.shape({
            livefyre_entrada_id: PropTypes.shape({
                text: PropTypes.string
            })
        }),
        subtype: PropTypes.string
    }).isRequired,
    deployment: PropTypes.func.isRequired
};

export default Consumer(withLoginData(Comments));
