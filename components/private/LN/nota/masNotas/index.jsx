import React from 'react';
import ArticleList from './articleList';

const index = props => {
    const {
        customFields: { cantidadNotas, filter, border },
        globalContent: {
            subtype,
            taxonomy: {
                primary_section: { _id, _website, name: sectionName }
            }
        }
    } = props;

    let title;
    switch (filter) {
        case '0':
            title =
                subtype === '4' ? (
                    <h4>Últimas Recetas</h4>
                ) : (
                    <strong>{`Últimas Noticias`}</strong>
                );
            break;
        case '1':
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
                <h3 className="com-title-section-xl">{title}</h3>
                <section className="row-gap-tablet-3 row-gap-desksm-3">
                    <ArticleList
                        size={cantidadNotas}
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
