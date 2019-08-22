import React, { Component } from 'react';
import ArticleMain from '../../common/articleTypes/articleMain';
import WithAcuArticlesData from '../../common/hocs/WithAcuArticlesData';
import filter from '../../../../../content/filters/LN/acumulado/articleAcu';
import BtnMasNotas from '../botonVerMasNotas';

const CLASS_W_100 = 'w-100-mobile';
class GrillaNotas extends Component {
    render() {
        let articles = [];
        if (this.props.articles && this.props.articles.length) {
            articles = this.props.articles.map((a, i) => {
                return (
                    <ArticleMain articleData={a} extraClasses={CLASS_W_100} />
                );
            });
        }

        return (
            <>
                <section className="row-gap-tablet-2 row-gap-desksm-3">
                    {articles}
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

export default WithAcuArticlesData(GrillaNotas); // TODO: dejo el filter comentado porque no me trae datos. REVISAR, filter);
