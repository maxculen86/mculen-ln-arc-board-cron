import React, { Component } from 'react';
import ArticleMain from '../../common/articleTypes/articleMain';
import ArticleDate from '../../common/dateArticle';
import WithAcuArticlesData from '../../common/hocs/WithAcuArticlesData';
import filter from '../../../../../content/filters/LN/acumulado/articleAcu';
import BtnMasNotas from '../botonVerMasNotas';

const CLASS_W_100 = 'w-100-mobile';
//TODO: Este data section hay que cambiarlo por uno generico para cuerpo de acumulado.
const DATA_SECTION = 'CuerpoAcuRecetas';
const CLASS_TRANSPARENCY = 'transparency';
class GrillaNotas extends Component {
    componentDidMount() {
        const divGrilla = document.querySelector('.hlp-degrade');
        if (divGrilla) {
            const transparencyDiv = document.createElement('div');
            transparencyDiv.classList.add(CLASS_TRANSPARENCY);
            divGrilla.appendChild(transparencyDiv);
            this.setAlturaTransparency();
            window.addEventListener('resize', () => {
                this.setAlturaTransparency();
            });
        }
    }

    setAlturaTransparency = () => {
        const articleGrid = document.querySelector('.mod-caja-nota');
        const alturaArticle = articleGrid.offsetHeight;
        document.querySelector(
            '.transparency'
        ).style.height = `${alturaArticle}px`;
    };

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
