import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { IdrankComponent } from './idrank.component';
describe('IdrankComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [IdrankComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();
        fixture = TestBed.createComponent(IdrankComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=idrank.component.spec.js.map