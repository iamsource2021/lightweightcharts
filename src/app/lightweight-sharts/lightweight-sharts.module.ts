import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LightweightShartsComponent } from './lightweight-sharts.component';
import { ResolverService } from './services/resolver.service';
import { NavbarService } from './services/navbar.service';

@NgModule({
  declarations: [LightweightShartsComponent],
  imports: [
    CommonModule
  ],
  exports: [LightweightShartsComponent],
  providers: [ResolverService,NavbarService]
})
export class LightweightShartsModule { }
