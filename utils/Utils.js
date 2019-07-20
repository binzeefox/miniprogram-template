export default class utils {

  /**
   * 通过Date 获取用户可读日期文字（包括时间）
   * @param date  Date 类
   * @returns {string} yyyy/MM/dd HH:
   */
  formatTime = date => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    return [year, month, day].map(this.formatNumber).join('/') + ' ' + [hour, minute, second].map(this.formatNumber).join(':')
  };

  /**
   * 个位数字前补0
   * @param n 数字
   * @returns {string} 二位数字字符串
   */
  formatNumber = n => {
    n = n.toString();
    return n[1] ? n : '0' + n
  };

  /**
   * 获取给James 哥的日期格式
   * @param date Date 类
   * @returns {string}
   */
  formatDateForServer = date => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return [year, month, day].map(this.formatNumber).join('')
  };

  /**
   * 获取给James 哥的时间格式
   * @param time HH:mm
   * @returns {void | string | never}
   */
  formatTimeForServer = time => {
    return time.replace(':', '.')
  };

  /**
   * 将服务器获取的8位数字转为Date 类
   * @param raw yyyyMMdd
   * @returns {Date}
   */
  formatDateFromServer = raw => {
    return new Date(raw.substring(0,4), raw.substring(4,6), raw.substring(6,8))
  };

  /**
   * 将服务器获取的浮点数转为可读日期HH:mm
   * @param raw 浮点数
   * @returns {string}
   */
  formatTimeFromServer = raw => {
    return raw.split('.').map(this.formatNumber).join(':')
  };
}