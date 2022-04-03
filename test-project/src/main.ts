import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import HttpExceptionFilter from './common/filters/http-exception.filter'
import ValidationPipe from './common/pipes/validation.pipe'
import checker from './middleware/checker'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // app.use(checker)
  // app.useGlobalFilters(new HttpExceptionFilter)
  await app.listen(3000)
}
bootstrap()
