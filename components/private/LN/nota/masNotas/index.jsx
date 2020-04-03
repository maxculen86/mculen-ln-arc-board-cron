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

    const getTripleSize = size => ({
        tripleSize: size * 3,
        originalSize: size
    });

    const size = getTripleSize(cantidadNotas || 30);
    let sectionId = null;
    let excludeSectionId = false;
    if (filter === '1') sectionId = _id;
    else if (filter === '0' && subtype === '7') sectionId = '/recetas';
    else if (filter === '0' && subtype === '1') excludeSectionId = true;

    return (
        _id && (
            <ArticleList
                title={title}
                size={size}
                sectionId={sectionId}
                website={_website}
                destination="article"
                border={border}
                excludeSectionId={excludeSectionId}
            />
        )
    );
};

index.filterTypes = {
    0: 'Ultimas Noticias',
    1: 'Por Seccion'
};

export default index;
