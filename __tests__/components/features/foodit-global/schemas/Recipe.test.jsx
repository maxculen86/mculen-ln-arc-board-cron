import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RecipeSchema } from '../../../../../components/features/foodit-global/schemas/Recipe';
import mockArticle from '../../../../../__mocks__/data/articlesFoodit/SubtypeReceta/fichaReceta2.json';

jest.mock('fusion:environment', () => {
    return {
        SITE_FOODIT: 'https://foodit.lanacion.com.ar'
    };
});

describe('components - features- foodit-global - schemas - RecipeSchema', () => {
    it('renders the correct number of schema script tags', () => {
        render(<RecipeSchema globalContent={mockArticle} />);
        const scripts = document.querySelectorAll(
            'script[type="application/ld+json"]'
        );
        expect(scripts.length).toBe(3);
    });

    it('outputs correct suitableForDiet URLs', () => {
        render(<RecipeSchema globalContent={mockArticle} />);
        const scriptTags = Array.from(
            document.querySelectorAll('script[type="application/ld+json"]')
        );
        const dietScriptTag = scriptTags.find(tag =>
            tag.textContent.includes('"suitableForDiet"')
        );

        expect(dietScriptTag).toBeTruthy();
        expect(dietScriptTag.textContent).toMatch(
            'https://schema.org/GlutenFreeDiet'
        );
    });

    it('renders correct author information', () => {
        render(<RecipeSchema globalContent={mockArticle} />);
        const scriptTags = document.querySelectorAll(
            'script[type="application/ld+json"]'
        );
        const scriptContent = JSON.parse(scriptTags[0].textContent);
        expect(scriptContent.author.name).toBe('Redacción de Foodit');
    });

    it('renders correct recipe instructions', () => {
        render(<RecipeSchema globalContent={mockArticle} />);
        const scriptTags = document.querySelectorAll(
            'script[type="application/ld+json"]'
        );
        const scriptContent = JSON.parse(scriptTags[0].textContent);
        expect(scriptContent.recipeInstructions).toEqual([
            {
                '@type': 'HowToStep',
                text: 'Poner en un bol la harina cernida y colocar en el centro la grasa a temperatura ambiente.',
                name: 'Paso 1'
            },
            {
                '@type': 'HowToStep',
                text: 'Con la punta de los dedos ir tomando la masa, agregando de a poco el agua con la sal y seguir hasta formar un bollo.',
                name: 'Paso 2'
            },
            {
                '@type': 'HowToStep',
                text: 'Amasarlo enérgicamente hasta que la masa forme ampollas en su superficie.',
                name: 'Paso 3'
            },
            {
                '@type': 'HowToStep',
                text: 'Dejar reposar durante 1 o 2 horas y luego cortar pequeñas pelotitas, achatarlas con la palma de la mano y pincharlas con un tenedor.',
                name: 'Paso 4'
            },
            {
                '@type': 'HowToStep',
                text: 'Freírlas enseguida en abundante aceite o grasa muy caliente, retirar con espumadera y colocar sobre papel blanco las torta fritas para que se escurran.',
                name: 'Paso 5'
            },
            {
                '@type': 'HowToStep',
                text: 'Espolvorearlas con azúcar molida.',
                name: 'Paso 6'
            }
        ]);
    });

    it('renders correct recipe ingredients', () => {
        render(<RecipeSchema globalContent={mockArticle} />);
        const scriptTags = document.querySelectorAll(
            'script[type="application/ld+json"]'
        );
        const scriptContent = JSON.parse(scriptTags[0].textContent);
        expect(scriptContent.recipeIngredient).toEqual([
            '500 g de Harina 0000',
            '4 Cda. de Manteca',
            '1/2 Tz. de Agua',
            '2 Cdita. de Sal',
            'Abadejo cantidad necesaria',
            'Acaí cantidad necesaria',
            'Arroz salvaje A Gusto',
            '300 Mililitro de Aceite',
            'Custom ing A',
            'Custom ing B',
            'Custom ing C',
            'Custom ing 2 A',
            'Custom ing 2 B',
            'Custom ing 2 C',
            '2 pizca de Arroz salvaje'
        ]);
    });

    it('renders correct image URL', () => {
        render(<RecipeSchema globalContent={mockArticle} />);
        const scriptTags = document.querySelectorAll(
            'script[type="application/ld+json"]'
        );
        const scriptContent = JSON.parse(scriptTags[0].textContent);
        expect(scriptContent.image.url).toBe(
            'https://sandbox-resizer.glanacion.com/resizer/v2/tortas-fritas-en-BWFX5NDNM5BOVBNDANNDLPUJEE.jpg?auth=1ae3b20d91791575a98302a665cc5743a15f6822c5332502d903e2058bb948e6&width=420&height=280&quality=70&smart=true'
        );
    });

    it('renders correct prep and cook times', () => {
        render(<RecipeSchema globalContent={mockArticle} />);
        const scriptTags = document.querySelectorAll(
            'script[type="application/ld+json"]'
        );
        const scriptContent = JSON.parse(scriptTags[0].textContent);
        expect(scriptContent.performTime).toBe('PT60M');
        expect(scriptContent.cookTime).toBe('PT20M');
    });

    it('renders an Article schema alongside Recipe', () => {
        render(<RecipeSchema globalContent={mockArticle} />);
        const scriptTags = Array.from(
            document.querySelectorAll('script[type="application/ld+json"]')
        );
        const articleScript = scriptTags.find(tag =>
            tag.textContent.includes('"Article"')
        );
        expect(articleScript).toBeTruthy();
        const content = JSON.parse(articleScript.textContent);
        expect(content['@type']).toBe('Article');
    });

    it('Article schema includes all required properties', () => {
        render(<RecipeSchema globalContent={mockArticle} />);
        const scriptTags = Array.from(
            document.querySelectorAll('script[type="application/ld+json"]')
        );
        const articleScript = scriptTags.find(tag =>
            tag.textContent.includes('"Article"')
        );
        const content = JSON.parse(articleScript.textContent);
        expect(content.headline).toBe('Receta de Tortas fritas criollas');
        expect(content.image).toEqual([
            'https://sandbox-resizer.glanacion.com/resizer/v2/tortas-fritas-en-BWFX5NDNM5BOVBNDANNDLPUJEE.jpg?auth=1ae3b20d91791575a98302a665cc5743a15f6822c5332502d903e2058bb948e6&width=420&height=280&quality=70&smart=true'
        ]);
        expect(content.datePublished).toBe('2024-01-25T18:30:37.695Z');
        expect(content.dateModified).toBe('2024-04-16T16:36:33.351Z');
        expect(content.author).toEqual({
            '@type': 'Person',
            name: 'Redacción de Foodit'
        });
        expect(content.publisher.name).toBe('Foodit');
        expect(content.mainEntityOfPage).toEqual({
            '@type': 'WebPage',
            '@id': 'https://foodit.lanacion.com.ar/recetas/receta-de-tortas-fritas-criollas-nid25012024/'
        });
    });

    it('matches the snapshot', () => {
        const { container } = render(
            <RecipeSchema globalContent={mockArticle} />
        );

        expect(container).toMatchSnapshot();
    });
});
