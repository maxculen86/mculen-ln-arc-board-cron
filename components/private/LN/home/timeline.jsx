/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import Article from '../../common/mod-article';
import ComHour from '../../common/com-hour';
import ModRowGap from '../../common/mod-rowgap';
import Link from '../../common/link';
import '../../../../resources/dist/css/ln/components/timeline.css';

const Timeline = ({ techo = '', techoLink = '', order = '' }) => {
    const MOCK_ARTICLES = [
        {
            title:
                'Lead. Title, este es un titular especial de nota noticia con unos 110 caracteres máximo y varias líneas que ocupar.'
        },
        {
            title:
                'Lead. Title, este es un titular especial de nota noticia con unos 110 caracteres máximo y varias líneas que ocupar.'
        },
        {
            title:
                'Lead. Title, este es un titular especial de nota noticia con unos 110 caracteres máximo y varias líneas que ocupar.'
        },
        {
            title:
                'Lead. Title, este es un titular especial de nota noticia con unos 110 caracteres máximo y varias líneas que ocupar.'
        }
    ];
    const MOCK_TIMELINE = [
        {
            title:
                'Title, este es un titular especial de nota noticia con unos 110 caracteres máximo y varias líneas que ocupar.',
            hours: (
                <ComHour
                    display_date="2022-06-13T16:30:10.646Z"
                    size="--twoxs"
                />
            ),
            link: 'https://www.lanacion.com.ar/'
        },
        {
            title:
                'Title, este es un titular especial de nota noticia con unos 110 caracteres máximo y varias líneas que ocupar.',
            hours: (
                <ComHour
                    display_date="2022-06-13T16:30:10.646Z"
                    size="--twoxs"
                />
            ),
            link: 'https://www.lanacion.com.ar/'
        },
        {
            title:
                'Title, este es un titular especial de nota noticia con unos 110 caracteres máximo y varias líneas que ocupar.',
            hours: (
                <ComHour
                    display_date="2022-06-13T16:30:10.646Z"
                    size="--twoxs"
                />
            ),
            link: 'https://www.lanacion.com.ar/'
        },
        {
            title:
                'Title, este es un titular especial de nota noticia con unos 110 caracteres máximo y varias líneas que ocupar.',
            hours: (
                <ComHour
                    display_date="2022-06-13T16:30:10.646Z"
                    size="--twoxs"
                />
            ),
            link: 'https://www.lanacion.com.ar/'
        },
        {
            title:
                'Title, este es un titular especial de nota noticia con unos 110 caracteres máximo y varias líneas que ocupar.',
            hours: (
                <ComHour
                    display_date="2022-06-13T16:30:10.646Z"
                    size="--twoxs"
                />
            ),
            link: 'https://www.lanacion.com.ar/'
        }
    ];
    const classCondition = order ? `${order}` : '--left-top';
    return (
        <ModRowGap classCondition={`timeline-home ${classCondition}`}>
            <div className="row-gap-tablet-2">
                {MOCK_ARTICLES.map(({ title }) => {
                    return <Article key={title} withMedia titleText={title} />;
                })}
            </div>
            <div className="timeline-content">
                <>
                    {techo && (
                        <Link
                            text={techo}
                            href={techoLink}
                            className="techo --m --sueca"
                        />
                    )}
                    {MOCK_TIMELINE.map(({ dateText, title, hours, link }) => {
                        return (
                            <>
                                <Article
                                    key={title}
                                    dateText={dateText}
                                    titleText={title}
                                    hour={hours}
                                    titleSize="--twoxs"
                                    link={link}
                                />
                            </>
                        );
                    })}
                </>
            </div>
        </ModRowGap>
    );
};

Timeline.propTypes = {
    techo: PropTypes.string,
    techoLink: PropTypes.string,
    order: PropTypes.string
};

export default Timeline;
