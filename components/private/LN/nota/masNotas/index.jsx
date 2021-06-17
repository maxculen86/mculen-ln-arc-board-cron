import React from 'react';
import ArticleList from './articleList';
import addForwardSlash from './../../common/utils/addForwardSlash';

const index = props => {
    const {
        customFields: { cantidadNotas, filter },
        globalContent: {
            subtype,
            taxonomy: {
                primary_section: {
                    _id,
                    parent_id,
                    _website,
                    name: sectionName,
                    path
                }
            }
        }
    } = props;

    let title;
    let border = false;
    let dataBlockName;

    const getSectionTitle = noteType => {
        let prefix = '';
        switch (Number(noteType)) {
            case 1:
                prefix = 'Otras noticias de&nbsp;';
                break;
            case 7:
                prefix = 'Más recetas de&nbsp;';
                break;
            default:
                prefix = 'Más notas de&nbsp;';
        }
        return prefix;
    };

    switch (filter.toString()) {
        case '0':
            title = subtype === '7' ? 'Últimas Recetas' : 'Últimas Noticias';
            dataBlockName = 'n_ultimas_noticias';
            break;
        case '1':
            border = true;
            title = `${getSectionTitle(subtype)}<a href='${addForwardSlash(
                path
            )}' class='com-link'>${sectionName}</a>`;
            dataBlockName = 'n_otras_noticias';
            break;
        default:
            title = `Últimas notas de <a href='${addForwardSlash(
                path
            )}' class='com-link'> ${sectionName}</a>`;
            dataBlockName = 'n_ultimas_noticias';
            break;
    }

    const getTripleSize = size => ({
        tripleSize: Math.ceil(size * 1.5),
        originalSize: size
    });

    const size = getTripleSize(cantidadNotas || 30);
    let sectionId = _id;
    let excludeSectionId = false;

    if (filter.toString() === '0' && subtype === '7') sectionId = '/recetas';
    if (filter.toString() === '0' && subtype === '1') excludeSectionId = true;

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
                sourceOrigin="composer"
                dataBlockName={dataBlockName}
            />
        )
    );
};

index.filterTypes = {
    0: 'Ultimas Noticias',
    1: 'Por Sección'
};

export default index;
