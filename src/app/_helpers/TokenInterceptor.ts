import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth-service.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor{
    constructor(private authService:AuthService){}
    intercept(req: import("@angular/common/http").HttpRequest<any>, next: import("@angular/common/http").HttpHandler): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {
        const authToken = this.authService.getToken();
        // take copy of httpurl and add header
        req = req.clone({
            setHeaders:{
                'Auth_Token' : authToken
            }
        });

        return next.handle(req);
    }
    
}