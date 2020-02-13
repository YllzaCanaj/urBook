import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { PeedComponent } from './peed.component';
describe('PeedComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PeedComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();
        fixture = TestBed.createComponent(PeedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=peed.component.spec.js.map