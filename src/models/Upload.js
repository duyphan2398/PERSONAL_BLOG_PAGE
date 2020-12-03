import Model from './Model.js'

export default class Prefecture extends Model {
  buildUrl ({ params }) {
    return ['upload', ...params]
  }

  static uploadImage (data) {
    return (new this()).request({ method: 'POST', url: 'upload', data, isStatic: true })
  }
}
