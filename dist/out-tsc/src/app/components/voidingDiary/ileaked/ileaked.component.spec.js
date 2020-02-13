import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { IleakedComponent } from './ileaked.component';
describe('IleakedComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [IleakedComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();
        fixture = TestBed.createComponent(IleakedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=ileaked.component.spec.js.map