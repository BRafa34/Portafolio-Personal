import { Component, input } from '@angular/core';
import { Media } from '../cv.model';
import { SectionTitleComponent } from '../shared/section-title.component';

@Component({
  selector: 'app-multimedia', imports: [SectionTitleComponent],
  template: `
    <section id="multimedia" class="section multimedia">
      <app-section-title title="Multimedia" subtitle="Fotografías, videos y audio de mi trabajo." />
      <div class="container"><div class="row gy-4">
        @for (item of media(); track $index) {
          <div class="col-lg-4 col-md-6"><figure class="media-card">
            @switch (item.type) {
              @case ('image') { <a [href]="item.src" target="_blank" rel="noopener noreferrer" [attr.aria-label]="'Ampliar ' + item.title + ' (nueva pestaña)'"><img [src]="item.src" [alt]="item.alt" loading="lazy"></a> }
              @case ('video') { <video controls preload="metadata" [src]="item.src" [attr.aria-label]="item.alt">@if (item.captionSrc) { <track kind="captions" [src]="item.captionSrc" srclang="es" label="Español" default> } Tu navegador no soporta video.</video> }
              @case ('audio') { <div class="audio-cover"><i class="bi bi-soundwave" aria-hidden="true"></i></div><audio controls preload="metadata" [src]="item.src" [attr.aria-label]="item.alt">Tu navegador no soporta audio.</audio> }
            }
            <figcaption><h3>{{ item.title }}</h3><p class="preserve-lines">{{ item.description }}</p></figcaption>
          </figure></div>
        } @empty { <div class="col-12"><div class="empty-state"><i class="bi bi-images" aria-hidden="true"></i><h3>Galería por completar</h3><p>Un espacio para tus fotografías y material audiovisual.</p></div></div> }
      </div></div>
    </section>`
})
export class MultimediaComponent { media = input.required<Media[]>(); }
