import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
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
    'Bottom'
];

LnNotaLiveblogEditorial.sections = pageBuilderSections;

LnNotaLiveblogEditorial.propTypes = {
    children: PropTypes.node.isRequired,
    outputType: PropTypes.string.isRequired,
    layout: PropTypes.string.isRequired
};

export default Consumer(LnNotaLiveblogEditorial);
