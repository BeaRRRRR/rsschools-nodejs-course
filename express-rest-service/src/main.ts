import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { bootstrapLogger } from './util/logger';
import { ErrorsInterceptor } from './errors.interceptor';
import { AuthGuard } from './auth.guard';
import { AppModule } from './app.module';


async function bootstrap() {
    const app = await NestFactory.create(AppModule, { logger: bootstrapLogger });

    app.useGlobalInterceptors(new ErrorsInterceptor(bootstrapLogger))
    app.useGlobalGuards(new AuthGuard());

    const options = new DocumentBuilder()
        .setTitle('Express Rest Service')
        .setDescription('An Express REST API created as an RsShools Node.js internship task')
        .setVersion('0.1')
        .addTag('REST')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('doc', app, document);

    await app.listen(4000);

}
bootstrap();


process
    .on('unhandledRejection', (reason: Error | any) => {
        bootstrapLogger.error(`[Unhandled Rejection] ${reason.stack}`);
    })
    .on('uncaughtException', (err: Error) => {
        bootstrapLogger.error(`[Unhandled Exception] ${err.stack}`);
    });
