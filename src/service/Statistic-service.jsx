import Muitl from 'uitl/mm.jsx'

const _mm = new Muitl();

class Statistic {
  getHomeCount() {
    return _mm.request({
      url: '/manage/statistic/base_count.do'
    })
  }
}

export default Statistic;