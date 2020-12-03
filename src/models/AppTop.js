import Model from './Model.js'

export default class AppTop extends Model {
  buildUrl ({ params }) {
    return ['top-contents', ...params]
  }

  static async updateAppTop (data) {
    return (new this()).request({ method: 'POST', url: 'top-contents', data, isStatic: true })
  }
}
