import React from 'react';
import Consumer from 'fusion:consumer';
import Opening from './components/opening';

function lnNotaStorytellingV2({ children, globalContent }) {
    return (
        <div>
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
        </div>
    );
}

lnNotaStorytellingV2.sections = [
    'Apertura',
    'Cuerpo',
    'Bottom',
    'Bottom-Tercera'
];

export default Consumer(lnNotaStorytellingV2);
