import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashAgentComponent } from './dash-agent.component';

describe('DashAgentComponent', () => {
  let component: DashAgentComponent;
  let fixture: ComponentFixture<DashAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashAgentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
