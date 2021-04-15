import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LightweightShartsComponent } from './lightweight-sharts.component';
import { ResolverService } from './services/resolver.service';
import { NavbarService } from './services/navbar.service';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [LightweightShartsComponent, NavbarComponent],
  imports: [
    CommonModule
  ],
  exports: [LightweightShartsComponent],
  providers: [ResolverService,NavbarService]
})
export class LightweightShartsModule { }
