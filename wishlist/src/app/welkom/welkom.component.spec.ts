import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelkomComponent } from './welkom.component';

describe('WelkomComponent', () => {
  let component: WelkomComponent;
  let fixture: ComponentFixture<WelkomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WelkomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WelkomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
