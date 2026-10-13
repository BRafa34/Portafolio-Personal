import { Component, input } from '@angular/core';
import { Language, Skill } from '../cv.model';
import { SectionTitleComponent } from '../shared/section-title.component';

@Component({
  selector: 'app-skills', imports: [SectionTitleComponent],
  template: `
    <section id="skills" class="skills section">
      <app-section-title title="Habilidades" subtitle="Conocimientos, herramientas e idiomas." />
      <div class="container"><div class="row gy-4">
        @for (skill of skills(); track $index) {
          <div class="col-lg-6"><div class="progress">
            <span class="skill"><span>{{ skill.name }}</span><span class="val">{{ skill.level === null ? 'Sin valoración' : skill.level + '%' }}</span></span>
            @if (skill.level !== null) { <div class="progress-bar-wrap"><div class="progress-bar" role="progressbar" [attr.aria-label]="skill.name" [attr.aria-valuenow]="skill.level" aria-valuemin="0" aria-valuemax="100" [style.width.%]="skill.level"></div></div> }
          </div></div>
        } @empty { <div class="col-12"><div class="empty-state"><i class="bi bi-tools" aria-hidden="true"></i><h3>Habilidades por completar</h3><p>Se mostrarán aquí tus conocimientos y herramientas.</p></div></div> }
      </div>
      <div class="languages"><h3>Idiomas</h3><div class="d-flex flex-wrap gap-3">
        @for (language of languages(); track $index) { <span class="language-tag">{{ language.name }} · {{ language.level }}</span> }
        @empty { <p>Idiomas y niveles por completar.</p> }
      </div></div></div>
    </section>`
})
export class SkillsComponent { skills = input.required<Skill[]>(); languages = input.required<Language[]>(); }
