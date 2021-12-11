import React, {useState, useEffect} from 'react';

import Background from '../components/Background';

import {loginBottomCoins, loginLights, loginTopCoins, personIcon, passwordIcon} from '../assets';

const Login = ({setCurrentPage, setLogin}) => {
    useEffect(() => import('../styles/Login.css'));

    const [input, setInput] = useState({email: '', password: ''});

    return (
        <Background id='login'>
            <main>
                <img src={loginTopCoins} alt='Moedas douradas' className='topRightCoins'/>
                <form>
                    <div className='horizontalAlign'>
                        <hgroup>
                            <h1 id='title'>TENTA A SORTE</h1>
                            <div>
                                <h3>Portal Administrativo</h3>
                            </div>
                        </hgroup>
                    </div>
                    <label htmlFor='name'>Login</label>
                    <div className='field'>
                        <input 
                            type='email' id='email' name='email' placeholder='E-mail'
                            value={input.email}
                            onChange={e => setInput({...input, email: e.target.value})}
                            maxLength={255}
                            required
                        />
                        <img className='inputIcon' src={personIcon} alt='Ícone de usuário'/>
                    </div>
                    <label htmlFor='password'>Telefone</label>
                    <div className='field'>
                        <input 
                            type='password' id='password' name='password' placeholder='Senha'
                            value={input.password}
                            onChange={e => setInput({...input, password: e.target.value})}
                            required
                        />
                        <img className='inputIcon' src={passwordIcon} alt='Ícone de senha'/>
                    </div>
                    <div className='field verticalAlign checkbox'>
                        <input 
                            type='checkbox' id='remember' name='remember' 
                            value={input.remember}
                            onClick={() => setInput({...input, remember: !input.remember})}
                        />
                        <label htmlFor='remember' className='checkboxLabel'>Lembrar de mim</label>
                    </div>
                    <div className='row'>
                        <input 
                            type='submit' value='Entrar'
                            onClick={() => {
                                setLogin(input);
                                setCurrentPage('home');
                            }}
                        />
                    </div>
                </form>
                <img src={loginBottomCoins} alt='Moedas douradas' className='bottomLeftCoins'/>
            </main>
            <img src={loginLights} alt='Arco de luzes brancas' className='bottomRightImg'/>
        </Background>
    );
}

export default Login;