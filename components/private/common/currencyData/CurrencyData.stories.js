import { withDesign } from 'storybook-addon-designs';
import CurrencyData from './CurrencyData';

export default {
    title: 'LANA/Common/CurrencyData',
    decorators: [withDesign],
    component: CurrencyData
};

const Template = args => <CurrencyData {...args} />;

export const Tradicional = Template.bind({});
Tradicional.args = {
    title: 'Dolár CCL',
    purchaseValue: '000,00',
    saleValue: '',
    textBrand: 'texto link asociado al brand',
    urlBrand: ''
};

Tradicional.parameters = {
    design: {
        type: 'figma',
        url:
            'https://www.figma.com/file/UVY3wVRriGORNQUz51Drlr/DS-%2F-LN-Components?node-id=8600%3A87014'
    }
};
