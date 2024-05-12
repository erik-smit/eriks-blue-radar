import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DetailDevicePage } from './detaildevice.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { DetailDevicePageRoutingModule } from './detaildevice-routing.module';

import { NgxEchartsModule } from 'ngx-echarts';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    DetailDevicePageRoutingModule,
    NgxEchartsModule.forRoot({
      /**
       * This will import all modules from echarts.
       * If you only need custom modules,
       * please refer to [Custom Build] section.
       */
      echarts: () => import('echarts'),
    }),
  ],
  declarations: [DetailDevicePage]
})
export class DetailDevicePageModule {}
