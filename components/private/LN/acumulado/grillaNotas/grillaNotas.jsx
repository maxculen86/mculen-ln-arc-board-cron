import React from 'react';
import ArticleMain from '../../common/articleTypes/articleMain';
import ArticleDate from '../../common/dateArticle';
import WithAcuArticlesData from '../../common/hocs/WithAcuArticlesData';
import BtnMasNotas from '../botonVerMasNotas';

const CLASS_W_100 = 'w-100-mobile';

const GrillaNotas = ({
    articles,
    hayMasNotas,
    obtenerMasNotas,
    globalContent
}) => {
    return (
        <>
            <section className="row-gap-tablet-2 row-gap-deskxl-3 hlp-degrade">
                {articles.map((a, i) => {
                    const dateComponent = (
                        <ArticleDate display_date={a.display_date} />
                    );
                    return (
                        <ArticleMain
                            key={i}
                            articleData={a}
                            extraClasses={CLASS_W_100}
                        >
                            {dateComponent}
                        </ArticleMain>
                    );
                })}
            </section>
            {hayMasNotas && (
                <section className="row">
                    <BtnMasNotas
                        onClickHandler={obtenerMasNotas}
                        name={globalContent.name}
                    />
                </section>
            )}
        </>
    );
};

export default WithAcuArticlesData(GrillaNotas, null, 'masNotas'); // TODO: dejo el filter comentado porque no me trae datos. REVISAR, filter);
