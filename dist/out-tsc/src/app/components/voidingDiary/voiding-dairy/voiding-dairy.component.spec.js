import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { VoidingDairyComponent } from './voiding-dairy.component';
describe('VoidingDairyComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [VoidingDairyComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();
        fixture = TestBed.createComponent(VoidingDairyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=voiding-dairy.component.spec.js.map