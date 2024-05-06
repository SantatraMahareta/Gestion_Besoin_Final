import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderDsiComponent } from './header-dsi.component';

describe('HeaderDsiComponent', () => {
  let component: HeaderDsiComponent;
  let fixture: ComponentFixture<HeaderDsiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderDsiComponent]
    });
    fixture = TestBed.createComponent(HeaderDsiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
