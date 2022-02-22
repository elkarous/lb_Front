import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProprietiesComponent } from './proprieties.component';

describe('ProprietiesComponent', () => {
  let component: ProprietiesComponent;
  let fixture: ComponentFixture<ProprietiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProprietiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProprietiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
