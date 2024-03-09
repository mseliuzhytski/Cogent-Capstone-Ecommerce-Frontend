import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductalertComponent } from './productalert.component';

describe('ProductalertComponent', () => {
  let component: ProductalertComponent;
  let fixture: ComponentFixture<ProductalertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductalertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductalertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
