import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSrsgbdComponent } from './header-srsgbd.component';

describe('HeaderSrsgbdComponent', () => {
  let component: HeaderSrsgbdComponent;
  let fixture: ComponentFixture<HeaderSrsgbdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderSrsgbdComponent]
    });
    fixture = TestBed.createComponent(HeaderSrsgbdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
