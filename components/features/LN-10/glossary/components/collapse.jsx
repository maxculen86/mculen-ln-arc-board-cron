import { Collapse as CollapseLib } from '@ln/common-ui-collapse';
import { useDisclosure } from '@ln/hooks';
import { Text } from '@ln/contenidos-ui-text';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';
import capitalizeFirstLetter from '../../../../private/common/utils/capitalizeFirstLetter';
import { handleToggleCollapse } from '../helpers';
import classNames from 'classnames';
import { Disclaimer } from './disclaimer';

export const Collapse = ({ glossaryData = [] }) => {
    const { isOpen, onToggle } = useDisclosure(true);
    const toggleText = isOpen ? 'Ver más' : 'Ver menos';

    return (
        <CollapseLib
            onClick={() => handleToggleCollapse(onToggle, isOpen)}
            className="flex flex-column gap-16 border border-thin border-primary-ia border-left-solid_min512 pl-20_min512 cursor-pointer mb-24"
            title={toggleText}
            data-testid="collapse-glossary"
        >
            <CollapseLib.Header className="flex ai-center gap-6 h-24">
                <IconSprite name="summary" color />
                <Text
                    as="h2"
                    className="glossary-title --font-primary --font-bold --font-l text-neutral-light-800"
                    text="Glosario"
                />
            </CollapseLib.Header>
            <CollapseLib.Body collapsed={isOpen}>
                <ul className="flex flex-column gap-12">
                    {glossaryData.map(({ key, value }, i) => {
                        return (
                            <li
                                key={key}
                                className={classNames(
                                    i > 0 &&
                                        'border border-neutral-light-100 border-thin border-top pt-12'
                                )}
                            >
                                <Text
                                    as="h3"
                                    className="glossary-title --font-primary --font-extra --font-m"
                                >
                                    {capitalizeFirstLetter(key)}
                                </Text>
                                <Text
                                    as="p"
                                    className="text-16 text-neutral-light-800"
                                >
                                    {value}
                                </Text>
                            </li>
                        );
                    })}
                </ul>
                <Disclaimer />
            </CollapseLib.Body>
            <CollapseLib.Footer className="flex gap-4 ai-center">
                <Text
                    text={toggleText}
                    className="--font-regular --font-xs text-neutral-light-800"
                />
                <IconSprite
                    name="arrowDown"
                    width={16}
                    height={16}
                    className={classNames({ 'rotate-180': !isOpen })}
                />
            </CollapseLib.Footer>
        </CollapseLib>
    );
};
