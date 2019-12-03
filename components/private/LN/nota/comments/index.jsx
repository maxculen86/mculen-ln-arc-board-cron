/* eslint-disable no-undef */
import React, { useEffect, useRef } from 'react';
import PropTypes from 'fusion:prop-types';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import customStrings from './strings';
import config from '../../../../../properties/sites/la-nacion-ar';
import handleCookie from '../../../LN/common/utils/handleCookie';
import withLoginData from '../../../LN/common/hocs/withLoginData';
import { LOGIN_URL } from 'fusion:environment';

import '../../../../../resources/dist/css/ln/modules/comments.css';

const Comments = props => {
    const {
        globalContent: {
            _id,
            canonical_url: url,
            headlines: { basic: title },
            taxonomy: { tags },
            label,
            subtype
        },
        logueado
    } = props;

    let oldID = false;

    if (label.hasOwnProperty('livefyre_entrada_id')) {
        oldID = label.livefyre_entrada_id.text;
    }

    console.log('################## LAS PROPS EN COMMENT ######### : ', props);
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
        subtype === '7' && oldID
            ? config.livefyre.recetas.sharedKey
            : config.livefyre.sharedKey;

    const collectionMeta = jwt.sign(payload, sharedKey, {
        algorithm: 'HS256'
    });

    const siteId =
        subtype === '7' && oldID
            ? config.livefyre.recetas.siteId
            : config.livefyre.siteId;

    useEffect(() => {
        if (typeof window !== 'undefined') {
            LiveFyre.networkConfig = {
                network: config.livefyre.network
            };

            LiveFyre.convConfig = {
                siteId,
                articleId: oldID || _id, //'1466383', //'1466383'
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

            return () => {};
        }
    }, [_id, collectionMeta, cookie, oldID, siteId, logueado]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            Livefyre.require(['fyre.conv#3', 'auth'], (Conv, auth) => {
                const isUserLoggedIn = () => {
                    if (cookie !== '') {
                        return true;
                    }
                    commentSection.current.classList.add('no-logueado');
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
                            } else {
                                fyre.conv.logout();
                            }
                        });
                    }
                );
                auth.delegate({
                    login(callback) {
                        location.href = LOGIN_URL + window.btoa(location.href);
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
            });
            return () => {};
        }
    }, []);

    return (
        <>
            <section
                id="comentarios"
                className="comments"
                data-module="nota-sugeridas-comentarios"
                ref={commentSection}
            >
                <div
                    id="tokenLF"
                    data-id={collectionMeta}
                    data-entrada={oldID || _id}
                    data-lf-siteid={siteId}
                />

                <h4 className="com-title-section-m comment-title">
                    Enviá tu comentario{' '}
                    <button type="button" className="item_link">
                        Ver legales
                    </button>
                </h4>
                <p className="comment-legal">
                    Los comentarios publicados son de exclusiva responsabilidad
                    de sus autores y las consecuencias derivadas de ellos pueden
                    ser pasibles de sanciones legales. Aquel usuario que incluya
                    en sus mensajes algún comentario violatorio del reglamento
                    será eliminado e inhabilitado para volver a comentar. Enviar
                    un comentario implica la aceptación del Reglamento.
                </p>
                <div className="comment-reminder">
                    Para poder comentar tenés que ingresar con tu usuario de LA
                    NACION.
                </div>
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
        taxonomy: PropTypes.shape({
            tags: PropTypes.arrayOf(
                PropTypes.shape({
                    description: PropTypes.string,
                    slug: PropTypes.string,
                    text: PropTypes.string
                })
            )
        })
    }).isRequired
};

export default withLoginData(Comments);
