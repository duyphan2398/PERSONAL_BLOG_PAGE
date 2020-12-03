import Model from './Model.js'

export default class Device extends Model {
  buildUrl (request) {
    const { params } = request
    return ['devices', ...params]
  }

  static async delete_device (id) {
    return (new this()).request({ method: 'DELETE', url: `devices/${id}`, isStatic: true })
  }
}
