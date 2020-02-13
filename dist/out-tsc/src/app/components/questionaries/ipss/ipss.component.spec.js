import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { IPSSComponent } from './ipss.component';
describe('IPSSComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [IPSSComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();
        fixture = TestBed.createComponent(IPSSComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=ipss.component.spec.js.map