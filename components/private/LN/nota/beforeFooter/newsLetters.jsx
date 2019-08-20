import React, { Component } from 'react';

const newsLetters = () => {
    return (
        <div className="lay-full-width mod-newsletter hlp-marginBottom-40 row suscripto">
            <div className="col-2" />
            <div className="col-4 hlp-paddingHeight-40 hlp-marginRight-20">
                <h2 className="com-title-section-s hlp-marginBottom-10 hlp-marginRight-5">
                    Newsletter
                </h2>
                <h2 className="com-title-section-m hlp-marginBottom-10">
                    Lo que hay que saber hoy
                </h2>
                <p className="hlp-text-left check hlp-marginBottom-10">
                    lalalala@lanacion.com.ar
                </p>
                <label htmlFor="" className="check">
                    ¡Gracias! Ya estás recibiendo este newsletter.
                </label>
                <label htmlFor="" className="check">
                    ¡Gracias! A partir de ahora recibirás el newsletter.
                </label>
            </div>
            <div className="col-4 hlp-paddingHeight-40 hlp-marginLeft-20">
                <div className="com-breadcrumb">
                    <a className="hlp-bold" href="">
                        Ver ejemplo
                    </a>
                    <a href=""> Recibir otros Newsletters</a>
                </div>
            </div>
            <div className="col-2" />
        </div>
    );
};

export default newsLetters;
