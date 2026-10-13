import { Component, input } from '@angular/core';
import { Profile } from '../cv.model';
import { SectionTitleComponent } from '../shared/section-title.component';

@Component({
  selector: 'app-profile', imports: [SectionTitleComponent],
  template: `
    <section id="hero" class="hero section dark-background" [class.has-cover]="!!profile().cover.src" aria-labelledby="profile-title">
      @if (profile().cover.src) { <img [src]="profile().cover.src" [alt]="profile().cover.alt" fetchpriority="high"> }
      <div class="container text-center">
        <span class="eyebrow">Portafolio personal</span>
        <h1 id="profile-title">{{ profile().name ? 'Hola, soy ' + profile().name : 'Tu nombre aquí' }}</h1>
        <p>{{ profile().role || 'Profesión o carrera por completar' }}</p>
        @if (profile().intro) { <p class="hero-intro">{{ profile().intro }}</p> }
        <a href="#portfolio" class="portfolio-button mt-4">Ver proyectos <i class="bi bi-arrow-right" aria-hidden="true"></i></a>
        <a href="#about" class="btn-scroll" aria-label="Ir a Sobre mí"><i class="bi bi-chevron-down" aria-hidden="true"></i></a>
      </div>
      @if (!profile().cover.src) { <span class="cover-note">Fotografía de portada pendiente</span> }
    </section>
    <section id="about" class="about section">
      <app-section-title title="Sobre mí" subtitle="Un vistazo a mi perfil y a lo que me motiva." />
      <div class="container"><div class="row gy-4 align-items-center">
        <div class="col-lg-4">
          @if (profile().photo.src) { <img [src]="profile().photo.src" [alt]="profile().photo.alt" class="profile-photo img-fluid" loading="lazy"> }
          @else { <div class="photo-placeholder"><i class="bi bi-person" aria-hidden="true"></i><span>Fotografía personal pendiente</span></div> }
        </div>
        <div class="col-lg-8 content">
          <h3>{{ profile().role || 'Perfil por completar' }}</h3>
          <p class="fst-italic py-3">{{ profile().intro || 'Presentación personal pendiente.' }}</p>
          <p class="preserve-lines">{{ profile().bio || 'Biografía pendiente. Aquí podrás compartir tus intereses, objetivos y tu historia.' }}</p>
          @if (profile().location || profile().availability) {
            <ul class="mt-4">
              @if (profile().location) { <li><i class="bi bi-chevron-right" aria-hidden="true"></i><strong>Ubicación:</strong><span>{{ profile().location }}</span></li> }
              @if (profile().availability) { <li><i class="bi bi-chevron-right" aria-hidden="true"></i><strong>Disponibilidad:</strong><span>{{ profile().availability }}</span></li> }
            </ul>
          }
          @if (profile().cvFile) { <a class="portfolio-button" [href]="profile().cvFile" download>Descargar CV <i class="bi bi-download" aria-hidden="true"></i></a> }
        </div>
      </div></div>
    </section>`
})
export class ProfileComponent { profile = input.required<Profile>(); }
