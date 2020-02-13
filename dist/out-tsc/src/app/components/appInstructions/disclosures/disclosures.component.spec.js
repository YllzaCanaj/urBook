import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { DisclosuresComponent } from './disclosures.component';
describe('DisclosuresComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DisclosuresComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();
        fixture = TestBed.createComponent(DisclosuresComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=disclosures.component.spec.js.map