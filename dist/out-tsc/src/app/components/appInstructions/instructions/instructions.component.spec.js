import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { InstructionsComponent } from './instructions.component';
describe('InstructionsComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [InstructionsComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();
        fixture = TestBed.createComponent(InstructionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=instructions.component.spec.js.map