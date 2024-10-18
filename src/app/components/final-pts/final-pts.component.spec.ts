import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalPtsComponent } from './final-pts.component';

describe('FinalPtsComponent', () => {
  let component: FinalPtsComponent;
  let fixture: ComponentFixture<FinalPtsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinalPtsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinalPtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
