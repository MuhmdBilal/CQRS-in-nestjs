import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  let PORT = 3000
  await app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});
}
bootstrap();
