import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExemploPesquisaComponent } from './exemplo-pesquisa.component';

describe('ExemploPesquisaComponent', () => {
  let component: ExemploPesquisaComponent;
  let fixture: ComponentFixture<ExemploPesquisaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExemploPesquisaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExemploPesquisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
