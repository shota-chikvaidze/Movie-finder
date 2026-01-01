import axios from '../axios'

export const GetMovieEndpoint = async (params = {}) => {
    const res = await axios.get('/movie/get-movies', { params })
    return res.data
}

export const GetMovieIdEndpoint = async (id) => {
    const res = await axios.get(`/movie/get-movies-id/${id}`)
    return res.data
}

export const TrendingEndpoint = async () => {
    const res = await axios.get('/movie/trending')
    return res.data
}

export const RecommendationEndpoint = async () => {
    const res = await axios.get('/movie/recommendation')
    return res.data
}
