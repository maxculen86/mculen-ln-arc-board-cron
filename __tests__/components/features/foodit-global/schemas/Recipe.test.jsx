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
        const { container } = render(
            <RecipeSchema globalContent={mockArticle} />
        );
        const scripts = container.querySelectorAll(
            'script[type="application/ld+json"]'
        );
        expect(scripts.length).toBe(2);
    });

    it('outputs correct suitableForDiet URLs', () => {
        const { container } = render(
            <RecipeSchema globalContent={mockArticle} />
        );
        const scriptTags = Array.from(
            container.querySelectorAll('script[type="application/ld+json"]')
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
        const { container } = render(
            <RecipeSchema globalContent={mockArticle} />
        );
        const scriptTags = container.querySelectorAll(
            'script[type="application/ld+json"]'
        );
        const scriptContent = JSON.parse(scriptTags[0].textContent);
        expect(scriptContent.author.name).toBe('Redacción de Foodit');
    });

    it('renders correct recipe instructions', () => {
        const { container } = render(
            <RecipeSchema globalContent={mockArticle} />
        );
        const scriptTags = container.querySelectorAll(
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
        const { container } = render(
            <RecipeSchema globalContent={mockArticle} />
        );
        const scriptTags = container.querySelectorAll(
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
        const { container } = render(
            <RecipeSchema globalContent={mockArticle} />
        );
        const scriptTags = container.querySelectorAll(
            'script[type="application/ld+json"]'
        );
        const scriptContent = JSON.parse(scriptTags[0].textContent);
        expect(scriptContent.image.url).toBe(
            'https://sandbox-resizer.glanacion.com/resizer/v2/tortas-fritas-en-BWFX5NDNM5BOVBNDANNDLPUJEE.jpg?auth=1ae3b20d91791575a98302a665cc5743a15f6822c5332502d903e2058bb948e6&width=420&height=280&quality=70&smart=true'
        );
    });

    it('renders correct prep and cook times', () => {
        const { container } = render(
            <RecipeSchema globalContent={mockArticle} />
        );
        const scriptTags = container.querySelectorAll(
            'script[type="application/ld+json"]'
        );
        const scriptContent = JSON.parse(scriptTags[0].textContent);
        expect(scriptContent.performTime).toBe('PT60M');
        expect(scriptContent.cookTime).toBe('PT20M');
    });

    it('matches the snapshot', () => {
        const { container } = render(
            <RecipeSchema globalContent={mockArticle} />
        );

        expect(container).toMatchSnapshot();
    });
});
