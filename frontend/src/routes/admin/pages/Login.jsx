import React, {useState} from 'react';
import {sha512} from 'js-sha512';

import {isLoggedIn} from '../queries/get';
import '../styles/Login.css';

import Background from '../components/Background';

import {loginBottomCoins, loginLights, loginTopCoins, personIcon, passwordIcon} from '../assets';

const cookies = window.localStorage;

const Page = ({setCurrentPage, setCredentials}) => {

    const [input, setInput] = useState({email: '', password: ''});
    const [showPwd, setShowPwd] = useState(false);

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
                    <label htmlFor='email'>Email</label>
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
                    <label htmlFor='password'>Senha</label>
                    <div className='field'>
                        <input 
                            type={showPwd ? 'text' : 'password'} id='password' name='password' placeholder='Senha'
                            value={input.password}
                            onChange={e => setInput({...input, password: e.target.value})}
                            required
                        />
                        <img className='inputIcon' src={passwordIcon} alt='Ícone de senha'
                            onClick={() => setShowPwd(!showPwd)}
                        />
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
                            onClick={async (e) => {
                                e.preventDefault();
                                const pwdHash = sha512(input.password)
                                const res = await isLoggedIn({
                                    email: input.email,
                                    pwdHash
                                });

                                if(res) {
                                    if(input.remember){
                                        cookies.setItem('email',input.email);
                                        cookies.setItem('pwdHash',pwdHash);
                                    }
                                    setCredentials({email: input.email, pwdHash});
                                    setCurrentPage('home');
                                }else {
                                    alert("Não autorizado: Credenciais inválidas");
                                }
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

export default Page;