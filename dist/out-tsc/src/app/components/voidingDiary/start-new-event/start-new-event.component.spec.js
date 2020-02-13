import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { StartNewEventComponent } from './start-new-event.component';
describe('StartNewEventComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StartNewEventComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();
        fixture = TestBed.createComponent(StartNewEventComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=start-new-event.component.spec.js.map