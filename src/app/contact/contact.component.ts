import { Component, input } from '@angular/core';
import { Contact } from '../cv.model';
import { SectionTitleComponent } from '../shared/section-title.component';

@Component({
  selector: 'app-contact', imports: [SectionTitleComponent],
  template: `
    <section id="contact" class="contact section light-background">
      <app-section-title title="Contacto" subtitle="Sigamos en contacto." />
      <div class="container"><div class="row gy-4 justify-content-center">
        @if (contact().email) { <div class="col-md-6"><div class="info-item"><i class="bi bi-envelope" aria-hidden="true"></i><div><h3>Correo electrónico</h3><a [href]="'mailto:' + contact().email">{{ contact().email }}</a></div></div></div> }
        @if (contact().phone) { <div class="col-md-6"><div class="info-item"><i class="bi bi-telephone" aria-hidden="true"></i><div><h3>Teléfono</h3><a [href]="'tel:' + contact().phone">{{ contact().phone }}</a></div></div></div> }
        @for (link of contact().links; track $index) { <div class="col-md-6"><div class="info-item"><i class="bi bi-box-arrow-up-right" aria-hidden="true"></i><div><h3>{{ link.label }}</h3><a [href]="link.url" target="_blank" rel="noopener noreferrer">Visitar {{ link.label }} <span class="visually-hidden">(nueva pestaña)</span></a></div></div></div> }
        @if (!contact().email && !contact().phone && !contact().links.length) { <div class="col-12"><div class="empty-state"><i class="bi bi-chat-dots" aria-hidden="true"></i><h3>Datos de contacto pendientes</h3><p>Los enlaces estarán disponibles cuando añadas tus medios de contacto.</p></div></div> }
      </div></div>
    </section>`
})
export class ContactComponent { contact = input.required<Contact>(); }
