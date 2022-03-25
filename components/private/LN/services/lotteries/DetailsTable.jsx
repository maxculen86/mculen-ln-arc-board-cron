import { React } from 'react';
import PropTypes from 'prop-types';
import '../../../../../resources/dist/css/ln/components/details-table.css';

const DetailsTable = ({ data }) => {
    const {
        winners_table: winnersTable,
        name,
        estimated_pot: estimatedPot,
        winner_carton: winnerCarton
    } = data;
    const winnerCartonAmount = winnerCarton
        ? winnerCarton.find(carton => carton.amount)
        : false;
    return (
        <section className="table-container">
            {winnersTable && (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Aciertos</th>
                            <th>Ganadores</th>
                            <th>Premios</th>
                        </tr>
                    </thead>
                    <tbody>
                        {winnersTable.map(x => {
                            return (
                                <tr>
                                    <td>{x.name ? x.name : '-'}</td>
                                    <td>{x.winners ? x.winners : 'VACANTE'}</td>
                                    <td>{x.amount ? x.amount : '-'}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
            {name && estimatedPot && (
                <table className="table">
                    <thead>
                        <tr>
                            <th>
                                Próximo pozo de
                                {name}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="estimated-pot">{estimatedPot}</td>
                        </tr>
                    </tbody>
                </table>
            )}
            {winnerCarton && (
                <table className="table">
                    <thead>
                        <tr>
                            <th colSpan={winnerCarton.length}>
                                Cartones Ganadores
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {winnerCarton.map(carton => {
                                return (
                                    <td className="border-divider">
                                        {carton.numbers}
                                    </td>
                                );
                            })}
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={winnerCarton.length}>
                                {`${winnerCartonAmount.amount} C/U`}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            )}
        </section>
    );
};

DetailsTable.propTypes = {
    data: PropTypes.objectOf
};
DetailsTable.defaultProps = {
    data: {}
};

export default DetailsTable;
