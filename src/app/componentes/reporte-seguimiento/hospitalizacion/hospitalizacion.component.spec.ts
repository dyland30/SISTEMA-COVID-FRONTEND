import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalizacionComponent } from './hospitalizacion.component';

describe('HospitalizacionComponent', () => {
  let component: HospitalizacionComponent;
  let fixture: ComponentFixture<HospitalizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalizacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
