import React from 'react';
import PropTypes from 'fusion:prop-types';

import '../../../../../resources/dist/css/ln/modules/wiki-autor.css';
import '../../../../../resources/dist/css/ln/components/author.css';

// TODO: los siguientes enlaces son para agregar en base

// import '../../../../../resources/dist/css/ln/components/title.css';
import '../../../../../resources/dist/css/ln/components/link.css';
import ComTitle from '../../../common/com-title';
import ComContainer from '../../../common/com-container';
import ComText from '../../../common/com-text';
import ModDescriptionList from '../../../common/mod-descriptionList';
import ListSocialIcons from '../../../common/list-socialicons';
import ImageAuthor from './imageAuthor';
import ComLink from '../../../common/com-link';
import ComSubtitle from '../../../common/com-subtitle';
import getSocialsNetwork from '../../common/utils/getSocialsNetwork';
import ComAdvance from '../../../common/com-advance';
import ModCallToComments from '../../../common/mod-callToComments';
// import ModWikiAuthor from '../../../common/mod-wikiAuthor';
// import '../../../../../resources/dist/css/ln/base/helpers.css';

const WikiAuthor = ({ data, outputType, classesNames, classCondition }) => {
    const {
        byline,
        email,
        role,
        longBio,
        image: { url },
        books = [],
        podcasts = [],
        education = [],
        awards = [],
        personal_website: personalWebsite,
        languages,
        affiliations,
        location
    } = data || {};

    const socialsNetworks = getSocialsNetwork(data);

    return (
        <section
            className={`mod-wikiauthor ${classesNames || ''} ${classCondition ||
                ''}`}
        >
            <div className="row">
                {url && (
                    <div className="col-12 col-tablet-4 col-deskxl-3">
                        <ImageAuthor outputType={outputType} url={url} />
                    </div>
                )}
                <div className="col-12 col-tablet-8 col-deskxl-9">
                    <ComContainer classCondition="--info">
                        <ComTitle tag="h1" content={byline} size="--l" />
                        <ComText
                            textname={role}
                            classCondition="--profesion"
                            size="--twoxs"
                        />
                        <ComContainer classCondition="--contact">
                            {email && (
                                <ComLink
                                    link={`mailto:${email}`}
                                    textname={email}
                                />
                            )}
                            {email && personalWebsite ? ' - ' : ''}
                            {personalWebsite && (
                                <ComLink
                                    link={personalWebsite}
                                    textname={personalWebsite}
                                />
                            )}
                        </ComContainer>
                        <ComText
                            size="--twoxs"
                            classCondition="--bio"
                            textname={longBio}
                        />
                        {education.length > 0 && (
                            <ComContainer classCondition="--educacion">
                                <ModDescriptionList
                                    bullet
                                    sizeBullet="--twoxs"
                                    descriptionTitle="Educación"
                                    size="--twoxs"
                                    list={education}
                                />
                            </ComContainer>
                        )}
                        {location && (
                            <ComContainer>
                                <ModDescriptionList
                                    classCondition="--idiomas"
                                    descriptionTitle="Ubicación:"
                                    size="--twoxs"
                                    text={location}
                                />
                            </ComContainer>
                        )}
                        {awards.length > 0 && (
                            <ComContainer classCondition="--reconocimientos">
                                <ModDescriptionList
                                    descriptionTitle="Reconocimientos"
                                    size="--twoxs"
                                    list={awards}
                                />
                            </ComContainer>
                        )}
                        {languages && (
                            <ComContainer>
                                <ModDescriptionList
                                    classCondition="--idiomas"
                                    descriptionTitle="Idiomas:"
                                    size="--twoxs"
                                    text={languages}
                                />
                            </ComContainer>
                        )}
                        {affiliations && (
                            <ComContainer>
                                <ModDescriptionList
                                    classCondition="--membresia"
                                    descriptionTitle="Membresías profesionales:"
                                    size="--twoxs"
                                    text={affiliations}
                                />
                            </ComContainer>
                        )}
                        {books.length > 0 && (
                            <ComContainer>
                                <ModDescriptionList
                                    descriptionTitle="Publicaciones"
                                    size="--twoxs"
                                    list={books}
                                />
                            </ComContainer>
                        )}
                        {podcasts.length > 0 && (
                            <ComContainer>
                                <ModDescriptionList
                                    descriptionTitle="Podcast"
                                    size="--twoxs"
                                    list={podcasts}
                                />
                            </ComContainer>
                        )}
                    </ComContainer>
                </div>
                {socialsNetworks.length > 0 && (
                    <div className="col-12">
                        <ComContainer classCondition="--socialicons">
                            <ComSubtitle size="--twoxs">Conectar</ComSubtitle>
                            <ListSocialIcons
                                sizeIcon="--xl"
                                // sizeBullet="--xs"
                                data={data}
                                size="--threexs"
                                vertical=""
                            />
                        </ComContainer>
                    </div>
                )}
            </div>
        </section>
    );
};

WikiAuthor.propTypes = {
    data: PropTypes.shape({
        byline: PropTypes.string,
        email: PropTypes.string,
        role: PropTypes.string,
        longBio: PropTypes.string,
        image: PropTypes.shape({
            url: PropTypes.string
        }),
        books: PropTypes.arrayOf(
            PropTypes.shape({
                title: PropTypes.string,
                publisher: PropTypes.string,
                url: PropTypes.string
            })
        ),
        podcasts: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
                url: PropTypes.string
            })
        ),
        education: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string
            })
        ),
        awards: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string
            })
        ),
        personal_website: PropTypes.string,
        languages: PropTypes.string,
        affiliations: PropTypes.string
    }).isRequired,
    classesNames: PropTypes.string,
    classCondition: PropTypes.string,
    outputType: PropTypes.string.isRequired
};

WikiAuthor.defaultProps = {
    classesNames: '',
    classCondition: ''
};

export default WikiAuthor;
