"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerEvents = registerEvents;
const tslib_1 = require("tslib");
const glob_1 = require("glob");
const Logger_1 = tslib_1.__importDefault(require("./Logger"));
const config_1 = require("../../config");
async function registerEvents(client) {
  const eventsPaths = await (0, glob_1.glob)(
    `**/${config_1.eventsFolderName}/**/**/*.js`
  );
  for (const eventPath of eventsPaths) {
    const importPath = `../..${eventPath.replace(/^dist[\\\/]|\\/g, "/")}`;
    try {
      const eventModule = (
        await Promise.resolve(`${importPath}`).then((s) =>
          tslib_1.__importStar(require(s))
        )
      ).default;
      const { name, execute, once } = eventModule;
      client.events.push(name);
      if (once) {
        client.once(String(name), (...args) => execute(...args));
      } else {
        client.on(String(name), (...args) => execute(...args));
      }
    } catch (err) {
      Logger_1.default.error(`Failed to load event at: ${importPath}`, err);
    }
  }
}
/*لا تنس الدعاء لاخوتنا في فلسطين
 لو محتاج اي مساعده ابعتلي رساله برايف علي الحساب mohaned77
 اخيرا لا تنس الصلاه علي النبي 
 */
