import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatePasswordComponent } from './template-password.component';

describe('TemplatePasswordComponent', () => {
  let component: TemplatePasswordComponent;
  let fixture: ComponentFixture<TemplatePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplatePasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplatePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
