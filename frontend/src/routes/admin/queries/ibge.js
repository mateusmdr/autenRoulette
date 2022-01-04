// API doc: https://servicodados.ibge.gov.br/api/docs

const getStates = async() => {
    const states = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados',{
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    return states.json();
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
    return cities.json();
}

export {getStates, getCitiesByState};