import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { WelcomePageComponent } from './welcome-page.component';
describe('WelcomePageComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [WelcomePageComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();
        fixture = TestBed.createComponent(WelcomePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=welcome-page.component.spec.js.map