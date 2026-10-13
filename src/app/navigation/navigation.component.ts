import { Component, ElementRef, HostListener, inject, input, signal } from '@angular/core';

@Component({
  selector: 'app-navigation',
  host: { class: 'header d-flex align-items-center sticky-top', '[class.menu-open]': 'open()' },
  template: `
    <a href="#main" class="skip-link">Saltar al contenido</a>
    <div class="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
      <a href="#hero" class="logo d-flex align-items-center" (click)="close()"><span class="sitename">{{ name() || 'Mi portafolio' }}</span></a>
      <nav class="navmenu" aria-label="Navegación principal">
        <ul id="main-menu">
          @for (item of items; track item.id) {
            <li><a [href]="'#' + item.id" [class.active]="active() === item.id" [attr.aria-current]="active() === item.id ? 'location' : null" (click)="active.set(item.id); close()">{{ item.label }}</a></li>
          }
        </ul>
        <button type="button" class="mobile-nav-toggle d-xl-none" aria-controls="main-menu" [attr.aria-expanded]="open()" [attr.aria-label]="open() ? 'Cerrar menú' : 'Abrir menú'" (click)="open.set(!open())">
          <i class="bi" [class.bi-list]="!open()" [class.bi-x]="open()" aria-hidden="true"></i>
        </button>
      </nav>
    </div>`
})
export class NavigationComponent {
  name = input(''); open = signal(false); active = signal('hero');
  private element: ElementRef<HTMLElement> = inject(ElementRef);
  items = [{ id: 'hero', label: 'Inicio' }, { id: 'about', label: 'Sobre mí' }, { id: 'resume', label: 'Trayectoria' }, { id: 'skills', label: 'Habilidades' }, { id: 'portfolio', label: 'Proyectos' }, { id: 'multimedia', label: 'Multimedia' }, { id: 'contact', label: 'Contacto' }];
  close() { this.open.set(false); }
  @HostListener('document:keydown.escape') onEscape() {
    if (this.open()) { this.close(); this.element.nativeElement.querySelector<HTMLButtonElement>('button')?.focus(); }
  }
  @HostListener('document:click', ['$event']) onOutside(event: Event) {
    if (!this.element.nativeElement.contains(event.target as Node)) this.close();
  }
  @HostListener('window:resize') onResize() { if (window.innerWidth >= 1200) this.close(); }
  @HostListener('window:scroll') onScroll() {
    const current = [...this.items].reverse().find(item => {
      const section = document.getElementById(item.id);
      return section && section.getBoundingClientRect().top <= 160;
    });
    this.active.set(current?.id ?? 'hero');
  }
}
