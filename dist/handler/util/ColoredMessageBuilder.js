"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColoredMessageBuilder = void 0;
exports.colored = colored;
exports.rainbow = rainbow;
const Formatting_1 = require("../types/Formatting");
class ColoredMessageBuilder {
  message = "";
  start = "\u001b[";
  reset = "\u001b[0m";
  add(text, param1, param2, param3 = Formatting_1.Format.Normal) {
    let params = [param1, param2, param3];
    let color, backgroundColor, format;
    for (const param of params) {
      if (Object.values(Formatting_1.Color).includes(param)) color = param;
      if (Object.values(Formatting_1.BackgroundColor).includes(param))
        backgroundColor = param;
      if (Object.values(Formatting_1.Format).includes(param)) format = param;
    }
    if (backgroundColor) backgroundColor = `${backgroundColor};`;
    else backgroundColor = Formatting_1.BackgroundColor.None;
    this.message += `${this.start}${format};${backgroundColor}${color}m${text}${this.reset}`;
    return this;
  }
  addRainbow(text, format = Formatting_1.Format.Normal) {
    const rainbowColors = [
      Formatting_1.Color.Red,
      Formatting_1.Color.Yellow,
      Formatting_1.Color.Green,
      Formatting_1.Color.Cyan,
      Formatting_1.Color.Blue,
      Formatting_1.Color.Pink,
    ];
    let rainbowText = "";
    for (let i = 0; i < text.length; i++) {
      const char = text.charAt(i);
      const color = rainbowColors[i % rainbowColors.length];
      rainbowText += `${this.start}${format};${color}m${char}${this.reset}`;
    }
    this.message += rainbowText;
    return this;
  }
  addNewLine() {
    this.message += "\n";
    return this;
  }
  build() {
    return `\`\`\`ansi\n${this.message}\n\`\`\``;
  }
}
exports.ColoredMessageBuilder = ColoredMessageBuilder;
function colored(text, param1, param2, param3 = Formatting_1.Format.Normal) {
  let params = [param1, param2, param3];
  let color, backgroundColor, format;
  for (const param of params) {
    if (Object.values(Formatting_1.Color).includes(param)) color = param;
    if (Object.values(Formatting_1.BackgroundColor).includes(param))
      backgroundColor = param;
    if (Object.values(Formatting_1.Format).includes(param)) format = param;
  }
  if (backgroundColor) backgroundColor = `${backgroundColor};`;
  else backgroundColor = Formatting_1.BackgroundColor.None;
  return `\`\`\`ansi\n\u001b[${format};${backgroundColor}${color}m${text}\u001b[0m\n\`\`\``;
}
function rainbow(text, format = Formatting_1.Format.Normal) {
  const rainbowColors = [
    Formatting_1.Color.Red,
    Formatting_1.Color.Yellow,
    Formatting_1.Color.Gray,
    Formatting_1.Color.Cyan,
    Formatting_1.Color.Blue,
    Formatting_1.Color.Pink,
  ];
  let rainbowText = "";
  for (let i = 0; i < text.length; i++) {
    const char = text.charAt(i);
    const color = rainbowColors[i % rainbowColors.length];
    rainbowText += `\u001b[${format};${color}m${char}\u001b[0m`;
  }
  return `\`\`\`ansi\n${rainbowText}\n\`\`\``;
}
/*لا تنس الدعاء لاخوتنا في فلسطين
 لو محتاج اي مساعده ابعتلي رساله برايف علي الحساب mohaned77
 اخيرا لا تنس الصلاه علي النبي 
 */
