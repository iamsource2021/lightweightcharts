import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LightweightShartsComponent } from './lightweight-sharts.component';

describe('LightweightShartsComponent', () => {
  let component: LightweightShartsComponent;
  let fixture: ComponentFixture<LightweightShartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LightweightShartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LightweightShartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
