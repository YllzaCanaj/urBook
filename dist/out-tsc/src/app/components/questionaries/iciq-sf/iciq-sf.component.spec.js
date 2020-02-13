import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { IciqSfComponent } from './iciq-sf.component';
describe('IciqSfComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [IciqSfComponent],
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
//# sourceMappingURL=iciq-sf.component.spec.js.map