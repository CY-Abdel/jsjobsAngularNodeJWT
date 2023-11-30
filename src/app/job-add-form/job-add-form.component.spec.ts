import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobAddFormComponent } from './job-add-form.component';

describe('JobAddFormComponent', () => {
  let component: JobAddFormComponent;
  let fixture: ComponentFixture<JobAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobAddFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
