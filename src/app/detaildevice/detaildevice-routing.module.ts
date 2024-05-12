import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailDevicePage } from './detaildevice.page';

const routes: Routes = [
  {
    path: '',
    component: DetailDevicePage,
  },
  {
    path: 'connected/:connected',
    component: DetailDevicePage
  },
  {
    path: 'scanned/:scanned',
    component: DetailDevicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailDevicePageRoutingModule {}
