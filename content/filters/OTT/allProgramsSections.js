// TODO: limpieza OTT - Borrar en iteración 3 de 5 (antes, validar que no se use en ningún otro lado)
export default `
{
    q_results {
        _id
        site {
            site_url
        }
        OTT_Program {
            small_image_program_id
        }
        _website
        name
        parent {
            ActivePrograms
        }
    }
}
`;
