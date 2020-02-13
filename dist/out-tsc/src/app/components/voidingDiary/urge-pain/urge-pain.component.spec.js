import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { UrgePainComponent } from './urge-pain.component';
describe('UrgePainComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UrgePainComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();
        fixture = TestBed.createComponent(UrgePainComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=urge-pain.component.spec.js.map