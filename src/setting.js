export default {
  develop: window.location.href.indexOf('localhost') !== -1,
  apiURL: process.env.API_ENDPOINT
}
