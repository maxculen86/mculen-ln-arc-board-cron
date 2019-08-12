import React from 'react';
import ArticleList from './articleList';

function index(props) {
    return (
        <div className="row">
            <h4 className="com-title-section-xl hlp-marginBottom-40">
                Te puede interesar
            </h4>
            <section className="row-gap-tablet-3 row-gap-desksm-3 hlp-marginBottom-40">
                <ArticleList />
            </section>
        </div>
    );
}

export default index;
