import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCrudComponent } from './account-crud.component';

describe('AccountCrudComponent', () => {
  let component: AccountCrudComponent;
  let fixture: ComponentFixture<AccountCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountCrudComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
