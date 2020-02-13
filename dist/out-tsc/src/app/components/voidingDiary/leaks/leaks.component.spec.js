import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { LeaksComponent } from './leaks.component';
describe('LeaksComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LeaksComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();
        fixture = TestBed.createComponent(LeaksComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=leaks.component.spec.js.map