import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScannedDevicesPage } from './scanneddevices.page';

const routes: Routes = [
  {
    path: '',
    component: ScannedDevicesPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScannedDevicesPageRoutingModule {}
