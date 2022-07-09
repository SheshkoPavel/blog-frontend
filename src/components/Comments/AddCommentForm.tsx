import React from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import './AddCommentForm.scss'
import {useAppDispatch, useAppSelector} from "../../hooks";
import {addCommentToPostThunk} from "../../store/reducers/commentsReducer";

type Inputs = {
    author: string,
    text: string,
    postId: number
};

const AddCommentForm = (props: any) => {

    const {isAuth, user} = useAppSelector(state => state.auth)

    const dispatch = useAppDispatch()
    const addComment = (data: Inputs) => {
        dispatch(addCommentToPostThunk(data))
    }

    //Настройка формы
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>()
    //При нажатии на кнопку отправить формируется объект data с зарегистрированными полями ()
    const onSubmit: SubmitHandler<Inputs> = data => addComment(data);


    return (
        <div>

            <form onSubmit={handleSubmit(onSubmit)} className={'form__layout'}>
                <div>Добавить комментарий к статье</div>

                {isAuth && user?.name
                    ? <div>
                        <input className={'input__area'}
                               defaultValue={user?.name}
                               type='hidden'
                               {...register('author', {required: true})}  />
                    </div>
                    : <div>
                        <input className={'input__area'}
                               placeholder='Напишите своё имя'
                               {...register('author', {required: true, maxLength: 40})}  />
                        <div className={'error__form__validation'}>
                            {errors.author && "Напишите имя! Максимум 40 символов"}
                        </div>
                    </div>
                }

                <textarea className={'text__area'}
                          placeholder="Напишите текст комментария"
                          {...register("text", {required: true})} />
                    <div className={'error__form__validation'}>
                        {errors.text && "Напишите комментарий!"}
                    </div>
                <input type="text" value={props.postId} style={{display: "none"}}
                       {...register("postId", {required: true})} />
                <input type="submit" className={'send__btn'} />
            </form>
        </div>
    );
};

export default AddCommentForm;