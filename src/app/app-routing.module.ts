import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculatorComponent } from './calculator/calculator.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  { path: 'homepage', title: 'Landing Page', component: LandingComponent },
  { path: 'calculator', title: 'Calculator', component: CalculatorComponent},
  { path: '**', component: LandingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
