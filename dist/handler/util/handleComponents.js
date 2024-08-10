"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerComponents = registerComponents;
exports.handleComponents = handleComponents;
const tslib_1 = require("tslib");
const glob_1 = require("glob");
const Logger_1 = tslib_1.__importDefault(require("./Logger"));
const index_1 = require("../../index");
const config_1 = require("../../config");
const Component_1 = require("../types/Component");
async function registerComponents(client) {
  const componentPaths = await (0, glob_1.glob)(
    `**/${config_1.componentsFolderName}/**/**/*.js`
  );
  for (const componentPath of componentPaths) {
    const importPath = `../..${componentPath.replace(/^dist[\\\/]|\\/g, "/")}`;
    try {
      const module = (
        await Promise.resolve(`${importPath}`).then((s) =>
          tslib_1.__importStar(require(s))
        )
      ).default;
      const { id, group, type } = module;
      if (id || group) {
        client.components[type].set(id || group, module);
      }
    } catch (err) {
      Logger_1.default.error(`Failed to load component at ${importPath}`, err);
    }
  }
}
async function handleComponents(interaction) {
  const { componentId, customId } = getIds(interaction);
  if (interaction.isButton() || interaction.isAnySelectMenu())
    interaction.customId = customId;
  if (!componentId) {
    return Logger_1.default.error(
      "The component id could not be filtered.",
      interaction
    );
  }
  const component =
    index_1.client.components[getComponentType(interaction)].get(componentId);
  const errorIdMessage = `group=${
    componentId === customId ? "none" : componentId
  } id:${customId}`;
  if (!component) {
    return Logger_1.default.error(
      `No component matching ${errorIdMessage} was found.`
    );
  }
  if (interaction.isModalSubmit() && component.group) {
    return Logger_1.default.error(
      `The parameter group in ${errorIdMessage} is not allowed.`
    );
  }
  try {
    await component.execute(interaction);
  } catch (err) {
    return Logger_1.default.error(
      `Error executing component with id: ${errorIdMessage}`,
      err
    );
  }
}
function getIds(interaction) {
  let customId = "";
  let componentId = "";
  if (interaction.isButton() || interaction.isAnySelectMenu()) {
    const [idPart, customPart] = interaction.customId.split(";");
    componentId = idPart.includes("group=")
      ? idPart.replace(/group=|;/g, "")
      : idPart;
    customId = customPart || idPart;
  } else if (interaction.isModalSubmit()) {
    componentId = interaction.customId;
    customId = interaction.customId;
  }
  return {
    componentId,
    customId,
  };
}
function getComponentType(interaction) {
  if (interaction.isButton()) return Component_1.ComponentTypes.Button;
  else if (interaction.isAnySelectMenu())
    return Component_1.ComponentTypes.SelectMenu;
  else return Component_1.ComponentTypes.Modal;
}
/*لا تنس الدعاء لاخوتنا في فلسطين
 لو محتاج اي مساعده ابعتلي رساله برايف علي الحساب mohaned77
 اخيرا لا تنس الصلاه علي النبي 
 */
