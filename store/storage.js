const STORAGE_USER_KEY = 'STORAGE_USER_KEY'

export default {
  // 获取
  getLocal (key = STORAGE_USER_KEY) {
    if (typeof window !== 'undefined') {
      // console.log(typeof window.localStorage.getItem('userinfor'))
      return window.localStorage.getItem(key) === 'undefined' ? window.localStorage.getItem(key) : JSON.parse(window.localStorage.getItem(key))
    }
  },
  // 设置用
  setLocal (res, key = STORAGE_USER_KEY, isSaveOldData = false) {
    //第三个参数是true的话,会增加数据而不是重新设置,res必须是数组
    if (typeof window !== 'undefined') {
      if (isSaveOldData) {
        if(this.getLocal(key)) {
          let oldData = this.getLocal(key);
          return window.localStorage.setItem(key, JSON.stringify(oldData.concat(res)))
        }
      }
      return window.localStorage.setItem(key, JSON.stringify(res))
    }
  },
  // 清除缓存
  clear(){
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('userinfor')
    }
  }
}