import React, { useState } from 'react';

import '../../../../../resources/dist/css/ln/layouts/layout.css';
import '../../../../../resources/dist/css/ln/base/helpers.css';
import '../../../../../resources/dist/css/ln/modules/newsletter.css';
import '../../../../../resources/dist/css/ln/components/button.css';

const newLetter = props => {
    const [mail, setMail] = useState('');
    const [isSubscribe, setIsSubscribe] = useState(false);
    const { titulo, logueado, subscriptionsCallBack } = props;
    return (
        <>
            <div
                className={`lay-full-width mod-newsletter hlp-marginBottom-40 row ${
                    logueado ? 'logueado' : ''
                }${isSubscribe ? 'suscripto' : ''}`}
            >
                <div className="col-2" />
                <div className="col-4 hlp-paddingHeight-40 hlp-marginRight-20">
                    <h2 className="com-title-section-s hlp-marginBottom-10 hlp-marginRight-5">
                        Newsletter
                    </h2>
                    <h2 className="com-title-section-m hlp-marginBottom-10">
                        {titulo}
                    </h2>
                    {logueado ? (
                        isSubscribe ? (
                            <>
                                <label htmlFor="" className="check">
                                    ¡Gracias! Ya estás recibiendo este
                                    newsletter.
                                </label>
                            </>
                        ) : (
                            <button
                                onClick={() => setIsSubscribe(!isSubscribe)}
                                className="--btn --bright"
                            >
                                recibir newsletter
                            </button>
                        )
                    ) : isSubscribe ? (
                        <>
                            <p className="hlp-text-left check hlp-marginBottom-10">
                                {mail}
                            </p>
                            <label htmlFor="" className="check">
                                ¡Gracias! A partir de ahora recibirás el
                                newsletter.
                            </label>
                        </>
                    ) : (
                        <p>
                            Los temas principales de cada jornada
                            <br />
                            seleccionados por los editores de LA NACION
                        </p>
                    )}
                </div>
                <div className="col-4 hlp-paddingHeight-40 hlp-marginLeft-20">
                    {logueado ? null : isSubscribe ? null : (
                        // TODO: Falta validacion del input type="mail" y si va nulo
                        <>
                            <input
                                className="com-input hlp-marginBottom-30 hlp-marginRight-10"
                                type="text"
                                placeholder="Ingresá tu e-mail"
                                onChange={event => {
                                    setMail(event.target.value);
                                }}
                                value={mail}
                            />
                            <button
                                onClick={() => setIsSubscribe(!isSubscribe)}
                                className="--btn --bright"
                            >
                                recibir
                            </button>
                        </>
                    )}
                    {isSubscribe ? null : (
                        <div className="com-breadcrumb">
                            <a className="hlp-bold" href="">
                                Ver ejemplo
                            </a>
                            <a href="#" onClick={subscriptionsCallBack}>
                                {' '}
                                Recibir otros Newsletters
                            </a>
                        </div>
                    )}
                </div>
                <div className="col-2" />
            </div>
        </>
    );
};

/* newLetter.propTypes = {
    sections: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            path: PropTypes.string
        })
    ).isRequired
}; */

export default newLetter;
