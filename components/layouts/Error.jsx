import React, { Component } from 'react';
import Consumer from 'fusion:consumer';
import Arc404 from '../../private/OTT/common/error404';

import '../../resources/dist/css/ln/base.css';
import '../../resources/dist/css/ln/layouts/layout.css';
import '../../resources/dist/css/ln/layouts/grid.css';

import '../../resources/dist/css/ln/components/button.css';


import '../../resources/dist/css/ln/pages/error.css';

const ErrorPage = props => {
    console.log('props **********', props);
    return (
        /* this.props.arcSite;
        if (this.props.arcSite == 'ott') return <Arc404 />; */

<div id="wrapper" className="error404">
  <header>
    <div className="lay">
      <div className="row">
        <div className="col-12 col-desksm-5">
          <a href="/" className="header__middle__logo"><i className="logo-la-nacion"></i></a>
        </div>
        <div className="col-12 col-desksm-7">
          <h1>La página que buscás no está disponible.</h1>
          <p>Seguí navegando y encontrá lo que necesitás:</p>
          <nav>
            <a className="--btn --secondary" href="https://www.lanacion.com.ar/">Página principal</a>
            <a className="--btn --secondary" href="https://buscar.lanacion.com.ar/">Buscador</a>
              <a className="--btn" href="http://especiales.lanacion.com.ar/varios/mapa-sitio/index.html">MAPA DEL SITIO</a>
          </nav>
        </div>
      </div>
    </div>
  </header>
  <main>
    <div className="lay">
      <div className="row">
        <img src="https://www.lanacion.com.ar/error/liniers-horizontal.jpg" alt="Imagen de Liniers"/>
      </div>
    </div>
  </main>
  <footer>
    <div className="lay">
        <div className="row footer-copyright">
        <div className="col-12 col-desksm-6 col-desk-6 footer-copyright__reserved">
          <p>Copyright 2019 SA LA NACION | Todos los derechos reservados</p>
        </div>
        <div className="col-12 col-desksm-6 col-desk-6 footer-copyright__fiscal">
          <p>Visitá <a href="https://www.lanacion.com.ar/humor">Humor</a> en LA NACION</p>
        </div>
      </div>
    </div>
  </footer>
</div>
    );
};

export default Consumer(ErrorPage);
