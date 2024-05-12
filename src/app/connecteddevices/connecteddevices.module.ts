import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConnectedDevicesPage } from './connecteddevices.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { ConnectedDevicesPageRoutingModule } from './connecteddevices-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    ConnectedDevicesPageRoutingModule
  ],
  declarations: [ConnectedDevicesPage]
})
export class ConnectedDevicesPageModule {}
