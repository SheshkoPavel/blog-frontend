import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {SubmitHandler, useForm} from "react-hook-form";
import {editPostThunk} from "../../store/action-creators/postsAC";

type Inputs = {
    newPostTitle: string;
    newPostContent: string;
    updateId: number;
};

const EditPostForm = (props : any) => {

    const {isAuth} = useAppSelector(state => state.auth)

    const dispatch = useAppDispatch()

    const [send, setSend] = useState(false)

    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>()
    //При нажатии на кнопку отправить формируется объект data с зарегистрированными полями ()
    const onSubmit: SubmitHandler<Inputs> = data => {
        dispatch(editPostThunk(data.updateId, data.newPostTitle, data.newPostContent));
        props.setState(false)
        setSend(true)

    }


    if (!isAuth) return <div>Нет прав доступа</div>

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className={'form__layout'}>
                <div>Напишите статью:</div>

                <input className={'input__area'}
                       placeholder='Заголовок'
                       defaultValue={props.post.post.title}
                       {...register('newPostTitle', {required: true})}  />
                <div className={'error__form__validation'}>
                    {errors.newPostTitle && "Введите Заголовок статьи!"}
                </div>

                <textarea  className={'text__area'}
                           placeholder="Текст статьи"
                           defaultValue={props.post.post.content}
                           {...register("newPostContent", {required: true})} />
                <div className={'error__form__validation'}>
                    {errors.newPostContent && "Введите текст статьи!"}
                </div>

                <input style={{display: "none"}}
                       value={props.post.post.id}
                       {...register('updateId', {required: true})}  />

                <br/>
                <input  type="submit"  className={'send__btn'} />

            </form>
        </div>

    );
};

export default EditPostForm;