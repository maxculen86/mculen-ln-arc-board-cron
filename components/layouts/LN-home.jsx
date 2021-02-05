/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import Consumer from 'fusion:consumer';
import Header from '../private/LN/common/header';
import Footer from '../private/LN/common/footer';
import PageBuilderMessage from '../private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage';
import LoginProvider from '../private/LN/common/context/loginContext';
import GlobalProvider from '../private/common/context/globalContext';

// Es importante mantener el orden de las secciones tanto en el layout como en su configuración para su validación
import sectionsConfig from './config/LN-home.config';
import validateLayoutChildren from './validations/LN-home-validation';

import '../../resources/dist/css/ln/base.css';
import '../../resources/dist/css/ln/layouts/layout.css';
import '../../resources/dist/css/ln/layouts/grid.css';
import '../../resources/dist/css/ln/pages/acu.css';
import '../../resources/dist/css/ln/components/com-ordered.css';
import '../../resources/dist/css/ln/components/com-unordered.css';
import '../../resources/dist/css/ln/components/hour.css';

const section = ['Sección Apertura', 'Sección Caja de Tema'];

const getNotificacion = error => (
    <div
        style={{
            marginTop: '10px',
            marginBottom: '10px',
            width: '100%'
        }}
    >
        <PageBuilderMessage type={error.type} message={error.message} />
    </div>
);

const LNHomeLayout = ({ isAdmin, children, renderables }) => {
    const [errors, setErrors] = useState();

    useEffect(() => {
        setErrors(validateLayoutChildren(renderables, sectionsConfig));
    }, [renderables]);

    const sectionErrors =
        !!errors &&
        errors.map(
            errorsBySection =>
                errorsBySection &&
                errorsBySection.filter(error => error !== undefined)
        );

    const elements =
        sectionErrors &&
        sectionErrors.map((errorElements, index) =>
            errorElements.length && isAdmin
                ? errorElements.map(error => getNotificacion(error))
                : children[index]
        );
    return (
        <GlobalProvider>
            <LoginProvider>
                <Header />
                <main>
                    <div id="content-main" className="lay-sidebar">
                        <div className="row">{elements}</div>
                    </div>
                </main>
                <Footer />
            </LoginProvider>
        </GlobalProvider>
    );
};

LNHomeLayout.sections = section;

export default Consumer(LNHomeLayout);
