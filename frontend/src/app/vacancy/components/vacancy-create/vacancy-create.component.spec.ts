import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacancyCreateComponent } from './vacancy-create.component';

describe('VacancyCreateComponent', () => {
  let component: VacancyCreateComponent;
  let fixture: ComponentFixture<VacancyCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VacancyCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VacancyCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
