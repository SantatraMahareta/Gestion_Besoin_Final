import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepartirTacheComponent } from './repartir-tache.component';

describe('RepartirTacheComponent', () => {
  let component: RepartirTacheComponent;
  let fixture: ComponentFixture<RepartirTacheComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepartirTacheComponent]
    });
    fixture = TestBed.createComponent(RepartirTacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
