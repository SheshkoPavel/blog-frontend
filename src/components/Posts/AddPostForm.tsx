import React from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {SubmitHandler, useForm} from "react-hook-form";
import './AddPostForm.scss'
import {fetchPosts, sendPost} from "../../store/action-creators/postsAC";
import {Navigate, useNavigate} from "react-router-dom";

type Inputs = {
    title: string;
    content: string;
    status: string;
    userId: number;
    image: any;
};

const AddPostForm = () => {


    const {user, isAuth, message} = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()

    const navigate = useNavigate();
    const addPost = (data: Inputs) => {
        dispatch(sendPost(data.title, data.content, data.status, data.userId, data.image[0]));
        dispatch(fetchPosts());
        navigate('/posts')
    }

    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>()
    //При нажатии на кнопку отправить формируется объект data с зарегистрированными полями ()
    const onSubmit: SubmitHandler<Inputs> = data => addPost(data);

    if (!isAuth) return <div>Нет прав доступа</div>

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className={'form__layout'}>
                <div>Напишите статью:</div>

                <input className={'input__area'}
                       placeholder='Заголовок'
                       {...register('title', {required: true, maxLength: 250})}  />
                <div className={'error__form__validation'}>
                    {errors.title && "Введите Заголовок статьи! Максимальная длина 250 символов"}
                </div>

                <textarea  className={'text__area'}
                        placeholder="Текст статьи"
                        {...register("content", {required: true})} />
                <div className={'error__form__validation'}>
                    {errors.content && "Введите текст статьи!"}
                </div>

                <input style={{display: "none"}}
                       value={'PUBLISHED'}
                       placeholder='status'
                       {...register('status', {required: true})}  />

                <input style={{display: "none"}}
                       value={user?.id}
                       {...register('userId', {required: true})}  />

                <span>Изображение к статье, в формате .jpg</span>
                <input  type="file"
                        className={'input__file'}
                        {...register('image', {required: true})}  />

                <br/>
                <input  type="submit"  className={'send__btn'} />
            </form>
        </div>
    );
};

export default AddPostForm;