import React from 'react'
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const { msgError } = useSelector( state => state.ui );

    console.log(msgError);

    const [values, handleInputChange] = useForm({
        name: 'Josema Ganchozo Moreira',
        email: 'jganchozo@outlook.com',
        password: '123456',
        passwordconfirm: '123456'
    });

    const { name, email, password, passwordconfirm } = values;

    const handleRegister = (e) => {
        e.preventDefault();

        if (isFormValid()) {
            dispatch(startRegisterWithEmailPasswordName(email, password, name));
        }
    }

    const isFormValid = () => {

        if (name.trim().length === 0) {
            dispatch( setError('Name is required') );
            return false;
        } else if (!validator.isEmail(email)) {
            dispatch( setError('Email is not valid') );
            return false;
        } else if ( password !== passwordconfirm || password.length < 5 ) {
            dispatch( setError('Password should be at least 6 characteres and match each other') );
            return false;
        }

        dispatch( removeError() );
        return true;
    }

    return (
        <>
            <h3 className='auth__title'>Register</h3>
            <form onSubmit={handleRegister}>

                {msgError && < div className="auth__alert-error">
                    {msgError}
                </div>
                }

                <input
                    type='text'
                    placeholder='Name'
                    name='name'
                    className='auth__input'
                    autoComplete='off'
                    value={name}
                    onChange={handleInputChange}
                />
                <input
                    type='text'
                    placeholder='Email'
                    name='email'
                    className='auth__input'
                    autoComplete='off'
                    value={email}
                    onChange={handleInputChange}
                />
                <input
                    type='password'
                    placeholder='Password'
                    name='password'
                    className='auth__input'
                    value={password}
                    onChange={handleInputChange}
                />
                <input
                    type='password'
                    placeholder='Confirm password'
                    name='passwordconfirm'
                    className='auth__input'
                    value={passwordconfirm}
                    onChange={handleInputChange}
                />
                <button type='submit' className='btn btn-primary btn-block mb-5'>
                    Register
                </button>

                <Link 
                    to={'/auth/login'} 
                    className='link mt-5'
                >
                    Already registered?
                </Link>
            </form>
        </>
    )
}