import React from 'react';
import Static from 'fusion:static';
import { createArticleListTema } from '.';

function GridTemaServer({ articles = [] }) {
    return (
        <Static id="acu-grid-ssr-tema">
            <div className="grid grid-cols-8 grid-cols-12_md grid-cols-16_lg gap-32">
                {createArticleListTema({ articles, isServer: true })}
            </div>
        </Static>
    );
}

export default GridTemaServer;
