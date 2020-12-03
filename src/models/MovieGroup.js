import Model from './Model.js'

export default class Movie extends Model {
  buildUrl (request) {
    const { params } = request
    return ['movie-groups', ...params]
  }
  static updateMovieGroups (data) {
    return (new this()).request({ method: 'POST', url: `movie-groups`, data, isStatic: true })
  }
  static deleteMovieGroup (id) {
    return (new this()).request({ method: 'DELETE', url: `movie-groups/${id}`, isStatic: true })
  }
}
