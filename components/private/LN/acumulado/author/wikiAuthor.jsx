import React from 'react';
import PropTypes from 'fusion:prop-types';
import '../../../../../resources/dist/css/ln/modules/wiki-autor.css';
import '../../../../../resources/dist/css/ln/components/author.css';
import '../../../../../resources/dist/css/ln/components/link.css';
import ComTitle from '../../../common/com-title';
import ComContainer from '../../../common/com-container';
import ComText from '../../../common/text';
import ComLink from '../../../common/com-link';
import getSocialsNetwork from '../../common/utils/getSocialsNetwork';
import { wikiAuthorPropTypes } from '../../../common/utils/propTypesHelper';
import {
    authorPhoto,
    authorEducation,
    authorLocation,
    authorAwards,
    authorLanguages,
    authorAffiliations,
    authorBooks,
    authorPodcast,
    authorSocialNetworks,
    authorExpertise
} from '../../../common/utils/wikiAuthorHelper';

const WikiAuthor = ({
    data = {},
    outputType,
    classesNames,
    classCondition
}) => {
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
        location,
        expertise = ''
    } = data;

    const socialsNetworks = getSocialsNetwork(data);

    return (
        <section className={`mod-wikiauthor ${classesNames} ${classCondition}`}>
            <div className="row">
                {authorPhoto(outputType, url, byline)}
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
                        {authorEducation(education)}
                        {authorLocation(location)}
                        {authorExpertise(expertise)}
                        {authorAwards(awards)}
                        {authorLanguages(languages)}
                        {authorAffiliations(affiliations)}
                        {authorBooks(books)}
                        {authorPodcast(podcasts)}
                    </ComContainer>
                </div>
                {authorSocialNetworks(socialsNetworks, data)}
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
