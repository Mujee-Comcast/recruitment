import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacancyUploadComponent } from './vacancy-upload.component';

describe('VacancyUploadComponent', () => {
  let component: VacancyUploadComponent;
  let fixture: ComponentFixture<VacancyUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VacancyUploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VacancyUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
