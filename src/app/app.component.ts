import { PrimeNGConfig } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'modulo-exemplo-ui';

constructor(
  private config: PrimeNGConfig,
  private translateService: TranslateService,
  private router: Router
) {}

  ngOnInit() {
    this.config.ripple = true;
    this.translateService.setDefaultLang('en');
}

translate(lang: string) {
  this.translateService.setDefaultLang('pt');
  this.translateService.get('primeng')
    .subscribe(res => this.config.setTranslation(res));
}

}
