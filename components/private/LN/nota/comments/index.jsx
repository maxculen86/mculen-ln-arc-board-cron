/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import PropTypes from 'fusion:prop-types';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import customStrings from './strings';
import config from '../../../../../properties/sites/la-nacion-ar';

const Comments = props => {
    const {
        globalContent: {
            _id,
            canonical_url: url,
            headlines: { basic: title },
            taxonomy: { tags }
        }
    } = props;

    const metadata = {
        "title": title,
        "url": url,
        "tags": tags.map(tag => tag.text).join(', '),
        "type": "livecomment"
    };

    const payload = crypto
        .createHash('md5')
        .update(JSON.stringify(metadata))
        .digest('hex');

    useEffect(() => {
        const LiveFyre = {};

        LiveFyre.networkConfig = {
            network: 'la-nacion.fyre.co'
        };

        LiveFyre.convConfig = {
            siteId: '356483',
            articleId: _id,
            el: 'livefyre',
            collectionMeta: jwt.sign(payload, config.sharedKeyLF),
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
            for (let i = 0, len = providersToBlock.length; i < len; i += 1) {
                if (embedObj.provider_url.indexOf(providersToBlock[i]) > -1) {
                    return false;
                }
            }
            return true;
        };
        LiveFyre.networkConfig.attachmentDelegate = LiveFyre.attachmentDelegate;
        LiveFyre.networkConfig.strings = customStrings;
        LiveFyre.convConfig.postToButtons = ['tw', 'fb'];

        Livefyre.require(['fyre.conv#3', 'auth'], (Conv, auth) => {
            /* eslint-disable no-new */
            new Conv(LiveFyre.networkConfig, [LiveFyre.convConfig], widget => {
                widget.on('commentPosted', data => {
                    // console.log('GA: CommentPosted');
                    // ga('send', 'event', 'livefyre', 'commentPosted');
                });
                widget.on('commentFlagged', data => {
                    // console.log('GA: CommentFlagged');
                    // ga('send', 'event', 'livefyre', 'commentFlagged');
                });
                widget.on('commentLiked', data => {
                    // console.log('GA: CommentLiked');
                    // ga('send', 'event', 'livefyre', 'commentLiked');
                });
                widget.on('commentShared', data => {
                    // console.log('GA: CommentShared');
                    // ga('send', 'event', 'livefyre', 'commentShared');
                });
                widget.on('socialMention', data => {
                    // console.log('GA: SocialMention');
                    // ga('send', 'event', 'livefyre', 'socialMention');
                });
                widget.on('showMore', data => {
                    // console.log('GA: ShowMore');
                    // ga('send', 'event', 'livefyre', 'verMas', 'verMas');
                });
                widget.on('initialRenderComplete', data => {
                    alert('done');
                });
            });

            auth.delegate({
                login(callback) {
                    callback(null, { livefyre: '<userauthtoken>' });
                }
            });
        });
    }, []);

    return (
        <>
            <section id="comentarios" data-module="nota-sugeridas-comentarios">
                <h4> ENVÍA <b> TU COMENTARIO </b> </h4>
                <a className="ver-legales"> Ver legales </a>
                <div id="tokenLF" data-id="" data-entrada={_id} data-lf-siteid="356483"></div>
                <p className="legales">Los comentarios publicados son de exclusiva responsabilidad de sus autores y las consecuencias derivadas de ellos pueden ser pasibles de sanciones legales. Aquel usuario que incluya en sus mensajes algún comentario violatorio del reglamento será eliminado e inhabilitado para volver a comentar. Enviar un comentario implica la aceptación del Reglamento.</p>
                <div className="recordar-logueo">Para poder comentar tenés que ingresar con tu usuario de LA NACION.</div>
                <div className="livefyre" />
            </section>
        </>
    );
};

Comments.propTypes = {
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

export default Comments;
