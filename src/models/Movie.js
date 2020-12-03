import Model from './Model.js'

export default class Movie extends Model {
  buildUrl (request) {
    const { params } = request
    return ['movies', ...params]
  }
}
