import CardHtmlFeature from '../../../../../components/features/LN-10/CardHtml/json';

jest.mock('fusion:consumer', () => {
    return Component =>
        class extends Component {
            fetchContent() {
                void 0;
            }
        };
});

describe('CardHtml Feature test', () => {
    const arcSite = 'la-nacion-ar';
    const mockWebComponent = `<div><script type="module" src="https://unpkg.com/bootstrap-grid-webcomponents@0.1.3/dist/bootstrap-grid-webcomponents/bootstrap-grid-webcomponents.esm.js"></script><bs-row><bs-col><img src="https://placekitten.com/g/400/200" width="100%" height="100%"></bs-col><bs-col><img src="https://placekitten.com/g/300/200" width="100%" height="100%"></bs-col></bs-row></div>`;

    const getProps = ({
        title = 'Prueba Html',
        html = mockWebComponent,
        heightMobile = 100,
        heightTablet = 100,
        heightDesktop = 100,
        hideAppMobile = false
    } = {}) => {
        return {
            id: 'featureId',
            customFields: {
                title,
                html,
                heightMobile,
                heightTablet,
                heightDesktop,
                hideAppMobile
            }
        };
    };

    it('Renders null', () => {
        const cardHtml = new CardHtmlFeature({
            ...getProps({ hideAppMobile: true })
        });
        expect(cardHtml.render()).toBeNull();
    });

    it('Renders the component', () => {
        const cardHtml = new CardHtmlFeature({
            ...getProps({ hideAppMobile: false })
        });
        const response = cardHtml.render();
        expect(response).not.toBeNull();
        expect(response.html).not.toBeNull();
        expect(response.heightMobile).toBe(100);
        expect(response.heightTablet).toBe(100);
        expect(response.heightDesktop).toBe(100);
    });
});
