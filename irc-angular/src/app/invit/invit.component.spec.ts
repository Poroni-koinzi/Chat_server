import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitComponent } from './invit.component';

describe('InvitComponent', () => {
  let component: InvitComponent;
  let fixture: ComponentFixture<InvitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
