import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KillAnimationComponent } from './kill-animation.component';

describe('KillAnimationComponent', () => {
  let component: KillAnimationComponent;
  let fixture: ComponentFixture<KillAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KillAnimationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KillAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
