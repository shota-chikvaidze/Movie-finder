import axios from '../axios'

export const GetMovieEndpoint = async () => {
    const res = await axios.get('/movie/get-movies')
    return res.data
}