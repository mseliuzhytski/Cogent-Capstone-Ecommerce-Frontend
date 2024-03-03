import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountTableDialogComponent } from './account-table-dialog.component';

describe('AccountTableDialogComponent', () => {
  let component: AccountTableDialogComponent;
  let fixture: ComponentFixture<AccountTableDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountTableDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountTableDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
