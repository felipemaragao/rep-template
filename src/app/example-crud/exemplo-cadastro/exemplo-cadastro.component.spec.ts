import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExemploCadastroComponent } from './exemplo-cadastro.component';

describe('ExemploCadastroComponent', () => {
  let component: ExemploCadastroComponent;
  let fixture: ComponentFixture<ExemploCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExemploCadastroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExemploCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
