import {NestFactory} from '@nestjs/core';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import {AppModule} from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix(process.env.GLOBAL_PREFIX)
    const config = new DocumentBuilder()
        .setTitle('Nest example')
        .setDescription('The example API description')
        .setVersion('1.0')
        .addTag('example')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);
    if(process.env.ENABLE_CORS){
        app.enableCors();
    }
    await app.listen(3000);
}

bootstrap();