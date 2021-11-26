import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {HeaderComponent} from './app-frame/components/header/header.component';
import { ValidationInfoComponent } from './validation-info/validation-info.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ValidationInfoComponent
  ],
  imports: [
    CommonModule, RouterModule
  ],
  exports: [
    CommonModule, RouterModule,
    HeaderComponent, ValidationInfoComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [] // shared services go here
    };
  }
}
