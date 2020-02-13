import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { SelfEvaluationComponent } from './self-evaluation.component';
describe('SelfEvaluationComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SelfEvaluationComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();
        fixture = TestBed.createComponent(SelfEvaluationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=self-evaluation.component.spec.js.map