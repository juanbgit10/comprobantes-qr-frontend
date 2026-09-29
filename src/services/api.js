import axios from 'axios'

const API_URL = 'http://localhost:8000/api'

export default {
  async getComprobante(hash) {
    const { data } = await axios.get(`${API_URL}/comprobante/${hash}`)
    return data
  },
  downloadPdf(hash) {
    window.open(`${API_URL}/comprobante/${hash}/pdf`, '_blank')
  },
}
