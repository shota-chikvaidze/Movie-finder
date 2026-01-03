import axios from '../axios'

export const FavoriteEndpoint = async (id) => {
    const res = await axios.post(`/favorite/movie/favorite/${id}`)
    return res.data
}

export const GetFavoriteEndpoint = async () => {
    const res = await axios.get(`/favorite/get-favorites`)
    return res.data
}

export const DeleteFavoriteEndpoint = async (id) => {
    const res = await axios.delete(`/favorite/delete-favorite/${id}`)
    return res.data
}
