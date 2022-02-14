import React from 'react';
import { shallow } from 'enzyme';
import {
    authorPhoto,
    authorEducation,
    authorLocation,
    authorAwards,
    authorLanguages,
    authorAffiliations,
    authorBooks,
    authorPodcast,
    authorSocialNetworks
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
        const wrapper = shallow(authorPhoto(outputType, url, byline));
        const imageElement = wrapper.find('mock-imageAuthor');

        expect(imageElement.exists()).toBeTruthy();
        expect(imageElement.prop('name')).toBe('Javier Blanco');
        expect(imageElement.prop('url')).toBe(
            'https://resizer.glanacion.com/resizer/0BhTvrLkGMQ2k7iw_97QKDQvhRw=/280x0/filters:quality(80)/s3.amazonaws.com/arc-authors/lanacionar/ded21cfd-b9a6-4cee-9a7b-22ad1fb00d1a.png'
        );
        expect(authorPhoto(outputType, undefined, byline)).toBe(null);
        expect(wrapper.render()).toMatchSnapshot();
    });

    it('Checking authorEducation', () => {
        const wrapper = shallow(authorEducation(education));
        const containerElement = wrapper.find('mock-com-container');
        const descriptionElement = containerElement.children();

        expect(containerElement.exists()).toBeTruthy();
        expect(descriptionElement.exists()).toBeTruthy();
        expect(descriptionElement.prop('list').length).toBe(2);
        expect(authorEducation([])).toBe(null);
        expect(wrapper.render()).toMatchSnapshot();
    });

    it('Checking authorLocation', () => {
        const wrapper = shallow(authorLocation(location));
        const containerElement = wrapper.find('mock-com-container');
        const descriptionElement = containerElement.children();

        expect(containerElement.exists()).toBeTruthy();
        expect(descriptionElement.exists()).toBeTruthy();
        expect(descriptionElement.prop('text')).toBe('Argentina');
        expect(authorLocation(undefined)).toBe(null);
        expect(wrapper.render()).toMatchSnapshot();
    });

    it('Checking authorAwards', () => {
        const wrapper = shallow(authorAwards(awards));
        const containerElement = wrapper.find('mock-com-container');
        const descriptionElement = containerElement.children();

        expect(containerElement.exists()).toBeTruthy();
        expect(descriptionElement.exists()).toBeTruthy();
        expect(descriptionElement.prop('list').length).toBe(2);
        expect(authorAwards([])).toBe(null);
        expect(wrapper.render()).toMatchSnapshot();
    });

    it('Checking authorLanguages', () => {
        const wrapper = shallow(authorLanguages(languages));
        const containerElement = wrapper.find('mock-com-container');
        const descriptionElement = containerElement.children();

        expect(containerElement.exists()).toBeTruthy();
        expect(descriptionElement.exists()).toBeTruthy();
        expect(descriptionElement.prop('text')).toBe('Ingles, Frances');
        expect(authorLanguages(undefined)).toBe(null);
        expect(wrapper.render()).toMatchSnapshot();
    });

    it('Checking authorAffiliations', () => {
        const wrapper = shallow(authorAffiliations(affiliations));
        const containerElement = wrapper.find('mock-com-container');
        const descriptionElement = containerElement.children();

        expect(containerElement.exists()).toBeTruthy();
        expect(descriptionElement.exists()).toBeTruthy();
        expect(descriptionElement.prop('text')).toBe('Academia de Periodismo.');
        expect(authorAffiliations(undefined)).toBe(null);
        expect(wrapper.render()).toMatchSnapshot();
    });

    it('Checking authorBooks', () => {
        const wrapper = shallow(authorBooks(books));
        const containerElement = wrapper.find('mock-com-container');
        const descriptionElement = containerElement.children();

        expect(containerElement.exists()).toBeTruthy();
        expect(descriptionElement.exists()).toBeTruthy();
        expect(descriptionElement.prop('list').length).toBe(1);
        expect(authorBooks([])).toBe(null);
        expect(wrapper.render()).toMatchSnapshot();
    });

    it('Checking authorPodcast', () => {
        const wrapper = shallow(authorPodcast(podcast));
        const containerElement = wrapper.find('mock-com-container');
        const descriptionElement = containerElement.children();

        expect(containerElement.exists()).toBeTruthy();
        expect(descriptionElement.exists()).toBeTruthy();
        expect(descriptionElement.prop('list').length).toBe(2);
        expect(authorPodcast([])).toBe(null);
        expect(wrapper.render()).toMatchSnapshot();
    });

    it('Checking authorSocialNetworks', () => {
        const wrapper = shallow(authorSocialNetworks(socialNetworks, data));
        const containerElement = wrapper.find('mock-com-container');
        const subTitleElement = containerElement.find('mock-com-subtitle');
        const socialIcons = containerElement.find('mock-social-icons');

        expect(containerElement.exists()).toBeTruthy();
        expect(subTitleElement.exists()).toBeTruthy();
        expect(socialIcons.exists()).toBeTruthy();
        expect(authorSocialNetworks([])).toBe(null);
        expect(wrapper.render()).toMatchSnapshot();
    });
});
