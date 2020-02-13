import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { IpeedComponent } from './ipeed.component';
describe('IpeedComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [IpeedComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();
        fixture = TestBed.createComponent(IpeedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=ipeed.component.spec.js.map