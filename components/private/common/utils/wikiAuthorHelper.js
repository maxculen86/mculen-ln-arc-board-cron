import React from 'react';
import ImageAuthor from '../../LN/acumulado/author/imageAuthor';
import ComContainer from '../com-container';
import ModDescriptionList from '../mod-descriptionList';
import ComSubtitle from '../com-subtitle';
import ListSocialIcons from '../list-socialicons';
import { replaceAllUrlsResizerObject } from '../../LN/common/utils/mediaHelper';

export const authorPhoto = (outputType, url, byline) => {
    return url ? (
        <div className="col-12 col-tablet-4 col-deskxl-3">
            <ImageAuthor
                outputType={outputType}
                url={replaceAllUrlsResizerObject(url)}
                name={byline}
            />
        </div>
    ) : null;
};

export const authorExpertise = expertise => {
    return expertise ? (
        <ComContainer classCondition="--educacion">
            <ModDescriptionList
                classCondition="--idiomas"
                descriptionTitle="Áreas de interés:"
                size="--twoxs"
                text={expertise}
            />
        </ComContainer>
    ) : null;
};

export const authorEducation = education => {
    return education.length > 0 ? (
        <ComContainer classCondition="--educacion">
            <ModDescriptionList
                bullet
                sizeBullet="--twoxs"
                descriptionTitle="Educación"
                size="--twoxs"
                list={education}
            />
        </ComContainer>
    ) : null;
};

export const authorLocation = location => {
    return location ? (
        <ComContainer>
            <ModDescriptionList
                classCondition="--idiomas"
                descriptionTitle="Ubicación:"
                size="--twoxs"
                text={location}
            />
        </ComContainer>
    ) : null;
};

export const authorAwards = awards => {
    return awards.length > 0 ? (
        <ComContainer classCondition="--reconocimientos">
            <ModDescriptionList
                descriptionTitle="Reconocimientos"
                size="--twoxs"
                list={awards}
            />
        </ComContainer>
    ) : null;
};

export const authorLanguages = languages => {
    return languages ? (
        <ComContainer>
            <ModDescriptionList
                classCondition="--idiomas"
                descriptionTitle="Idiomas:"
                size="--twoxs"
                text={languages}
            />
        </ComContainer>
    ) : null;
};

export const authorAffiliations = affiliations => {
    return affiliations ? (
        <ComContainer>
            <ModDescriptionList
                classCondition="--membresia"
                descriptionTitle="Membresías profesionales:"
                size="--twoxs"
                text={affiliations}
            />
        </ComContainer>
    ) : null;
};

export const authorBooks = (books = []) => {
    const validatedBooks = books.filter((book = {}) => {
        const { title = '' } = book;
        return title !== '';
    });
    return validatedBooks.length > 0 ? (
        <ComContainer>
            <ModDescriptionList
                descriptionTitle="Publicaciones"
                size="--twoxs"
                list={validatedBooks}
            />
        </ComContainer>
    ) : null;
};

export const authorPodcast = (podcasts = []) => {
    const validatedPodcast = podcasts.filter((podcast = {}) => {
        const { name = '' } = podcast;
        return name !== '';
    });
    return validatedPodcast.length > 0 ? (
        <ComContainer>
            <ModDescriptionList
                descriptionTitle="Podcast"
                size="--twoxs"
                list={validatedPodcast}
            />
        </ComContainer>
    ) : null;
};

export const authorSocialNetworks = (socialNetworks, data) => {
    return socialNetworks.length > 0 ? (
        <div className="col-12">
            <ComContainer classCondition="--socialicons">
                <ComSubtitle size="--twoxs">Conectar</ComSubtitle>
                <ListSocialIcons
                    sizeIcon="--xl"
                    data={data}
                    size="--threexs"
                    vertical=""
                />
            </ComContainer>
        </div>
    ) : null;
};
