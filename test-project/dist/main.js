"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const checker_1 = require("./middleware/checker");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(checker_1.default);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map