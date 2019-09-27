import React from 'react';
import PropTypes from 'fusion:prop-types';
import '../../../resources/dist/css/ln/components/ordered.css';
import '../../../resources/dist/css/ln/components/unordered.css';
import '../../../resources/dist/css/ln/components/title.css';

const TypeList = ({ ol, children }) =>
    ol ? (
        <ol className="com-ordered">{children}</ol>
    ) : (
        <ul className="com-unordered">{children}</ul>
    );

//TODO: falta html
//TODO: pasar a carpeta Cuerpo, crear containers de Ingredientes y Preparacion y sacar
//esa logica de aperturaReceta.jsx
// Se tuvo que agregar un decodeURIComponent en cada item del Ingredientes y preparacion de los PowerUps
const ListItemsFactory = ({ list, titleList, listNumeric }) => {
    return (
        <div>
            <h4 className="com-title-section-xs">{titleList}</h4>
            <TypeList ol={listNumeric}>
                {list.map((item, key) => (
                    <li key={key} className="com-item">
                        {decodeURIComponent(item)}
                    </li>
                ))}
            </TypeList>
        </div>
    );
};

TypeList.propTypes = {
    ol: PropTypes.bool,
    children: PropTypes.node.isRequired
};

TypeList.defaultProps = {
    ol: false
};

ListItemsFactory.propTypes = {
    list: PropTypes.arrayOf(PropTypes.string).isRequired,
    titleList: PropTypes.string.isRequired,
    listNumeric: PropTypes.bool
};

ListItemsFactory.defaultProps = {
    listNumeric: false
};

export default ListItemsFactory;
