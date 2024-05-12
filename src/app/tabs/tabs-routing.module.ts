import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'connecteddevices',
        loadChildren: () => import('../connecteddevices/connecteddevices.module').then(m => m.ConnectedDevicesPageModule)
      },
      {
        path: 'scanneddevices',
        loadChildren: () => import('../scanneddevices/scanneddevices.module').then(m => m.ScannedDevicesPageModule)
      },
      {
        path: 'detaildevice',
        loadChildren: () => import('../detaildevice/detaildevice.module').then(m => m.DetailDevicePageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/connecteddevices',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/connecteddevices',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
