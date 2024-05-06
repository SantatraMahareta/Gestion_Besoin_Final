import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoirEvolutionComponent } from './voir-evolution.component';

describe('VoirEvolutionComponent', () => {
  let component: VoirEvolutionComponent;
  let fixture: ComponentFixture<VoirEvolutionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VoirEvolutionComponent]
    });
    fixture = TestBed.createComponent(VoirEvolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
