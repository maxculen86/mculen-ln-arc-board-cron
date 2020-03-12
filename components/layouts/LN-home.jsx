/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect } from 'react';
import Consumer from 'fusion:consumer';
import Header from '../private/LN/common/header';
import Footer from '../private/LN/common/footer';

import '../../resources/dist/css/ln/base.css';
import '../../resources/dist/css/ln/layouts/layout.css';
import '../../resources/dist/css/ln/layouts/grid.css';
import '../../resources/dist/css/ln/pages/acu.css';
import '../../resources/dist/css/ln/components/ordered.css';
import '../../resources/dist/css/ln/components/unordered.css';
import '../../resources/dist/css/ln/components/hour.css';

const section = ['Sección Apertura', 'Sección Caja de Tema'];

const validateTree = (treeChildren, allowed) => {
    // console.log('validateTree -> treeChildren, allowed', treeChildren, allowed);
    allowed &&
        allowed.map((allowedChain, index) => {
            const sectionsChildren =
                treeChildren &&
                treeChildren[index] &&
                treeChildren[index].children;
            // console.log('validateTree -> sectionsChildren', sectionsChildren);
            sectionsChildren &&
                sectionsChildren.map(child => {
                    // console.log('validateTree -> child', child);
                    if (
                        child.collection !== allowedChain.collection ||
                        child.type !== allowedChain.type
                    )
                        throw Error(
                            `${allowedChain.name} sólo admite ${allowedChain.collection} del tipo ${allowedChain.type}`
                        );
                });
        });
};

const LNHomeLayout = ({ children, tree: { children: treeChildren } }) => {
    // Es importante mantener el orden de allowedChains para validationTree()
    const allowedChains = [
        {
            name: 'Sección Apertura',
            collection: 'chains',
            type: 'apertura'
        },
        {
            name: 'Sección Caja de Tema',
            collection: 'chains',
            type: 'cajaTema'
        }
    ];
    useEffect(() => {
        // console.log("LNHomeLayout -> treeChildren", treeChildren)
        validateTree(treeChildren, allowedChains);
    }, [allowedChains, treeChildren]);

    return (
        <>
            <Header />
            <main>
                <div id="content-main" className="lay-sidebar">
                    <div className="row">
                        {children[0]}
                        {children[1]}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

LNHomeLayout.sections = section;

export default Consumer(LNHomeLayout);
