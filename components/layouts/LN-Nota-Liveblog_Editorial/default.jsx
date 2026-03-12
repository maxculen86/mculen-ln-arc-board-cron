import React from 'react';
import Consumer from 'fusion:consumer';
import GlobalProvider from '../../private/common/context/globalContext';
import LiveBlogEditorial from './components/liveblogEditorial';

function LnNotaLiveblogEditorial({ children, layout, outputType }) {
    return (
        <GlobalProvider>
            <LiveBlogEditorial outputType={outputType} layout={layout}>
                {children}
            </LiveBlogEditorial>
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

LnNotaLiveblogEditorial.sections = pageBuilderSections;

export default Consumer(LnNotaLiveblogEditorial);
