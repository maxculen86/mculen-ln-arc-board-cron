import { Icon } from '@ln/common-ui-icon';
import { Button } from '@ln/foodit-ui-button';
import { Dropdown } from '@ln/common-ui-dropdown';
import { Itemcard } from '@ln/foodit-ui-itemcard';
import IconSprite from '../../../../private-global/common/iconSprite/IconSprite';
import { recipeOptionsConfig } from '../helpers/recipeOptionsConfig';

export const RecipeOptions = ({ recipeName }) => {
    const handleClick = e => {
        e.preventDefault();
        e.stopPropagation();
    };
    return (
        <Dropdown hideArrow className="ml-auto ml-0_md" onClick={handleClick}>
            <Dropdown.Toggle
                className="text-light-800 text-accent-lechuga__hover"
                as={props => (
                    <Button
                        variant="secondary"
                        size={{ sm: 32, md: 40 }}
                        title="ver opciones"
                        iconOnly
                        {...props}
                    />
                )}
            >
                <Icon size={16}>
                    <IconSprite className="sm-none" name="more-horizontal" />
                    <IconSprite className="sm-only" name="more-vertical" />
                </Icon>
            </Dropdown.Toggle>
            <Dropdown.Menu
                alignment="right"
                className="bg-light-1 p-24 rounded-4 shadow-center"
            >
                <ul className="w-202">
                    {recipeOptionsConfig.map(
                        ({ icon, onClick, ...item }, i) => (
                            <Itemcard
                                key={i}
                                icon={<IconSprite name={icon} />}
                                onClick={() => onClick(recipeName)}
                                {...item}
                            />
                        )
                    )}
                </ul>
            </Dropdown.Menu>
        </Dropdown>
    );
};
