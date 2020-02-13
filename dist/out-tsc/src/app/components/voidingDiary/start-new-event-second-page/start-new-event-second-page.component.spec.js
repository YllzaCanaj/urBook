import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { StartNewEventSecondPageComponent } from './start-new-event-second-page.component';
describe('StartNewEventSecondPageComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StartNewEventSecondPageComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();
        fixture = TestBed.createComponent(StartNewEventSecondPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=start-new-event-second-page.component.spec.js.map