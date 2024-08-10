"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
class Logger {
  static log(message, data) {
    console.info((0, config_1.getLoggerLogMessage)(message), data || "");
  }
  static warn(message, data) {
    console.warn((0, config_1.getLoggerWarnMessage)(message), data || "");
  }
  static error(message, data) {
    console.error((0, config_1.getLoggerErrorMessage)(message), data || "");
  }
}
exports.default = Logger;
/*لا تنس الدعاء لاخوتنا في فلسطين
 لو محتاج اي مساعده ابعتلي رساله برايف علي الحساب mohaned77
 اخيرا لا تنس الصلاه علي النبي 
 */
