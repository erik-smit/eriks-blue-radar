import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { ConnectedDevicesPage } from './connecteddevices.page';

describe('ConnectedDevicesPage', () => {
  let component: ConnectedDevicesPage;
  let fixture: ComponentFixture<ConnectedDevicesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConnectedDevicesPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ConnectedDevicesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
