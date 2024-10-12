import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AanpasItemComponent } from './aanpas-item.component';

describe('AanpasItemComponent', () => {
  let component: AanpasItemComponent;
  let fixture: ComponentFixture<AanpasItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AanpasItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AanpasItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
