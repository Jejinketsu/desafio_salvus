import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:3333"
});

export async function DeleteUser(token){
    api.delete("/delete_user", {
        headers: {
            'authorization': `Bearer ${token}`
        }
    })
    .then(() => true)
    .catch(() => false)
}

export async function UpdateUser(data, token){
    await api.patch("/update_user", data, {
        headers: {
            'authorization': `Bearer ${token}`
        },
    })
}

export default api;