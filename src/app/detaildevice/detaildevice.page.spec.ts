import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { DetailDevicePage } from './detaildevice.page';

describe('DetailDevicePage', () => {
  let component: DetailDevicePage;
  let fixture: ComponentFixture<DetailDevicePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailDevicePage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailDevicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
