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
    switch (filter) {
        case '0':
            title =
                subtype === '4' ? (
                    <strong>Últimas Recetas</strong>
                ) : (
                    <strong>{`Últimas Noticias`}</strong>
                );
            break;
        case '1':
            title = (
                <>
                    Mas recetas de
                    <strong>{` ${sectionName}`}</strong>
                </>
            );
            break;
        default:
            title = <strong>{`Ultimas Notas de ${sectionName}`}</strong>;
            break;
    }

    return (
        _id && (
            <div className="row">
                <h3 className="com-title-section-xl hlp-marginBottom-30">
                    {title}
                </h3>
                <section className="row-gap-tablet-3 row-gap-desksm-3 hlp-marginBottom-40">
                    <ArticleList
                        size={cantidadNotas}
                        sectionId={filter === '1' ? _id : undefined}
                        website={_website}
                        destination="article"
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
