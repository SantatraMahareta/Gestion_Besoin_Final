import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationEvolutionComponent } from './application-evolution.component';

describe('ApplicationEvolutionComponent', () => {
  let component: ApplicationEvolutionComponent;
  let fixture: ComponentFixture<ApplicationEvolutionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationEvolutionComponent]
    });
    fixture = TestBed.createComponent(ApplicationEvolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
