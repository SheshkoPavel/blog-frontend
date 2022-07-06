import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {fetchUsers} from "../../store/action-creators/usersAC";

const Users: React.FC = () => {
    const {users, error, isLoading} = useAppSelector(state => state.users)

    const dispatch = useAppDispatch()

    useEffect(()=> {
        dispatch(fetchUsers())
    }, [])

    if (isLoading) {
        return <h1>...loading of users</h1>
    }
    if (error) {
        return <h1>{error}</h1>
    }

    console.log(users)

    return (
        <div>
            <div style={{marginBottom: 10, fontWeight: "bold"}}>Тут список зареганых пользователей:</div>
            {
                users.map((u) => <div key={u.id}>
                    {u.name} <img src={`http://localhost:5000/avatars/${u.avatar}`} alt="аватар" style={{height: 20}}/>
                </div>)
            }

        </div>
    );
};

export default Users;