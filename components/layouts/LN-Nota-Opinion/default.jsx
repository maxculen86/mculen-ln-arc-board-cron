import React from 'react';
import Consumer from 'fusion:consumer';
import GlobalProvider from '../../private/common/context/globalContext';
import Opinion from './components/Opinion';
import BaseLayout from '../../features/LN/common/baseLayout/default';

function LnNotaOpinion({ children }) {
    return (
        <GlobalProvider>
            <BaseLayout>
                <Opinion>{children}</Opinion>
            </BaseLayout>
        </GlobalProvider>
    );
}

const pageBuilderSections = [
    'Apertura',
    'Pre-Cuerpo',
    'Cuerpo',
    'Post-Cuerpo',
    'Bottom',
    'Bottom-Tercera'
];

LnNotaOpinion.sections = pageBuilderSections;

export default Consumer(LnNotaOpinion);
