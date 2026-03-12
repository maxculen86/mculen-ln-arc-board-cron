import React from 'react';
import Consumer from 'fusion:consumer';
import GlobalProvider from '../../private/common/context/globalContext';
import NotaCards from './components/notaCards';

function LnNotaCards({ children, layout, outputType }) {
    return (
        <GlobalProvider>
            <NotaCards outputType={outputType} layout={layout}>
                {children}
            </NotaCards>
        </GlobalProvider>
    );
}

const pageBuilderSections = [
    'Banners',
    'Apertura',
    'Cuerpo',
    'Tercera',
    'Bottom',
    'Bottom-Tercera'
];

LnNotaCards.sections = pageBuilderSections;

export default Consumer(LnNotaCards);
