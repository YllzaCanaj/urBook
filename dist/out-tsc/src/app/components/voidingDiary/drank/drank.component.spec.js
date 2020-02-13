import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { DrankComponent } from './drank.component';
describe('DrankComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DrankComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();
        fixture = TestBed.createComponent(DrankComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=drank.component.spec.js.map