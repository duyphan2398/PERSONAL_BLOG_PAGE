import Model from './Model.js'

export default class Push extends Model {
  buildUrl (request) {
    const { params } = request
    return ['pushes', ...params]
  }

  static async delete (id) {
    return (new this()).request({ method: 'DELETE', url: `pushes/${id}`, isStatic: true })
  }

  static async update (id, data) {
    return (new this()).request({ method: 'PUT', url: `pushes/${id}`, data, isStatic: true })
  }

  static async count (configs = {}) {
    return (new this()).request({ method: 'GET', url: `pushes/count`, ...configs, isStatic: true })
  }
}
