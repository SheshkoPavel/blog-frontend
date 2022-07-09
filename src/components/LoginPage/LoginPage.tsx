import React, {useEffect} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {loginUserThunk} from "../../store/reducers/authReducer";
import './LoginPage.scss'
import {useNavigate} from "react-router-dom";


type Inputs = {
    email: string,
    password: string
};

const LoginPage = () => {

    const {user, isAuth, message} = useAppSelector(state => state.auth)

    const dispatch = useAppDispatch()
    const login = (data: Inputs) => {
        dispatch(loginUserThunk(data.email, data.password))
    }

    const navigate = useNavigate();
    useEffect(()=> {
        if (isAuth) {
            navigate('/posts');
        }
    }, [isAuth])

    //Настройка формы
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>()
    //При нажатии на кнопку отправить формируется объект data с зарегистрированными полями ()
    const onSubmit: SubmitHandler<Inputs> = data => login(data);

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className={'form__layout'}>
                <div>Login</div>
                <input className={'input__area'}
                       placeholder='email'
                       autoComplete='on'
                       {...register('email', {required: true})}  />
                <div className={'error__form__validation'}>
                    {errors.email && "Введите email!"}
                </div>
                <input className={'input__area'}
                       type='password'
                       autoComplete='on'
                       placeholder="Пароль"
                       {...register("password", {required: true})} />
                <div className={'error__form__validation'}>
                    {errors.password && "Введите пароль!"}
                </div>

                <input type="submit" className={'send__btn'} />
            </form>
        </div>
    );
};

export default LoginPage;