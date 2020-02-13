import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { NewEventComponent } from './new-event.component';
describe('NewEventComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NewEventComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();
        fixture = TestBed.createComponent(NewEventComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=new-event.component.spec.js.map