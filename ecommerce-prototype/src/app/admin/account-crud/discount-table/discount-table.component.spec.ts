import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountTableComponent } from './discount-table.component';

describe('DiscountTableComponent', () => {
  let component: DiscountTableComponent;
  let fixture: ComponentFixture<DiscountTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiscountTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiscountTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
