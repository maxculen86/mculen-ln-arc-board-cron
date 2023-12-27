import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import buildBody from '../../../../../components/features/foodit/Body/children/_buildBody'; // Ajusta la ruta según sea necesario

describe('buildBody', () => {
    it('retorna un componente vacío si content_elements está vacío', () => {
        const { container } = render(
            buildBody({ globalContent: { content_elements: [] } })
        );
        expect(container).toBeEmptyDOMElement();
    });

    it('renderiza correctamente para diferentes tipos de elementos', () => {
        const globalContent = {
            content_elements: [
                {
                    _id: 'C4FZ7G4FHNA2BJZJBFFIJZUOO4',
                    type: 'text',
                    alignment: 'left',
                    content: 'SAYONARA!'
                },
                {
                    type: 'image',
                    url:
                        'https://sandbox.lanacion.com.ar/resizer/v2/pie-de-Y7QVZMP2HVHQJKC4GZBDRFO3AM.jpg?auth=d09ee45fdc3698e9fe7231ec47274abd6aaf415ef3ef9100618d8a0b304db2b8&width=768&height=510&quality=70&smart=true',
                    caption: 'Pie de foto',
                    subtitle: '',
                    resized_urls: [
                        {
                            resizedUrl:
                                'https://sandbox.lanacion.com.ar/resizer/v2/pie-de-Y7QVZMP2HVHQJKC4GZBDRFO3AM.jpg?auth=d09ee45fdc3698e9fe7231ec47274abd6aaf415ef3ef9100618d8a0b304db2b8&width=780&height=518&quality=70&smart=true',
                            option: {
                                width: 780,
                                height: 520,
                                minScreenWidth: 768,
                                media_preload: '(min-width: 768px)'
                            }
                        },
                        {
                            resizedUrl:
                                'https://sandbox.lanacion.com.ar/resizer/v2/pie-de-Y7QVZMP2HVHQJKC4GZBDRFO3AM.jpg?auth=d09ee45fdc3698e9fe7231ec47274abd6aaf415ef3ef9100618d8a0b304db2b8&width=420&height=279&quality=70&smart=true',
                            option: {
                                width: 420,
                                height: 280,
                                media_preload: '(max-width: 767px)'
                            }
                        }
                    ]
                }
            ],
            subtype: '4'
        };
        const { getByText, container } = render(buildBody({ globalContent }));
        expect(getByText('SAYONARA!')).toBeInTheDocument();
        expect(getByText('Pie de foto')).toBeInTheDocument();

        expect(container.querySelector('section.content')).toBeInTheDocument();
        expect(
            container.querySelector('section.full-width')
        ).toBeInTheDocument();
    });
});
