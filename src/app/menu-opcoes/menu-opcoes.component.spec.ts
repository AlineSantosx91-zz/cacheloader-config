import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuOpcoesComponent } from './menu-opcoes.component';

describe('MenuOpcoesComponent', () => {
  let component: MenuOpcoesComponent;
  let fixture: ComponentFixture<MenuOpcoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuOpcoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuOpcoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
