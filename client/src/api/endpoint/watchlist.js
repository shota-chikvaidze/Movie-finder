import axios from '../axios'

export const WatchlistEndpoint = async (id) => {
    const res = await axios.post(`/watchlist/movie/watchlist/${id}`)
    return res.data
}

export const GetWatchlistEndpoint = async () => {
    const res = await axios.get(`/watchlist/get-watchlist-movie`)
    return res.data
}

export const DeleteWatchlistEndpoint = async (id) => {
    const res = await axios.delete(`/watchlist/remove-movie/${id}`)
    return res.data
}
