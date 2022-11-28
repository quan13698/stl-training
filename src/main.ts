import { NestFactory } from '@nestjs/core';
import { AppModule } from './order.module';
import * as session from 'express-session';
import * as passport from 'passport'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3000
    }
  }))

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3333);
}
bootstrap();
