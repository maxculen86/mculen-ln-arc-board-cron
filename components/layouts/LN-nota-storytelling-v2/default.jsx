import React from 'react';
import Consumer from 'fusion:consumer';
import Opening from './components/opening/default';
import BaseLayout from '../../features/LN/common/baseLayout/default';
import GlobalProvider from '../../private/common/context/globalContext';

function lnNotaStorytellingV2({ children, globalContent, layout }) {
    return (
        <GlobalProvider>
            <BaseLayout>
                <div data-tw style={{ display: 'contents' }}>
                    <Opening globalContent={globalContent} layout={layout} />
                    {children[0]}
                </div>
                {/* Cuerpo */}
                {children[1]}
                <div>
                    {/* Bottom */}
                    {children[2]}
                </div>
                <div>
                    {/* Bottom-Tercera */}
                    {children[3]}
                </div>
            </BaseLayout>
        </GlobalProvider>
    );
}

lnNotaStorytellingV2.sections = [
    'Apertura',
    'Cuerpo',
    'Bottom',
    'Bottom-Tercera'
];

export default Consumer(lnNotaStorytellingV2);
