import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { YourProfileComponent } from './your-profile.component';
describe('YourProfileComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [YourProfileComponent],
            imports: [IonicModule.forRoot()]
        }).compileComponents();
        fixture = TestBed.createComponent(YourProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=your-profile.component.spec.js.map