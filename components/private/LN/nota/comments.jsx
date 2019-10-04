import React, { Fragment, useEffect } from 'react';

const Comments = props => {
    console.log("############ GLOBALCONTENT ##########: ", props.globalContent);
    const { globalContent: { _id }} = props;

    const metadata = {
        title: '',
        url: '',
        tags: '',
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
            "datetimeFormat": {
                minutesUntilAbsoluteTime: 4,
                absoluteFormat: 'HH:mm dd/MM/y'
            },
            editorCss: {
                background: '#ccc',
                color: 'red',
                font: '30px "Helvetica Neue", Helvetica, Arial, Geneva, sans-serif'
            }
        };

        Livefyre.require(['fyre.conv#3', 'auth'], (Conv, auth) => {
            new Conv(networkConfig, [convConfig], (commentsWidget) => {}); 
            auth.delegate({
                login(callback) {
                    callback(null, { livefyre: '<userauthtoken>' });
                }
            });
        });
    }, []);

    return (
        <Fragment>
            <section id="comentarios" data-module="nota-sugeridas-comentarios">
                <div id="tokenLF" data-id="" data-entrada={_id} data-lf-siteId="356483"></div>
                <p class="legales">Los comentarios publicados son de exclusiva responsabilidad de sus autores y las consecuencias derivadas de ellos pueden ser pasibles de sanciones legales. Aquel usuario que incluya en sus mensajes algún comentario violatorio del reglamento será eliminado e inhabilitado para volver a comentar. Enviar un comentario implica la aceptación del Reglamento.</p>
                <div class="recordar-logueo">Para poder comentar tenés que ingresar con tu usuario de LA NACION.</div>
                <div className="livefyre" />
            </section>
        </Fragment>
    );
};

export default Comments;
