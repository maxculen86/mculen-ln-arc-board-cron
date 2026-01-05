import React from 'react';
import Consumer from 'fusion:consumer';
import GlobalProvider from '../../private/common/context/globalContext';
import Opinion from './components/opinion';

function LnNotaOpinion({ children }) {
    return (
        <GlobalProvider>
            <Opinion>{children}</Opinion>
        </GlobalProvider>
    );
}

const pageBuilderSections = [
    'Pre-Título',
    'Título',
    'Apertura',
    'Cuerpo',
    'Bottom',
    'Bottom-Tercera'
];

LnNotaOpinion.sections = pageBuilderSections;

export default Consumer(LnNotaOpinion);
