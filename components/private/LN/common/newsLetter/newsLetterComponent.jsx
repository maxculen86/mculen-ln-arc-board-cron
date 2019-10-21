import React, { useState } from 'react';
import PropTypes from 'fusion:prop-types';

import '../../../../../resources/dist/css/ln/layouts/layout.css';
import '../../../../../resources/dist/css/ln/base/helpers.css';
import '../../../../../resources/dist/css/ln/modules/newsletter.css';
import '../../../../../resources/dist/css/ln/components/button.css';

const NewLetter = props => {
    const [mail, setMail] = useState('');
    const [isSubscribe, setIsSubscribe] = useState(false);
    const [invalidFormat, setInvalidFormat] = useState(false);
    const { titulo, logueado, subscriptionsCallBack } = props;
    return (
        <>
            <div
                className={`lay-full-width mod-newsletter hlp-marginBottom-40 row ${
                    logueado ? 'logueado' : ''
                }${isSubscribe ? 'suscripto' : ''} ${
                    invalidFormat ? 'error' : ''
                }`}
            >
                <div className="col-tablet-1 col-desksm-2" />
                <div className="col-12 col-tablet-6 col-desksm-5 hlp-paddingHeight-30 hlp-paddingRight-20 hlp-line">
                    <h2 className="com-title-section-s hlp-marginBottom-10 hlp-marginRight-5">
                        Newsletter
                    </h2>

                    <h2 className="com-title-section-m hlp-marginBottom-10">
                        {titulo}
                    </h2>
                    {logueado ? null : isSubscribe ? null : (
                        // TODO: Falta validacion del input type="mail" y si va nulo
                        <>
                            <input
                                className="com-input hlp-marginBottom-20 hlp-marginRight-10"
                                type="text"
                                placeholder="Ingresá tu e-mail"
                                onChange={event => {
                                    setMail(event.target.value);
                                }}
                                value={mail}
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    const regex = /\S+@\S+\.\S+/;
                                    if (regex.test(mail)) {
                                        setInvalidFormat(false);
                                        setIsSubscribe(true);
                                    } else {
                                        setInvalidFormat(true);
                                    }
                                }}
                                className="--btn --bright"
                            >
                                recibir
                            </button>
                            {invalidFormat && (
                                <label className="alerta">
                                    Ingresá un e-mail válido
                                </label>
                            )}
                        </>
                    )}
                    {/* eslint-disable-next-line no-nested-ternary */}
                    {logueado ? (
                        isSubscribe ? (
                            <>
                                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                                <label className="check">
                                    ¡Gracias! Ya estás recibiendo este
                                    newsletter.
                                </label>
                            </>
                        ) : (
                            <button
                                type="button"
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
                            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                            <label className="check">
                                ¡Gracias! A partir de ahora recibirás el
                                newsletter.
                            </label>
                        </>
                    ) : (
                        <p />
                    )}
                </div>
                <div className="col-12 col-tablet-4 col-desksm-3 hlp-paddingHeight-30">
                    {/* eslint-disable-next-line no-nested-ternary */}
                    <div className="com-breadcrumb">
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a
                            className="hlp-bold hlp-marginBottom-15"
                            href=""
                            target="_blank"
                        >
                            Ver ejemplo
                        </a>
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a
                            href="https://newsletter.lanacion.com.ar/#/"
                            onClick={subscriptionsCallBack}
                        >
                            {' '}
                            Otros Newsletters
                        </a>
                    </div>
                </div>
                <div className="col-tablet-1 col-desksm-2" />
            </div>
        </>
    );
};

NewLetter.propTypes = {
    titulo: PropTypes.string,
    logueado: PropTypes.bool,
    subscriptionsCallBack: PropTypes.func
};

NewLetter.defaultProps = {
    titulo: '',
    logueado: false,
    subscriptionsCallBack: null
};

export default NewLetter;
