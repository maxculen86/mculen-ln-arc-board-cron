import React from 'react';
import ArticleList from './articleList';

const index = props => {
    const {
        customFields: { cantidadNotas, filter },
        globalContent: {
            subtype,
            taxonomy: {
                primary_section: { _id, _website, name: sectionName }
            }
        }
    } = props;

    let title;
    let border = false;

    switch (filter) {
        case '0':
            title =
                subtype === '7' ? (
                    <h4>Últimas Recetas</h4>
                ) : (
                    <h4>{`Últimas Noticias`}</h4>
                );
            break;
        case '1':
            border = true;
            title = (
                <>
                    Más recetas de
                    <strong>{` ${sectionName}`}</strong>
                </>
            );
            break;
        default:
            title = <h4>{`Últimas notas de ${sectionName}`}</h4>;
            break;
    }

    return (
        _id && (
            <div className="row more-articles">
                <h2 className="com-title-section-l">{title}</h2>
                <section className="row-gap-tablet-3 row-gap-desksm-3">
                    <ArticleList
                        size={cantidadNotas + 1}
                        sectionId={filter === '1' ? _id : undefined}
                        website={_website}
                        destination="article"
                        border={border}
                    />
                </section>
            </div>
        )
    );
};

index.filterTypes = {
    0: 'Ultimas Noticias',
    1: 'Por Seccion'
};

export default index;
