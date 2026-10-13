import { Component, HostListener, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Meta, Title } from '@angular/platform-browser';
import { Cv } from './cv.model';
import { NavigationComponent } from './navigation/navigation.component';
import { ProfileComponent } from './profile/profile.component';
import { ResumeComponent } from './resume/resume.component';
import { SkillsComponent } from './skills/skills.component';
import { ProjectsComponent } from './projects/projects.component';
import { MultimediaComponent } from './multimedia/multimedia.component';
import { ContactComponent } from './contact/contact.component';

@Component({
  selector: 'app-root', imports: [NavigationComponent, ProfileComponent, ResumeComponent, SkillsComponent, ProjectsComponent, MultimediaComponent, ContactComponent],
  template: `
    @if (cv(); as data) {
      <app-navigation [name]="data.profile.name" />
      <main id="main" tabindex="-1">
        <app-profile [profile]="data.profile" />
        <app-resume [education]="data.education" [experience]="data.experience" />
        <app-skills [skills]="data.skills" [languages]="data.languages" />
        <app-projects [projects]="data.projects" />
        <app-multimedia [media]="data.media" />
        <app-contact [contact]="data.contact" />
      </main>
      <footer class="footer light-background"><div class="container">
        <h2 class="sitename">{{ data.profile.name || 'Mi portafolio' }}</h2><p>{{ data.profile.role || 'Portafolio personal' }}</p>
        <div class="copyright">© {{ year }} {{ data.profile.name || 'Mi portafolio' }}</div>
        <div class="credits">Diseño de <a href="https://bootstrapmade.com/" target="_blank" rel="noopener noreferrer">BootstrapMade</a> | <a href="https://bootstrapmade.com/tools/" target="_blank" rel="noopener noreferrer">DevTools</a> · Plantilla Lonely</div>
      </div></footer>
      @if (scrolled()) { <a href="#hero" class="scroll-top active d-flex align-items-center justify-content-center" aria-label="Volver al inicio"><i class="bi bi-arrow-up-short" aria-hidden="true"></i></a> }
    } @else {
      <main class="container py-5" id="main">
        @if (error()) { <div role="alert"><h1>No se pudo cargar el portafolio</h1><p>Comprueba la conexión y el archivo de datos del currículum.</p><button type="button" class="portfolio-button" (click)="load()">Reintentar</button></div> }
        @else { <p role="status">Cargando portafolio…</p> }
      </main>
    }`
})
export class AppComponent {
  private http = inject(HttpClient); private title = inject(Title); private meta = inject(Meta);
  cv = signal<Cv | null>(null); error = signal(false); scrolled = signal(false); year = new Date().getFullYear();
  constructor() { this.load(); }
  load() {
    this.error.set(false);
    this.http.get<Cv>('data/cv.json', { params: { v: Date.now().toString() } }).subscribe({
      next: data => {
        this.cv.set(data);
        this.title.setTitle(data.profile.name ? data.profile.name + ' | Portafolio' : 'Portafolio personal');
        if (data.profile.intro) this.meta.updateTag({ name: 'description', content: data.profile.intro });
        setTimeout(() => {
          const target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
          target?.scrollIntoView({ behavior: 'instant' });
        });
      },
      error: () => this.error.set(true)
    });
  }
  @HostListener('window:scroll') onScroll() { this.scrolled.set(window.scrollY > 400); }
}
