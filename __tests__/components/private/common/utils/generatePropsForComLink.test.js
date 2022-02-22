import generateProps from '../../../../../components/private/common/utils/GetPropsForComLink';

const link = 'https://www.facebook.com/';
const dataEvent = undefined;
const dataSection = undefined;
const rel = undefined;
const target = '_blank';
const title = 'Esto es un titulo';
const textName = undefined;
const isString = false;
const children = {
    key: null,
    ref: null,
    props: {
        id: 'logo-lanacion.svg',
        notStatic: false,
        htmlOnly: true,
        persistent: true,
        children: {
            key: null,
            ref: null,
            props: {
                classCondition: ' com-logo la-nacion --xs',
                width: '50',
                height: '50',
                src:
                    'https://arc-static.glanacion.com/pf/resources/images/logo-lanacion.svg?d=%24LATEST',
                alt: 'LA NACION',
                amp: '',
                svg: true,
                srcsetAMP: '',
                href: '',
                target: '',
                withLazy: true,
                isApertura: false
            },
            _owner: null,
            _store: {}
        }
    },
    _owner: null,
    _store: {}
};
const style = undefined;
const SIZE_CLASS = '';
const EXTRA_CLASS = ' mod-image';

describe('Check props from generateProps', () => {
    const props = generateProps(
        link,
        dataEvent,
        dataSection,
        rel,
        target,
        title,
        textName,
        isString,
        children,
        style,
        SIZE_CLASS,
        EXTRA_CLASS
    );

    it('Check props generated', () => {
        expect(props.href).toBe('https://www.facebook.com/');
        expect(props.dataEvent).not.toBe(true);
        expect(props.dataSection).not.toBe(true);
        expect(props.rel).toBe('nofollow');
        expect(props.target).toBe('_blank');
        expect(props.children.props.id).toBe('logo-lanacion.svg');
        expect(props.className).toBe('com-link mod-image');
    });
});
