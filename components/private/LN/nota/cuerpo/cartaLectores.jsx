import React from 'react';

// TODO: investigar componte de ARC "social link"
export default function cartaLectores() {
    return (
        <div>
            <article className="cartaLectores">
                <section className="cont-figure"></section>
                <div className="hlp-paddingSides-15 hlp-paddingHeight-15">
                    <h2 className="com-title-acu">
                        <a href="">
                            <b>Cartas de lectores.</b>
                        </a>
                    </h2>
                    <p className="hlp-margintop-5">Enviá tus mensajes:</p>
                    <p className="">
                        E-mail:{' '}
                        <a className="link" href="">
                            cartas@lanacion.com.ar
                        </a>
                    </p>
                    <p className="">
                        Correo: Av. Libertador 101, Vicente López. Buenos Aires.
                        Argentina. CP: B1638BEA.
                    </p>
                </div>
            </article>
        </div>
    );
}
