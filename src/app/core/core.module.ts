import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CacheService } from './services/cache.service';
import { httpInterceptorProviders } from './interceptors';

@NgModule({
 imports: [HttpClientModule],
  providers: [
    CacheService,
    httpInterceptorProviders
  ],
})
export class CoreModule { }
