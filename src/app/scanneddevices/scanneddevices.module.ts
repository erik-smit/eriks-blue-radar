import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScannedDevicesPage } from './scanneddevices.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { ScannedDevicesPageRoutingModule } from './scanneddevices-routing.module';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    ScannedDevicesPageRoutingModule,
    NgxEchartsModule.forRoot({
      /**
       * This will import all modules from echarts.
       * If you only need custom modules,
       * please refer to [Custom Build] section.
       */
      echarts: () => import('echarts'),
    }),
  ],
  declarations: [ScannedDevicesPage]
})
export class ScannedDevicesPageModule {}