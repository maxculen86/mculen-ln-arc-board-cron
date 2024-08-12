import PropTypes from 'fusion:prop-types';
import { Button } from '@ln/contenidos-ui-button';
import { Text } from '@ln/contenidos-ui-text';
import { Icon } from '@ln/common-ui-icon';
import IconSprite from '../../../features/private-global/common/iconSprite/IconSprite';
import addEventToDataLayer from '../../LN/common/utils/addEventToDataLayer';
import classNames from 'classnames';

const ToggleButton = ({ contentVariant, handleToggle }) => {
    const notaCompletaBttn = classNames('audio-toggle-left --border-light-400');
    const resumenConIABttn = classNames(
        'audio-toggle-right --border-light-400'
    );

    const handleClick = (variant, label) => {
        handleToggle(variant);
        addEventToDataLayer({
            event: 'e_linkclick',
            action: 'escuchar',
            category: 'nota_ln9',
            label: { label }
        });
    };

    return (
        <div className="flex ai-center hlp-margintop-20 hlp-margintop-desksm-16 toggle-bttn-audio">
            <Button
                id="notaCompleta"
                variant={contentVariant === 'article' ? 'primary' : 'secondary'}
                className={notaCompletaBttn}
                title="Nota Completa"
                dataSection="Nota Completa"
                dataEvent="LinkClick"
                onClick={() => {
                    handleClick('article', 'escuchar_completo');
                }}
            >
                <Icon size={24} color="inherit">
                    <IconSprite name="article" />
                </Icon>
                <Text>nota completa</Text>
            </Button>
            <Button
                id="resumenConIA"
                variant={contentVariant === 'summary' ? 'primary' : 'secondary'}
                className={resumenConIABttn}
                title="Resumen con IA"
                dataSection="Resumen con IA"
                dataEvent="LinkClick"
                onClick={() => {
                    handleClick('summary', 'escuchar_resumen');
                }}
            >
                <Icon size={16} color="inherit">
                    <IconSprite name="summary" />
                </Icon>
                <Text>resumen con ia</Text>
            </Button>
        </div>
    );
};

ToggleButton.propTypes = {
    contentVariant: PropTypes.string.isRequired,
    handleToggle: PropTypes.func.isRequired
};

export default ToggleButton;
