import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
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
} from '../../../../../components/private/common/utils/wikiAuthorHelper';

jest.mock(
    '../../../../../components/private/common/com-container',
    () => 'mock-com-container'
);

jest.mock(
    '../../../../../components/private/LN/acumulado/author/imageAuthor',
    () => 'mock-imageAuthor'
);

jest.mock(
    '../../../../../components/private/common/mod-descriptionList',
    () => 'mock-mod-description'
);

jest.mock(
    '../../../../../components/private/common/com-subtitle',
    () => 'mock-com-subtitle'
);

jest.mock(
    '../../../../../components/private/common/list-socialicons',
    () => 'mock-social-icons'
);

describe('WIkiAuthorHelper functions test', () => {
    const outputType = 'default';
    const affiliations = 'Academia de Periodismo.';
    const awards = [
        {
            name:
                'Condecorado por el gobierno de la República de Brasil con la Orden de Río Branco, 2002.'
        },
        {
            name:
                'Condecorado por el gobierno de la República de Brasil con la Orden de Río Branco, 2002.'
        }
    ];
    const byline = 'Javier Blanco';
    const education = [
        {
            name: 'Periodismo, Universidad de Buenos Aires, 1989.'
        },
        {
            name: 'Periodismo, Universidad de Buenos Aires, 1995.'
        }
    ];
    const books = [
        {
            publisher: 'Editorial',
            title: 'Carlos Pagni en Odisea Argentina',
            url: 'https://google.com'
        }
    ];
    const url =
        'https://resizer.glanacion.com/resizer/0BhTvrLkGMQ2k7iw_97QKDQvhRw=/280x0/filters:quality(80)/s3.amazonaws.com/arc-authors/lanacionar/ded21cfd-b9a6-4cee-9a7b-22ad1fb00d1a.png';
    const podcast = [
        {
            name: 'Un podcast',
            url: 'https://google.com'
        },
        {
            name: 'Segundo Podcast',
            url: 'https://google.com'
        }
    ];
    const languages = 'Ingles, Frances';
    const location = 'Argentina';
    const socialNetworks = [
        '@javierblancook',
        'facebook.com.ar',
        'https://youtube.com',
        'https://instagram.com',
        'https://linkedIn.com',
        'https://medium.com',
        'https://google.com.ar',
        'https://pinterest.com',
        'https://soundcloud.com',
        'https://snapchat.com',
        'https://whasapp.com',
        'https://google.com.ar'
    ];
    const expertise = 'Economia, Politica';
    const data = {
        facebook: 'facebook.com.ar',
        instagram: 'https://instagram.com',
        languages: 'Ingles, Frances',
        linkedin: 'https://linkedIn.com',
        medium: 'https://medium.com',
        name: 'Javier Blanco',
        node_type: 'author',
        personal_website: 'https://google.com',
        pinterest: 'https://pinterest.com',
        reddit: 'https://google.com.ar',
        role: 'LA NACION',
        slug: 'javier-blanco-170',
        snapchat: 'https://snapchat.com',
        soundcloud: 'https://soundcloud.com',
        tumblr: 'https://google.com.ar',
        twitter: '@javierblancook',
        whatsapp: 'https://whasapp.com',
        youtube: 'https://youtube.com',
        _id: 'javier-blanco-170'
    };

    it('Checking authorPhoto', () => {
        const { container } = render(authorPhoto(outputType, url, byline));
        const imageElement = container.getElementsByTagName('mock-imageAuthor');

        expect(imageElement[0]).toBeVisible();
        expect(imageElement[0].getAttribute('name')).toBe('Javier Blanco');
        expect(imageElement[0].getAttribute('url')).toBe(
            'https://resizer.glanacion.com/resizer/0BhTvrLkGMQ2k7iw_97QKDQvhRw=/280x0/filters:quality(80)/s3.amazonaws.com/arc-authors/lanacionar/ded21cfd-b9a6-4cee-9a7b-22ad1fb00d1a.png'
        );
        expect(authorPhoto(outputType, undefined, byline)).toBe(null);
        expect(container).toMatchSnapshot();
    });

    it('Checking authorEducation', () => {
        const { container } = render(authorEducation(education));
        const containerElement = container.getElementsByTagName(
            'mock-com-container'
        );
        const descriptionElement = containerElement[0].getElementsByTagName(
            'mock-mod-description'
        );
        const lists = descriptionElement[0].getAttribute('list');

        expect(containerElement[0]).toBeVisible();
        expect(descriptionElement[0]).toBeVisible();
        expect(lists).toBeDefined();
        expect(authorEducation([])).toBe(null);
        expect(container).toMatchSnapshot();
    });

    it('Checking authorLocation', () => {
        const { container } = render(authorLocation(location));
        const containerElement = container.getElementsByTagName(
            'mock-com-container'
        );
        const descriptionElement = containerElement[0].getElementsByTagName(
            'mock-mod-description'
        );

        expect(containerElement[0]).toBeVisible();
        expect(descriptionElement[0]).toBeVisible();
        expect(descriptionElement[0].getAttribute('text')).toBe('Argentina');
        expect(authorLocation(undefined)).toBe(null);
        expect(container).toMatchSnapshot();
    });

    it('Checking authorAwards', () => {
        const { container } = render(authorAwards(awards));
        const containerElement = container.getElementsByTagName(
            'mock-com-container'
        );
        const descriptionElement = containerElement[0].getElementsByTagName(
            'mock-mod-description'
        );
        const lists = descriptionElement[0].getAttribute('list');

        expect(containerElement[0]).toBeVisible();
        expect(descriptionElement[0]).toBeVisible();
        expect(lists).toBeDefined();
        expect(authorEducation([])).toBe(null);
        expect(container).toMatchSnapshot();
    });

    it('Checking authorLanguages', () => {
        const { container } = render(authorLanguages(languages));
        const containerElement = container.getElementsByTagName(
            'mock-com-container'
        );
        const descriptionElement = containerElement[0].getElementsByTagName(
            'mock-mod-description'
        );

        expect(containerElement[0]).toBeVisible();
        expect(descriptionElement[0]).toBeVisible();
        expect(descriptionElement[0].getAttribute('text')).toBe(
            'Ingles, Frances'
        );
        expect(authorLocation(undefined)).toBe(null);
        expect(container).toMatchSnapshot();
    });

    it('Checking authorAffiliations', () => {
        const { container } = render(authorAffiliations(affiliations));
        const containerElement = container.getElementsByTagName(
            'mock-com-container'
        );
        const descriptionElement = containerElement[0].getElementsByTagName(
            'mock-mod-description'
        );

        expect(containerElement[0]).toBeVisible();
        expect(descriptionElement[0]).toBeVisible();
        expect(descriptionElement[0].getAttribute('text')).toBe(
            'Academia de Periodismo.'
        );
        expect(authorLocation(undefined)).toBe(null);
        expect(container).toMatchSnapshot();
    });

    it('Checking authorBooks', () => {
        const { container } = render(authorBooks(books));
        const containerElement = container.getElementsByTagName(
            'mock-com-container'
        );
        const descriptionElement = containerElement[0].getElementsByTagName(
            'mock-mod-description'
        );
        const lists = descriptionElement[0].getAttribute('list');

        expect(containerElement[0]).toBeVisible();
        expect(descriptionElement[0]).toBeVisible();
        expect(lists).toBeDefined();
        expect(authorEducation([])).toBe(null);
        expect(container).toMatchSnapshot();
    });

    it('Checking authorPodcast', () => {
        const { container } = render(authorPodcast(podcast));

        const containerElement = container.getElementsByTagName(
            'mock-com-container'
        );
        const descriptionElement = containerElement[0].getElementsByTagName(
            'mock-mod-description'
        );
        const lists = descriptionElement[0].getAttribute('list');

        expect(containerElement[0]).toBeVisible();
        expect(descriptionElement[0]).toBeVisible();
        expect(lists).toBeDefined();
        expect(authorEducation([])).toBe(null);
        expect(container).toMatchSnapshot();
    });

    it('Checking authorSocialNetworks', () => {
        const { container } = render(
            authorSocialNetworks(socialNetworks, data)
        );
        const containerElement = container.getElementsByTagName(
            'mock-com-container'
        );
        const subTitleElement = container.getElementsByTagName(
            'mock-com-subtitle'
        );
        const socialIcons = container.getElementsByTagName('mock-social-icons');

        expect(containerElement[0]).toBeVisible();
        expect(subTitleElement[0]).toBeVisible();
        expect(socialIcons[0]).toBeVisible();
        expect(authorSocialNetworks([])).toBe(null);
        expect(container).toMatchSnapshot();
    });

    it('Checking authorExpertise', () => {
        const { container } = render(authorExpertise(expertise));
        const containerElement = container.getElementsByTagName(
            'mock-com-container'
        );
        const descriptionElement = containerElement[0].getElementsByTagName(
            'mock-mod-description'
        );

        expect(containerElement[0]).toBeVisible();
        expect(descriptionElement[0]).toBeVisible();
        expect(descriptionElement[0].getAttribute('text')).toBe(
            'Economia, Politica'
        );
        expect(authorExpertise(undefined)).toBe(null);
        expect(container).toMatchSnapshot();
    });
});
