import React from 'react';
import '../../../../../resources/dist/css/ln/components/author.css';
import ComTitle from '../../../common/com-title';
import ComContainer from '../../../common/com-container';
import ComText from '../../../common/text';
import ComLink from '../../../common/com-link';
import getSocialsNetwork from '../../common/utils/getSocialsNetwork';
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

function WikiAuthor({
    data = {},
    outputType,
    classesNames = '',
    classCondition = ''
}) {
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
                        <ComTitle
                            tag="h1"
                            content={byline}
                            size="--xl"
                            weight="--font-extra"
                        />
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
}

export default WikiAuthor;
