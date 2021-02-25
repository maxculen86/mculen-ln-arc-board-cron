import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComTitle from './com-title';
import ComDate from './com-date';
import ModBajada from './mod-bajada';
import ModMarquesina from './mod-marquee';
import ComLabel from './com-labelArticle';
import ComLink from './com-link';
import listItems from './listItems';
import ListItemsFactory from './listItems';
import ListOrderedOrUnordered from '../LN/nota/cuerpo/listOrderedOrUnordered';
import ComTag from './com-tag';

const ModDescription = props => {
    const {
        link,
        titleTag,
        titleSize,
        titleText,
        authorSize,
        authors,
        subheadText,
        subheadSize,
        dateText,
        dateSize,
        label,
        lead,
        marquesina
    } = props;
    const list = [
        'Sección o Categoría',
        'Tag uno',
        'Tag dos',
        'Tag tres',
        'Tag cuatro con tema extra largo'
    ]; //BORRAR

    return (
        <section className="mod-description">
            {label && <ComLabel labelArticle={label} />}
            <ComTitle
                tag={titleTag || 'h2'}
                size={titleSize || '--xs'}
                link={link}
                content={titleText}
                lead={lead}
            />

            {subheadText && (
                <ModBajada
                    link={link}
                    subheadSize={subheadSize}
                    subheadText={subheadText}
                />
            )}
            <div>
                <ModMarquesina
                    text="Autor y Marquesina" /*{marquesina || authors}*/
                    size="--fourxs" /* {authorSize} */
                    link={link}
                />
                {list.map(item => (
                    <ComTag
                        iconName="bullet"
                        content={item}
                        sizeText="--fourxs"
                        sizeBullet="--fourxs"
                        link="#"
                        classCondition="--tags"
                    />
                ))}
            </div>

            {dateText && <ComDate display_date={dateText} size="--fourxs" />}
        </section>
    );
};

ModDescription.propTypes = {
    link: PropTypes.string,
    titleTag: PropTypes.string,
    titleSize: PropTypes.string,
    titleText: PropTypes.string.isRequired,
    subheadText: PropTypes.string,
    subheadSize: PropTypes.string,
    dateText: PropTypes.string,
    dateSize: PropTypes.string,
    authors: PropTypes.string,
    marquesina: PropTypes.string
};

ModDescription.defaultProps = {
    titleTag: 'h2',
    titleSize: '--xs',
    subheadText: false,
    subheadSize: '',
    dateText: undefined,
    dateSize: undefined,
    authors: 'Autor y',
    link: undefined,
    marquesina: 'Marquesina'
};

export default ModDescription;
