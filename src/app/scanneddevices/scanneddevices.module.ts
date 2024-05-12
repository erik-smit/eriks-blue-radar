import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScannedDevicesPage } from './scanneddevices.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { ScannedDevicesPageRoutingModule } from './scanneddevices-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    ScannedDevicesPageRoutingModule
  ],
  declarations: [ScannedDevicesPage]
})
export class ScannedDevicesPageModule {}
