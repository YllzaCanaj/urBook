import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { LitwinComponent } from './litwin.component';
describe('LitwinComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LitwinComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();
        fixture = TestBed.createComponent(LitwinComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=litwin.component.spec.js.map