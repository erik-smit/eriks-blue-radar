import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { ScannedDevicesPage } from './scanneddevices.page';

describe('ScannedDevicesPage', () => {
  let component: ScannedDevicesPage;
  let fixture: ComponentFixture<ScannedDevicesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScannedDevicesPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ScannedDevicesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});