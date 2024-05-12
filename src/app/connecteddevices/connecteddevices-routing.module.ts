import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectedDevicesPage } from './connecteddevices.page';

const routes: Routes = [
  {
    path: '',
    component: ConnectedDevicesPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConnectedDevicesPageRoutingModule {}
