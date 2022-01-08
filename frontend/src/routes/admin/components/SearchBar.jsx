import { searchIcon } from "../assets";

export default ({value, onChange}) => {
    return (
        <div className='relative'>
            <input 
                type='text' id='filter' name='filter' placeholder='Pesquise aqui'
                value={value}
                onChange={onChange}
                maxLength={255}
                required
            />
            <img className='inputIcon' src={searchIcon} alt='Ícone de lupa'/>
        </div>
    );
}