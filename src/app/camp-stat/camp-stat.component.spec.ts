import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampStatComponent } from './camp-stat.component';

describe('CampStatComponent', () => {
  let component: CampStatComponent;
  let fixture: ComponentFixture<CampStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampStatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
