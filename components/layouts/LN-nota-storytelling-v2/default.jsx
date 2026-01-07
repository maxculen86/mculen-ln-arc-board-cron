import React from 'react';
import Consumer from 'fusion:consumer';

function lnNotaStorytellingV2({ children }) {
    return (
        <div>
            <div>
                {/* Apertura */}
                {children[0]}
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
