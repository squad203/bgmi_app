import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreboardUpdateComponent } from './scoreboard-update.component';

describe('ScoreboardUpdateComponent', () => {
  let component: ScoreboardUpdateComponent;
  let fixture: ComponentFixture<ScoreboardUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScoreboardUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScoreboardUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
