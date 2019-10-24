import React, { useEffect } from 'react';
import withLoginData from '../common/hocs/withLoginData';

const Comments = props => {
    console.log('############ GLOBALCONTENT ##########: ', props.globalContent);
    console.log('############ props ##########: ', props);
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
            <section id="comentarios" data-module="nota-sugeridas-comentarios">
                <div
                    id="tokenLF"
                    data-id=""
                    data-entrada={_id}
                    data-lf-siteId="356483"
                />
                {props.logueado && (
                    <button
                        type="button"
                        onClick={() => {console.log('******||||||******')}}
                    >
                        Ingresar
                    </button>
                )}
                <p className="legales">
                    Los comentarios publicados son de exclusiva responsabilidad
                    de sus autores y las consecuencias derivadas de ellos pueden
                    ser pasibles de sanciones legales. Aquel usuario que incluya
                    en sus mensajes algún comentario violatorio del reglamento
                    será eliminado e inhabilitado para volver a comentar. Enviar
                    un comentario implica la aceptación del Reglamento.
                </p>
                <div className="recordar-logueo">
                    Para poder comentar tenés que ingresar con tu usuario de LA
                    NACION.
                </div>
                <div className="livefyre" />
            </section>
        </>
    );
};

export default withLoginData(Comments);
