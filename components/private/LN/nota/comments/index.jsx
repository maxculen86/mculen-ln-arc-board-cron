/* eslint-disable react/require-default-props */
/* eslint-disable no-undef */
import React, {
    useEffect,
    useRef,
    useState,
    useCallback,
    useMemo
} from 'react';
import PropTypes from 'fusion:prop-types';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
// import get from 'lodash.get';
import { messages, providersToBlock } from './strings';
import config from '../../../../../properties/sites/la-nacion-ar';
import handleCookie from '../../common/utils/handleCookie';
import withLoginData from '../../common/hocs/withLoginData';
import '../../../../../resources/dist/css/ln/modules/comments.css';
import useComments from '../../../common/hooks/useComments';
import get from '../../../common/utils/get';
import LoadingIcon from '../../common/loadingIcon';

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
        loginData,
        deployment
    } = props;
    // return <LoadingIcon />;
    // const {
    //     globalContent: { comments }
    // } = props;

    // const allowComments = get(comments, 'allow_comments', true);
    // const displayComments = get(comments, 'display_comments', true);

    const { setCommentsEnabledAndCount } = useComments();
    const [stylesLoaded, setStylesLoaded] = useState(false);
    const [showLegal, setShowLegal] = useState(false);
    const { getCookie } = handleCookie();
    const cookie = getCookie('usuario%5Flogtkn');
    const commentSection = useRef(null);

    const instance = useRef(null);

    const oldID = useMemo(
        () =>
            label && label.livefyre_entrada_id
                ? label.livefyre_entrada_id.text
                : false,
        [label]
    );

    const metadata = useMemo(
        () => ({
            articleId: oldID || _id,
            title,
            url
        }),
        [_id, oldID, title, url]
    );

    const payload = useMemo(
        () =>
            crypto
                .createHash('md5')
                .update(JSON.stringify(metadata))
                .digest('hex'),
        [metadata]
    );

    const sharedKey = useMemo(
        () =>
            subtype === '7'
                ? config.livefyre.recetas.sharedKey
                : config.livefyre.sharedKey,
        [subtype]
    );

    const collectionMeta = useMemo(
        () =>
            jwt.sign(payload, sharedKey, {
                algorithm: 'HS256'
            }),
        [payload, sharedKey]
    );

    const siteId = useMemo(
        () =>
            subtype === '7'
                ? config.livefyre.recetas.siteId
                : config.livefyre.siteId,
        [subtype]
    );

    const LiveFyreConfig = useMemo(
        () => ({
            networkConfig: {
                network: config.livefyre.network,
                strings: messages,
                attachmentDelegate: embedObj => {
                    return providersToBlock.some(
                        provider => !!embedObj.provider_url.includes(provider)
                    );
                }
            },
            convConfig: {
                siteId,
                articleId: oldID || _id,
                el: 'livefyre',
                collectionMeta,
                datetimeFormat: {
                    minutesUntilAbsoluteTime: 4,
                    absoluteFormat: 'HH:mm dd/MM/y'
                },
                initialNumVisible: '10',
                postToButtons: ['tw', 'fb']
            }
        }),
        [_id, collectionMeta, oldID, siteId]
    );

    const onShowLegal = () => {
        showLegal ? setShowLegal(false) : setShowLegal(true);
    };

    const onCommentsLoad = useCallback(() => {
        const lf = document.getElementById('livefyre');
        const boxes = lf.getElementsByClassName('fyre');

        if (boxes.length > 0 && commentSection.current) {
            commentSection.current.classList.remove('hlp-none');
        }
        if (boxes.length > 1) {
            [].slice.call(boxes).forEach((box, index) => {
                if (index < boxes.length - 1) {
                    boxes[index].classList.add('hlp-none');
                }
            });
        }

        if (!stylesLoaded) {
            const styles = document.getElementById('comments');
            if (styles) styles.remove();
            const link = document.createElement('link');
            link.id = 'comments';
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = deployment(
                '/pf/resources/dist/css/ln/base/livefyre.css'
            );
            document.getElementsByTagName('head')[0].appendChild(link);

            if (cookie && cookie !== '' && commentSection.current)
                commentSection.current.classList.remove('no-logueado');

            if (!stylesLoaded) setStylesLoaded(true);
        }
    }, [cookie, deployment, stylesLoaded]);

    const observer = useRef(new MutationObserver(onCommentsLoad));
    useEffect(() => {
        if (document.querySelector('#livefyre')) {
            observer.current.observe(document.querySelector('#livefyre'), {
                subtree: false,
                childList: true
            });
        }
        return () => observer.current.disconnect();
    });

    useEffect(() => {
        if (commentSection.current) {
            if (showLegal) {
                commentSection.current.classList.remove('arrow-down');
                commentSection.current.classList.add('arrow-up');
            } else {
                commentSection.current.classList.remove('arrow-up');
                commentSection.current.classList.add('arrow-down');
            }
        }
    }, [showLegal]);

    useEffect(() => {
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
                    if (cookie && cookie !== '') {
                        return true;
                    }
                    if (
                        commentSection.current &&
                        !commentSection.current.classList.contains(
                            'no-logueado'
                        )
                    )
                        commentSection.current.classList.add('no-logueado');
                    return false;
                };
                if (!isUserLoggedIn()) {
                    auth.authenticate({ livefyre: cookie });
                }

                if (typeof fyre !== 'undefined') {
                    if (!instance.current) {
                        /* eslint-disable no-new */
                        instance.current = new Conv(
                            LiveFyreConfig.networkConfig,
                            [LiveFyreConfig.convConfig],
                            widget => {
                                widget.on('commentPosted', data => {
                                    if (window.dataLayer === 'undefined')
                                        return;
                                    if (data.parent) {
                                        window.dataLayer.push({
                                            event: 'Comentar',
                                            Type: 'Responder'
                                        });
                                    } else {
                                        window.dataLayer.push({
                                            event: 'Comentar',
                                            Type: 'Comentar'
                                        });
                                    }
                                });
                                widget.on('commentCountUpdated', data => {
                                    setCommentsEnabledAndCount(true, data);
                                });
                                widget.on('commentFlagged', data => {});
                                widget.on('commentLiked', data => {});
                                widget.on('commentShared', data => {});
                                widget.on('socialMention', data => {});
                                widget.on('showMore', data => {});
                                widget.on('initialRenderComplete', data => {
                                    const collection = widget.getCollection();
                                    const { attributes } = collection;
                                    const commentsCount = get(
                                        attributes,
                                        'numVisible',
                                        0
                                    );

                                    setCommentsEnabledAndCount(
                                        attributes.commentsEnabled,
                                        commentsCount
                                    );

                                    if (!auth.isAuthenticated()) {
                                        auth.authenticate({ livefyre: cookie });
                                    } else if (!isUserLoggedIn()) {
                                        fyre.conv.logout();
                                        auth.authenticate({ livefyre: cookie });
                                    }
                                });
                            }
                        );
                    }
                }
            });
        }
        return () => {};
    }, [
        LiveFyreConfig.convConfig,
        LiveFyreConfig.networkConfig,
        cookie,
        loginData,
        props
    ]);

    // if (!displayComments) return null;

    return (
        <>
            {instance && !instance.current && <LoadingIcon />}
            <section
                id="comentarios"
                className="comments arrow-down hlp-none"
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
                        Enviá&nbsp;
                        <b>tu comentario </b>
                        <button
                            type="button"
                            className="item_link ver-legales"
                            onClick={onShowLegal}
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
    deployment: PropTypes.func.isRequired,
    termicas: PropTypes.shape({
        livefyre: PropTypes.bool
    }).isRequired
};

export default withLoginData(Comments);
