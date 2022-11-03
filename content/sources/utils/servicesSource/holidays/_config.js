const monthsDescriptions = {
    '2021':
        'Todos los días no laborables de 2021, asuetos, cuáles son feriados inamovibles y por qué no se trabaja esos días, cuáles podrían cambiar de día, ' +
        'los días feriados puente y por qué son feriados para el 2021. Cuándo es fin de semana largo en 2021. Calendario completo con todas las fechas patrias de la Argentina.',
    '2022': {
        enero:
            'Enero solo tiene un feriado: el Año Nuevo se festeja en su primer día, y es la única jornada de asueto generalizado en el primer mes del año. Enero no ' +
            'tiene días de descanso adicionales, aunque por lo general es un período sin obligaciones para los más chicos al coincidir con las vacaciones de verano escolares.',
        febrero:
            'El segundo mes del año tiene un sólo feriado que coincide con su último día: el lunes 28 hay asueto por ley debido a que se festeja la primera ' +
            'jornada del carnaval; además, durante febrero continúan las vacaciones de verano en los colegios de todo el país.',
        marzo:
            'Marzo tiene dos feriados: su primer día prolonga el festejo del carnaval, y algunas semanas después, ' +
            'el jueves 24, es el Día de la Memoria por la Verdad y la Justicia.',
        abril:
            'Abril tiene dos feriados: el sábado 2 se festeja un nuevo Día del Veterano y de los Caídos en la Guerra de Malvinas, mientras que el 15 es feriado por tratarse ' +
            'de viernes santo. Este día de asueto forma parte de la Semana Santa, que también cuenta al jueves 14 (jueves santo) como día no laborable.',
        mayo:
            'Mayo tiene dos feriados: su primer día está asegurado para el descanso por ley por tratarse del Día Internacional del Trabajador. Más tarde, ' +
            'el miércoles 25, se conmemora un nuevo aniversario de la Revolución de Mayo con un día de asueto generalizado que es un feriado inamovible de nuestro calendario.',
        junio:
            'Junio tiene dos feriados relacionados con figuras de la historia argentina: el 17 es el Paso a la Inmortalidad de Martín Miguel de Güemes, ' +
            'un día de asueto trasladable, mientras que el 20 es la celebración del Día de la Bandera que conmemora a su creador, Manuel Belgrano, con un feriado inamovible.',
        julio:
            'Julio tiene un feriado inamovible: el 9 se festeja el Día de la Independencia en conmemoración al acta firmada en 1816  por el Congreso de ' +
            'Tucumán para la separación formal de España. Además, las jurisdicciones nacionales suelen realizar las vacaciones de invierno escolares en dos semanas de este mes.',
        agosto:
            'Agosto tiene un feriado: el 17 es el día del Paso a la Inmortalidad del General San Martín, una fecha de asueto que no siempre coincide con el día histórico ' +
            'de la muerte del prócer por ser un feriado trasladable, lo que lleva a que se lo pase a lunes o viernes para generar un fin de semana largo.',
        septiembre:
            'Septiembre no tiene feriados, pero sí suma dos días no laborables para la comunidad judía: entre las tardes del 26 y el 27 es Rosh Hashaná, el Año Nuevo Judío, ' +
            'por lo que las personas de esta confesión pueden no tener que trabajar en estas fechas como indica la ley.',
        octubre:
            'Octubre tiene dos feriados nacionales: el viernes 7 será puente turístico y extenderá el descanso hasta el 10, gracias al festejo del Día del Respeto a la ' +
            'Diversidad Cultural. Días no laborables: el miércoles 5 será Día No laborable para la comunidad judía por ser Yom Kipur o Día del Perdón.',
        noviembre:
            'Noviembre tiene dos feriados nacionales: el domingo 20 el Día de la Soberanía Nacional, feriado inamovible del calendario nacional, en conmemoración a la Batalla ' +
            'de la Vuelta de Obligado un día como ese de 1845; y al día siguiente, lunes 21, también se descansa porque se lo estableció como un puente turístico.',
        diciembre:
            'Diciembre tiene tres feriados nacionales: la fiesta de la Inmaculada Concepción de María es el jueves 8, y el descanso se extiende al viernes 9 con un feriado ' +
            'puente turístico que genera un fin de semana extra largo. Más tarde, el 25 de diciembre, hay asueto por ser Navidad, último feriado del año.'
    },
    '2023': {
        enero:
            'Enero solo tiene un feriado: el Año Nuevo se festeja en su primer día, y es la única jornada de asueto generalizado en el primer mes del año. ' +
            'Enero no tiene días no laborables, aunque por lo general es un período de descanso para los más chicos al coincidir con las vacaciones de verano escolares.',
        febrero:
            'Febrero tiene dos días feriados que conforman un fin de semana largo: el lunes 20 y el martes 21 se celebra el Carnaval. Ambas jornadas extienden el descanso ' +
            'del sábado y el domingo. Asimismo, este mes se retorna a las aulas, pero el calendario escolar depende de cada jurisdicción.',
        marzo:
            'Marzo tiene un solo feriado: el Día Nacional de la Memoria por la Verdad y la Justicia que se definió de manera inamovible el 24, en conmemoración a cada ' +
            'aniversario del golpe de estado de 1976. El tercer mes del año no tiene otros asuetos o fechas de descanso por fuera de los fines de semana.',
        abril:
            'Abril tiene dos feriados: el domingo 2 hay asueto por ser el Día de los Veteranos y Caídos en las Islas Malvinas, mientras que el 7 es Viernes Santo, ' +
            'parte de la Semana Santa que comenzará el jueves 6 -día no laborable y sin clases- y concluirá el domingo 9 con la celebración católica de la Pascua.',
        mayo:
            'Mayo tiene dos feriados: el lunes 1, primer día del mes, se celebra el Día Internacional de los Trabajadores con una jornada de asueto generalizado en la ' +
            'Argentina y en buena parte del mundo. El jueves 25, en el país se conmemora un nuevo aniversario histórico, el de la Revolución de Mayo, con otro feriado inamovible',
        junio:
            'Junio tiene dos feriados: el sábado 17 será el Paso a la Inmortalidad de Martín Miguel de Güemes, feriado trasladable, y el martes 20 del mes se celebra el ' +
            'Paso a la Inmortalidad del General Manuel Belgrano, una jornada de asueto inamovible, que es el único descanso agendado en un día laborable de este mes.',
        julio:
            'Julio tiene solo un feriado: el domingo 9 es el festejo inamovible de la Independencia nacional, que caerá en fin de semana. El mes también ofrece ' +
            'tradicionalmente las vacaciones de invierno, que suelen ocupar las dos últimas semanas aunque su fecha exacta depende de lo dispuesto por cada jurisdicción.',
        agosto:
            'Agosto tiene un solo feriado: el Pase a la Inmortalidad de don José de San Martín, feriado trasladable que recuerda la fecha del fallecimiento del Libertador. ' +
            'Según el calendario histórico cae el 17 del mes, pero se pasa al lunes 21 para formar un fin de semana largo que comenzará el sábado 19 y será el único descanso ' +
            'extendido de este mes.',
        septiembre:
            'El mes de septiembre no tiene feriados nacionales, pero sí dos días no laborables para la comunidad judía: el viernes 15 comienza el Año Nuevo Judio o Rosh ' +
            'Hashaná, que se extenderá hasta el domingo 17. Además, el 25 será el Día del Perdón, otro día de descanso para las personas de esta confesión.',
        octubre:
            'Octubre tiene un solo feriado: el Día del Respeto a la Diversidad Cultural, antes Día de la Raza, que se trasladó de su fecha original del 12 de octubre al lunes ' +
            '16 para formar un fin de semana largo alrededor del sábado 14 y domingo 15.',
        noviembre:
            'Noviembre tiene un solo feriado: el día de asueto por el Día de la Soberanía Nacional, feriado trasladable, coincidirá con su fecha original el lunes 20,' +
            'formando un fin de semana largo que comenzará el sábado 18 y será el único descanso extendido del anteúltimo mes del año.',
        diciembre:
            'Diciembre tiene dos feriados nacionales: el viernes 8 es el feriado inamovible de la Inmaculada Concepción de María, que formará un fin de semana largo hasta el ' +
            'domingo 10. Otro fin de semana largo comenzará el sábado 23 hasta el lunes 25, asueto generalizado por tratarse de la fiesta de la Navidad.'
    }
};

export default monthsDescriptions;
