import React from 'react';
import { render } from '@testing-library/react';
import Context from 'fusion:context';
import '@testing-library/jest-dom';
import { useAppContext } from 'fusion:context';
import { ChefSchema } from '../../../../../components/features/foodit-global/schemas/Chef';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

jest.mock('fusion:environment', () => {
    return {
        SITE_FOODIT: 'https://foodit.lanacion.com.ar'
    };
});

jest.mock('fusion:context', Component => {
    return function (Component) {
        return props => <Component {...props} />;
    };
});

describe('components - features- foodit-global - schemas - ChefSchema', () => {
    Context.useAppContext = jest.fn(() => ({
        deployment: jest.fn(),
        contextPath: '/pf'
    }));

    it('renders chefSchema', () => {
        const globalContent = {
            _id: 'juan-pravata-666',
            byline: 'Juan Pravata',
            role: 'Programador',
            image: {
                url: 'https://sandbox-resizer.glanacion.com/resizer/v2/https%3A%2F%2Fs3.amazonaws.com%2Farc-authors%2Flanacionar%2F5362338d-13d7-4ed6-83ef-a17dffa61167.jpg?auth=820fe21613127ce5fb08247616be9addc1ba894dcfdc5a76e10b06014f66dca1&width=280&quality=70&smart=false'
            },
            email: 'pravata.juan@gmail.com',
            facebook: 'facebook.com.ar',
            twitter: 'jpravataok',
            bio_page: '/autor/juan-pravata-666/',
            location: 'Argentina',
            bio: 'Programador web',
            linkedin: 'https://linkedIn.com',
            instagram: 'https://instagram.com/juanpravatanorecuerdotuinsta/',
            tumblr: 'https://google.com.ar',
            medium: 'https://medium.com',
            pinterest: '@datorandompinteret',
            youtube: '@juanpravatanotengoyoutube',
            whatsapp: 'https://whasapp.com',
            reddit: 'https://google.com.ar'
        };

        const { container } = render(
            <ChefSchema globalContent={globalContent} />
        );

        const scripts = document.querySelector(
            'script[type="application/ld+json"]'
        );
        const scriptContent = JSON.parse(scripts.textContent);
        const { name, url } = scriptContent;

        expect(scripts).toBeInTheDocument();
        expect(name).toEqual('Juan Pravata');
        expect(url).toEqual('/chefs-protagonistas/juan-pravata-666/');

        expect(container).toMatchSnapshot();
    });

    it('renders chefSchema without data', () => {
        render(<ChefSchema globalContent={{}} />);

        const scripts = document.querySelector(
            'script[type="application/ld+json"]'
        );

        expect(scripts).toBeInTheDocument();
    });
});
