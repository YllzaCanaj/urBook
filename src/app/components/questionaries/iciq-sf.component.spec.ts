import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IciqSfComponent } from './iciq-sf.component';

describe('IciqSfComponent', () => {
  let component: IciqSfComponent;
  let fixture: ComponentFixture<IciqSfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IciqSfComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IciqSfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
