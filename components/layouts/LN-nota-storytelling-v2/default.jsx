import React from 'react';
import Consumer from 'fusion:consumer';
import Opening from './components/opening';
import BaseLayout from '../../features/LN/common/baseLayout/default';

function lnNotaStorytellingV2({ children, globalContent }) {
    return (
        <BaseLayout>
            <div>
                {children[0]}
                <Opening globalContent={globalContent} />
            </div>
            <div>
                {/* Cuerpo */}
                {children[1]}
            </div>
            <div>
                {/* Bottom */}
                {children[2]}
            </div>
            <div>
                {/* Bottom-Tercera */}
                {children[3]}
            </div>
        </BaseLayout>
    );
}

lnNotaStorytellingV2.sections = [
    'Apertura',
    'Cuerpo',
    'Bottom',
    'Bottom-Tercera'
];

export default Consumer(lnNotaStorytellingV2);
