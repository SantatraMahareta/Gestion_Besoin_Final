import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoirEvolutionScdsiComponent } from './voir-evolution-scdsi.component';

describe('VoirEvolutionScdsiComponent', () => {
  let component: VoirEvolutionScdsiComponent;
  let fixture: ComponentFixture<VoirEvolutionScdsiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VoirEvolutionScdsiComponent]
    });
    fixture = TestBed.createComponent(VoirEvolutionScdsiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
