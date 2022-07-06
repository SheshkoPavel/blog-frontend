import React from 'react';
import {useAppSelector} from "../../hooks";

const Users: React.FC = () => {
    const {users, error, isLoading} = useAppSelector(state => state.users)
    console.log(users)

    return (
        <div>
            Тут список зареганых пользователей
        </div>
    );
};

export default Users;