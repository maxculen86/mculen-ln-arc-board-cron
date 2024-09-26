import PropTypes from 'fusion:prop-types';
import { Button } from '@ln/contenidos-ui-button';
import { Text } from '@ln/contenidos-ui-text';
import { Icon } from '@ln/common-ui-icon';
import IconSprite from '../../../features/private-global/common/iconSprite/IconSprite';
import { addEventToDataLayerV2 } from '../../LN/common/utils/addEventToDataLayer';
import classNames from 'classnames';

const ToggleButton = ({ contentVariant, handleToggle }) => {
    const notaCompletaBttn = classNames(
        'audio-toggle-left border-neutral-light-200 rounded-top-left-4 rounded-bottom-left-4 rounded-top-right-0 rounded-bottom-right-0'
    );
    const resumenConIABttn = classNames(
        'audio-toggle-right border-neutral-light-200 rounded-top-right-4 rounded-bottom-right-4 rounded-top-left-0 rounded-bottom-left-0'
    );

    const handleClick = (variant, label) => {
        handleToggle(variant);
        addEventToDataLayerV2({
            event: 'e_linkclick',
            action: 'escuchar',
            category: 'nota_ln9',
            label: label
        });
    };

    return (
        <div className="toggle-bttn-audio flex ai-center mt-20 mt-0_l mb-16_l ai-start_l">
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
                <Icon
                    size={24}
                    color="inherit"
                    className="transition transition-none"
                >
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
                <Icon
                    size={16}
                    color="inherit"
                    className="transition transition-none"
                >
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
