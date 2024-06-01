import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { tap } from 'rxjs/operators';
  
  @Injectable()
  export class LoggingInterceptor implements NestInterceptor {
    intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
      // console.log('Before...');
      const req = ctx.getArgs()[0]
      console.log('Request >>> ',req.method + ' ' + req.url);
      const now = Date.now();
      return next
        .handle()
        .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)));
    }
  }
  