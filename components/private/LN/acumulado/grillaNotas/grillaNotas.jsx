import React, { Component } from 'react';
import ArticleMain from '../../common/articleTypes/articleMain';
import ArticleDate from '../../common/dateArticle';
import WithAcuArticlesData from '../../common/hocs/WithAcuArticlesData';
import filter from '../../../../../content/filters/LN/acumulado/articleAcu';
import BtnMasNotas from '../botonVerMasNotas';

const CLASS_W_100 = 'w-100-mobile';
//TODO: Este data section hay que cambiarlo por uno generico para cuerpo de acumulado.
const DATA_SECTION = 'CuerpoAcuRecetas';
class GrillaNotas extends Component {
    render() {
        let articlesComponents = [];
        const { articles } = this.props;
        if (articles && articles.length) {
            articlesComponents = articles.map((a, i) => {
                const dateComponent = (
                    <ArticleDate display_date={a.display_date} />
                );
                return (
                    <ArticleMain
                        dataSection={DATA_SECTION}
                        key={i}
                        articleData={a}
                        extraClasses={CLASS_W_100}
                    >
                        {dateComponent}
                    </ArticleMain>
                );
            });
        }

        return (
            <>
                <section className="row-gap-tablet-2 row-gap-deskxl-3 hlp-degrade">
                    {articlesComponents}
                </section>
                {this.props.hayMasNotas && (
                    <section className="row">
                        <BtnMasNotas
                            onClickHandler={this.props.obtenerMasNotas}
                            name={this.props.globalContent.name}
                        />
                    </section>
                )}
            </>
        );
    }
}

export default WithAcuArticlesData(GrillaNotas, filter, 'notaM');
