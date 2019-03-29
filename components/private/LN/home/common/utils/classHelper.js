export const getClassesArticle = props =>{
    debugger;
    let classes = ''
    //Obtener posicion
    const pos = ('0' + props.position).slice(-2)
    classes += `art-${pos} ${props.size} `

    //Clase marquesina
    if(props.marquee){
        classes += 'firma-autor '
    }

    //Clase exclusivo
    if(props.isExclusive){
        classes += 'exclusivo '
    }

    //Clase bajada
    if(props.subheader){
        classes += 'bajada '
    }

    //Clase volanta
    if(props.teaser){
        classes += 'teaser '
    }

    //Clase chapita
    classes += getClassesChapita(props.articleMark)

    return classes

}

const getClassesChapita = chapita => {
    let classes = ''
    if(chapita != '<Ninguna>'){
        classes += 'chapita '

        if(chapita === ''){

        }else if(chapita === 'Video'){
            classes += 'ch-video '
        }else if(chapita === 'Infografía'){
            classes += 'ch-infografia '
        }else if(chapita === 'Galeria'){
            classes += 'ch-galeria '
        }else if(chapita === 'Podcast'){
            classes += 'ch-podcast '
        }else if(chapita === 'Audio'){
            classes += 'ch-audio '
        }
        
    }
    return classes;
}
