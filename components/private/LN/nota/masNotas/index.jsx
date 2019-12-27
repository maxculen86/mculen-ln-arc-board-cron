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
            title = subtype === '7' ? 'Últimas Recetas' : 'Últimas Noticias';
            break;
        case '1':
            border = true;
            title =
                subtype === '7' ? (
                    <>
                        Más recetas de
                        <strong>{` ${sectionName}`}</strong>
                    </>
                ) : (
                    <h4>{`Más notas de`}</h4>
                );
            break;
        default:
            title = <h4>{`Últimas notas de ${sectionName}`}</h4>;
            break;
    }

    const size = cantidadNotas || 30;

    return (
        _id && (
            <div className="row more-articles">
                <h2 className="com-title-section-l">{title}</h2>
                <section className="row-gap-tablet-3 row-gap-desksm-3">
                    <ArticleList
                        size={size + 1}
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
