import Model from './Model.js'

export default class Notice extends Model {
  buildUrl (request) {
    const { params } = request
    return ['news', ...params]
  }

  static async update (id, data) {
    return (new this()).request({ method: 'POST', url: `news/${id}`, data, isStatic: true })
  }

  static async delete (id) {
    return (new this()).request({ method: 'DELETE', url: `news/${id}`, isStatic: true })
  }
}
