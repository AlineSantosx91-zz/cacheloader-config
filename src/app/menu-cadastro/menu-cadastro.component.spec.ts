import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCadastroComponent } from './menu-cadastro.component';

describe('MenuCadastroComponent', () => {
  let component: MenuCadastroComponent;
  let fixture: ComponentFixture<MenuCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
