import React from 'react';
import ArticleList from './articleList';

const index = props => {
    const {
        customFields: { cantidadNotas, filter },
        globalContent: {
            subtype,
            taxonomy: {
                primary_section: { _id, parent_id, _website, name: sectionName }
            }
        }
    } = props;

    let title;
    let border = false;

    const getSectionTitle = noteType => {
        let prefix = '';
        switch (Number(noteType)) {
            case 1:
                prefix = 'Más sobre ';
                break;
            case 7:
                prefix = 'Más recetas de ';
                break;
            default:
                prefix = 'Más notas de ';
        }
        return prefix;
    };

    switch (filter) {
        case '0':
            title = subtype === '7' ? 'Últimas Recetas' : 'Últimas Noticias';
            break;
        case '1':
            border = true;
            title = (
                <>
                    {getSectionTitle(subtype)}
                    <strong>{` ${sectionName}`}</strong>
                </>
            );
            break;
        default:
            title = (
                <>
                    Últimas notas de
                    <strong>{` ${sectionName}`}</strong>
                </>
            );
            break;
    }

    const size = cantidadNotas || 30;
    let sectionId = null;
    let excludeSectionId = false;
    if (filter === '1') sectionId = _id;
    else if (filter === '0' && subtype === '7') sectionId = '/recetas';
    else if (filter === '0' && subtype === '1') excludeSectionId = true;

    return (
        _id && (
            <div className="row more-articles">
                <h2 className="com-title-section-l">{title}</h2>
                <section className="row-gap-tablet-3 row-gap-desksm-3">
                    <ArticleList
                        size={size + 1}
                        sectionId={sectionId}
                        website={_website}
                        destination="article"
                        border={border}
                        excludeSectionId={excludeSectionId}
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
