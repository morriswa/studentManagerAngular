import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResthttpComponent } from './resthttp.component';

describe('ResthttpComponent', () => {
  let component: ResthttpComponent;
  let fixture: ComponentFixture<ResthttpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResthttpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResthttpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
