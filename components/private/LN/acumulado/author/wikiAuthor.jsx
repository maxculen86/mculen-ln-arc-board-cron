import React from 'react';
import PropTypes from 'fusion:prop-types';
import '../../../../../resources/dist/css/ln/modules/wiki-autor.css';
import '../../../../../resources/dist/css/ln/components/author.css';
import '../../../../../resources/dist/css/ln/components/link.css';
import ComTitle from '../../../common/com-title';
import ComContainer from '../../../common/com-container';
import ComText from '../../../common/text';
import ModDescriptionList from '../../../common/mod-descriptionList';
import ListSocialIcons from '../../../common/list-socialicons';
import ImageAuthor from './imageAuthor';
import ComLink from '../../../common/com-link';
import ComSubtitle from '../../../common/com-subtitle';
import getSocialsNetwork from '../../common/utils/getSocialsNetwork';
import { wikiAuthorPropTypes } from '../../../common/utils/propTypesHelper';

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
                        <ImageAuthor
                            outputType={outputType}
                            url={url}
                            name={byline}
                        />
                    </div>
                )}
                <div className="col-12 col-tablet-8 col-deskxl-9">
                    <ComContainer classCondition="--info">
                        <ComTitle tag="h1" content={byline} size="--l" />
                        <ComText
                            extraClass="com-text --profesion"
                            size="--twoxs"
                            text={role}
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
                            tag="p"
                            size="--twoxs"
                            extraClass="com-text --bio"
                            text={longBio}
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
        ...wikiAuthorPropTypes
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
