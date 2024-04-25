import React from 'react';
import Context from 'fusion:context';

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import OpeningRecipe from '../../../../../../components/features/foodit-global/common/OpeningRecipe/foodit';
import withVideoArticle from '../../../../../../__mocks__/data/articlesFoodit/SubtypeReceta/withVideoOpening.json';
import Article from '../../../../../../__mocks__/data/articlesFoodit/SubtypeReceta/fichaReceta.json';

jest.mock('fusion:context', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

describe('OpeningRecipe Component', () => {
    Context.useAppContext = jest.fn(() => ({
        outputType: 'foodit',
        deployment: jest.fn(),
        contextPath: '/pf'
    }));

    it('renders without crashing when no props are provided', () => {
        const { container } = render(<OpeningRecipe />);
        expect(container).toBeTruthy();
    });

    const expectedResults = {
        headline: 'Receta para comer mas rico con ...MILANESAS',
        subheadline: 'con 10k me hago alta milanga',
        author: 'Por Elisabetta Piqué, Ariel Torres y Leo Mechi',
        photo: {
            _id: 'QIMN3EHZZBHCFIOTSI6W6YHBJY',
            caption: 'Acompañá las patas de pollo con zucchinis',
            url:
                'https://sandbox.lanacion.com.ar/resizer/v2/acompana-las-patas-de-pollo-con-QIMN3EHZZBHCFIOTSI6W6YHBJY.jpg?auth=3ff6e6c5380b892cfea80e335c062ca52c16b8a5e04a5d4635c54f0ac3e3e915&width=768&height=512&quality=70&smart=true',
            resized_urls: [
                /* array of resized URLs */
            ]
        },
        recipeDetail: {
            config: {
                cookTime: 18,
                cookingTypes: 'A la cazuela',
                counterTime: 21,
                occasions: 'Día de la Juventud, Día de la Amistad',
                prepTime: 3,
                regions: 'Sueca'
            }
        }
    };

    it('renders without crashing', () => {
        const { container } = render(<OpeningRecipe article={Article} />);
        expect(container).toBeTruthy();
    });

    it('displays the headline correctly', () => {
        render(<OpeningRecipe article={Article} />);
        expect(
            screen.getByText(`${expectedResults.headline}`)
        ).toBeInTheDocument();
    });

    it('displays the author correctly', () => {
        render(<OpeningRecipe article={Article} />);
        expect(screen.getByText(expectedResults.author)).toBeInTheDocument();
    });

    it('should show the author as: "Por Foodit" in case there is not author', () => {
        const { container } = render(
            <OpeningRecipe article={{ ...Article, credits: { by: [] } }} />
        );

        expect(screen.getByText('Por Foodit')).toBeInTheDocument();
    });

    it('displays the image with correct alt text', () => {
        render(<OpeningRecipe article={Article} />);
        expect(
            screen.getByAltText(expectedResults.photo.caption)
        ).toBeInTheDocument();
    });

    describe('Opening with VideoJW', () => {
        it('Renders facade', () => {
            const { container } = render(
                <OpeningRecipe article={withVideoArticle} />
            );
            expect(container).toBeTruthy();
            expect(
                screen.getByAltText('Waffle sin TACC y sin lácteos')
            ).toBeInTheDocument();
            expect(screen.getByTestId('facade-wzNCu0kE')).toBeInTheDocument();
        });
    });
});
