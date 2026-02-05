import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { StorytellingSchema } from '../../../../../components/features/foodit-global/schemas/Note';
import mockArticle from '../../../../../__mocks__/data/articlesFoodit/SubtypeStorytelling/3WA35TYAJJBETLFALJ4U3YDAZM.json';

jest.mock('fusion:environment', () => {
    return {
        SITE_FOODIT: 'https://foodit.lanacion.com.ar'
    };
});

describe('components - features- foodit-global - schemas - StorytellingSchema', () => {
    it('renders a BlogPosting schema script tag', () => {
        const { container } = render(
            <StorytellingSchema globalContent={mockArticle} />
        );
        const scriptTags = Array.from(
            container.querySelectorAll('script[type="application/ld+json"]')
        );
        const blogPostingScript = scriptTags.find(tag =>
            tag.textContent.includes('"BlogPosting"')
        );
        expect(blogPostingScript).toBeTruthy();
    });

    it('outputs correct @type and @context', () => {
        const { container } = render(
            <StorytellingSchema globalContent={mockArticle} />
        );
        const scriptTags = Array.from(
            container.querySelectorAll('script[type="application/ld+json"]')
        );
        const blogPostingScript = scriptTags.find(tag =>
            tag.textContent.includes('"BlogPosting"')
        );
        const content = JSON.parse(blogPostingScript.textContent);
        expect(content['@type']).toBe('BlogPosting');
        expect(content['@context']).toBe('https://schema.org');
    });

    it('includes all required Article properties', () => {
        const { container } = render(
            <StorytellingSchema globalContent={mockArticle} />
        );
        const scriptTags = Array.from(
            container.querySelectorAll('script[type="application/ld+json"]')
        );
        const blogPostingScript = scriptTags.find(tag =>
            tag.textContent.includes('"BlogPosting"')
        );
        const content = JSON.parse(blogPostingScript.textContent);
        expect(content.headline).toBeDefined();
        expect(content.image).toBeDefined();
        expect(content.datePublished).toBeDefined();
        expect(content.dateModified).toBeDefined();
        expect(content.author).toBeDefined();
        expect(content.publisher).toBeDefined();
        expect(content.mainEntityOfPage).toBeDefined();
    });

    it('renders image with lowercase key', () => {
        const { container } = render(
            <StorytellingSchema globalContent={mockArticle} />
        );
        const scriptTags = Array.from(
            container.querySelectorAll('script[type="application/ld+json"]')
        );
        const blogPostingScript = scriptTags.find(tag =>
            tag.textContent.includes('"BlogPosting"')
        );
        const content = JSON.parse(blogPostingScript.textContent);
        expect(content.image).toBeDefined();
        expect(content.Image).toBeUndefined();
    });

    it('renders correct dates', () => {
        const { container } = render(
            <StorytellingSchema globalContent={mockArticle} />
        );
        const scriptTags = Array.from(
            container.querySelectorAll('script[type="application/ld+json"]')
        );
        const blogPostingScript = scriptTags.find(tag =>
            tag.textContent.includes('"BlogPosting"')
        );
        const content = JSON.parse(blogPostingScript.textContent);
        expect(content.datePublished).toBe('2023-11-10T14:27:28.608Z');
        expect(content.dateModified).toBe('2023-11-10T14:27:28.850Z');
    });

    it('renders correct mainEntityOfPage', () => {
        const { container } = render(
            <StorytellingSchema globalContent={mockArticle} />
        );
        const scriptTags = Array.from(
            container.querySelectorAll('script[type="application/ld+json"]')
        );
        const blogPostingScript = scriptTags.find(tag =>
            tag.textContent.includes('"BlogPosting"')
        );
        const content = JSON.parse(blogPostingScript.textContent);
        expect(content.mainEntityOfPage).toEqual({
            '@type': 'WebPage',
            '@id': 'https://foodit.lanacion.com.ar/recetas/ficha-nota-sin-video-nid10112023/'
        });
    });

    it('matches the snapshot', () => {
        const { container } = render(
            <StorytellingSchema globalContent={mockArticle} />
        );
        expect(container).toMatchSnapshot();
    });
});
