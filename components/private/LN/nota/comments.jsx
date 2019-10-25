import React, { useEffect } from 'react';
import withLoginData from '../common/hocs/withLoginData';

import '../../../../resources/dist/css/ln/modules/comments.css';

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
        title,
        url,
        tags: tags.map(tag => tag.text).join(','),
        type: 'livecomment'
    };

    useEffect(() => {
        const networkConfig = {
            network: 'la-nacion.fyre.co'
        };

        const convConfig = {
            siteId: '356483',
            articleId: _id,
            el: 'livefyre',
            collectionMeta: 'dataLiveFyre.getAttribute("data-id")',
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

        Livefyre.require(['fyre.conv#3', 'auth'], (Conv, auth) => {
            new Conv(networkConfig, [convConfig], commentsWidget => {});
            auth.delegate({
                login(callback) {
                    callback(null, { livefyre: '<userauthtoken>' });
                }
            });
        });
    }, [_id]);

    return (
        <>
            <section
                id="comentarios"
                className="comments"
                data-module="nota-sugeridas-comentarios"
            >
                <div
                    id="tokenLF"
                    data-id=""
                    data-entrada={_id}
                    data-lf-siteId="356483"
                />
                {props.logueado && (
                    <button type="button" onClick={() => {}}>
                        Ingresar
                    </button>
                )}
                <h4 className="com-title-section-m comment-title">
                    Enviá tu comentario{' '}
                    <button className="item_link">Ver legales</button>
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
                <div className="livefyre" />
            </section>
        </>
    );
};

export default withLoginData(Comments);
