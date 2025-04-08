import React from 'react';
import { Select } from '@ln/common-ui-select';
import PropTypes from 'prop-types';
import { Itemcard } from '@ln/foodit-ui-itemcard';

/* function ItemCard(props) {
    return <Itemcard type="button" {...props} />;
} */

export function SelectMenu({ setSelectedDay, setSelectedFood }) {
    const list = [
        { id: 'monday', text: 'Lunes' },
        { id: 'tuesday', text: 'Martes' },
        { id: 'wednesday', text: 'Miércoles' },
        { id: 'thursday', text: 'Jueves' },
        { id: 'friday', text: 'Viernes' },
        { id: 'saturday', text: 'Sábado' },
        { id: 'sunday', text: 'Domingo' }
    ];
    const food = [
        { id: 'breakfast', text: 'Desayuno' },
        { id: 'lunch', text: 'Almuerzo' },
        { id: 'dinner', text: 'Cena' }
    ];

    return (
        <div className="flex flex-column gap-24">
            <Select
                label="Seleccionar día"
                className="roboto roboto-regular text-12"
                openClassName="border-secondary-positive"
                hoverClassName="border-accent-lechuga__hover"
                listClassName="p-16 roboto roboto-semibold shadow-modal bg-white border border-all border-thin border-light-100 rounded-8"
                floatingLabelProps={{
                    className: 'bg-white'
                }}
                onChange={e => setSelectedDay(e?.value)}
            >
                <div className="max-h-198 foodit-scrollbar overflow-y-auto">
                    {list.map(({ text, id }) => (
                        <Select.Options
                            key={id}
                            value={id}
                            label={text}
                            // eslint-disable-next-line react/no-unstable-nested-components
                            as={props => (
                                <Itemcard
                                    type="button"
                                    disabled={id === 'wednesday'}
                                    className={
                                        id === 'wednesday'
                                            ? 'opacity-40 text-inherit_hover'
                                            : ''
                                    }
                                    {...props}
                                />
                            )}
                        />
                    ))}
                </div>
            </Select>
            <Select
                label="Seleccionar comida"
                className="roboto roboto-regular text-12"
                openClassName="border-secondary-positive"
                hoverClassName="border-accent-lechuga__hover"
                listClassName="p-16 roboto roboto-semibold shadow-modal bg-white border border-all border-thin border-light-100 rounded-8"
                floatingLabelProps={{
                    className: 'bg-white'
                }}
                onChange={e => setSelectedFood(e?.value)}
            >
                {food.map(({ text, id }) => (
                    <Select.Options
                        key={id}
                        className="text-12"
                        value={id}
                        label={text}
                        // eslint-disable-next-line react/no-unstable-nested-components
                        as={props => (
                            <Itemcard
                                type="button"
                                disabled={id === 'wednesday'}
                                className={
                                    id === 'wednesday'
                                        ? 'opacity-40 text-inherit_hover'
                                        : ''
                                }
                                {...props}
                            />
                        )}
                    />
                ))}
            </Select>
        </div>
    );
}

SelectMenu.propTypes = {
    setSelectedDay: PropTypes.func.isRequired,
    setSelectedFood: PropTypes.func.isRequired
};
