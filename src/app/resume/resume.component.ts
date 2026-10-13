import { Component, input } from '@angular/core';
import { TimelineEntry } from '../cv.model';
import { SectionTitleComponent } from '../shared/section-title.component';

@Component({
  selector: 'app-resume', imports: [SectionTitleComponent],
  template: `
    <section id="resume" class="resume section light-background">
      <app-section-title title="Trayectoria" subtitle="Formación y experiencias que construyen mi camino." />
      <div class="container"><div class="row gy-4">
        @for (column of [{ title: 'Formación', entries: education() }, { title: 'Experiencia', entries: experience() }]; track column.title) {
          <div class="col-lg-6"><h3 class="resume-title">{{ column.title }}</h3>
            @for (entry of column.entries; track $index) {
              <article class="resume-item"><h4>{{ entry.title || entry.degree || 'Título por completar' }}</h4>
                @if (entry.period || entry.year) { <h5>{{ entry.period || entry.year }}</h5> }
                @if (entry.organization || entry.institution) { <p><em>{{ entry.organization || entry.institution }}</em></p> }
                @if (entry.description) { <p class="preserve-lines">{{ entry.description }}</p> }
                @if (entry.highlights?.length) { <ul>@for (point of entry.highlights; track $index) { <li>{{ point }}</li> }</ul> }
              </article>
            } @empty { <div class="resume-item"><h4>{{ column.title }} por completar</h4><p>Aún no se han añadido datos a esta sección.</p></div> }
          </div>
        }
      </div></div>
    </section>`
})
export class ResumeComponent { education = input.required<TimelineEntry[]>(); experience = input.required<TimelineEntry[]>(); }
