import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {registerUserThunk} from "../../store/reducers/authReducer";
import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

type Inputs = {
    email: string;
    password: string;
    name: string;
    avatar: any
};

const RegisterPage = () => {

    const {user, isAuth, message} = useAppSelector(state => state.auth)

    const navigate = useNavigate();
    useEffect(()=> {
        if (isAuth) {
            navigate('/posts');
        }
    }, [isAuth])

    const dispatch = useAppDispatch()
    const regUser = (data: Inputs) => {
        dispatch(registerUserThunk(data.email, data.password, data.name, data.avatar[0]));
    }


    //Настройка формы
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>()
    //При нажатии на кнопку отправить формируется объект data с зарегистрированными полями ()
    const onSubmit: SubmitHandler<Inputs> = data => regUser(data);


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className={'form__layout'}>
                <div>Регистрация пользователя:</div>
                <input className={'input__area'}
                       placeholder='email'
                       {...register('email', {required: true})}  />
                <div className={'error__form__validation'}>
                    {errors.email && "Введите email!"}
                </div>
                <input  type='password'
                        className={'input__area'}
                       placeholder="Пароль"
                       {...register("password", {required: true})} />
                <div className={'error__form__validation'}>
                    {errors.password && "Введите пароль!"}
                </div>
                <input className={'input__area'}
                       placeholder='name'
                       {...register('name', {required: true})}  />
                <div className={'error__form__validation'}>
                    {errors.email && "Введите имя пользователя!"}
                </div>
                <input  type="file"
                       {...register('avatar', {required: true})}  />

                 <br/>
                <input  type="submit"  className={'send__btn'} />
            </form>
        </div>
    );
};

export default RegisterPage;