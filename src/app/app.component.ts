import {MediaMatcher} from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import jwt_decode from 'jwt-decode';
import { TokenService } from 'src/app/Services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit {
  mobileQuery!: MediaQueryList;
  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);
  // tslint:disable-next-line: variable-name
  private _mobileQueryListener: () => any;
  title = 'ProjetFilRouge';
  panelOpenState = false;
  token = this.tokenService.getLocalStorageToken();
  decoded: any = '';
constructor(public tokenService: TokenService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,  private router: Router ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  }
ngOnInit(): void {
    if (this.token){
      this.decoded = jwt_decode(this.token.token);
      this.decoded = this.decoded.roles[0];
      console.log(this.decoded);
    }

  }
ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
logout(): void{
    this.tokenService.removeLocalStorage();
    this.router.navigate(['/login']);
  }

}
