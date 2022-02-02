// API doc: https://servicodados.ibge.gov.br/api/docs

const getStates = async() => {
    const states = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados',{
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    const json = await states.json();
    return json.map(state => {return(
        {
            id: state.id,
            sigla: state.sigla,
            nome: state.nome
        }
    )})
}

const getCitiesByState = async(states) => {
    const query = states.reduce((acc, cur) => `${acc}%7C${cur.id}`, ''); // pipe character
    const cities = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${query}/municipios`,{
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    const json = await cities.json();
    return json.map(city => {
        const state = city.microrregiao.mesorregiao.UF;
        return({
            id: city.id,
            nome: city.nome,
            UF: {
                id: state.id,
                sigla: state.sigla,
                nome: state.nome
            }
        });
    })
}

export {getStates, getCitiesByState};