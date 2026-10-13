import { Component, computed, ElementRef, input, signal, viewChild } from '@angular/core';
import { Project } from '../cv.model';
import { SectionTitleComponent } from '../shared/section-title.component';

@Component({
  selector: 'app-projects', imports: [SectionTitleComponent],
  template: `
    <section id="portfolio" class="portfolio section light-background">
      <app-section-title title="Proyectos" subtitle="Una selección de trabajos, ideas y procesos." />
      <div class="container">
        @if (projects().length) {
          <div class="project-filters" aria-label="Filtrar proyectos">
            @for (category of categories(); track category) { <button type="button" [class.filter-active]="filter() === category" [attr.aria-pressed]="filter() === category" (click)="filter.set(category)">{{ category }}</button> }
          </div>
          <p class="visually-hidden" role="status">{{ filtered().length }} proyectos visibles</p>
          <div class="row gy-4">
            @for (project of filtered(); track project.id) {
              <div class="col-lg-4 col-md-6"><article class="project-card">
                @if (project.image.src) { <img [src]="project.image.src" [alt]="project.image.alt" loading="lazy"> }
                @else { <div class="project-image-placeholder"><i class="bi bi-folder2-open" aria-hidden="true"></i><span>Imagen pendiente</span></div> }
                <div class="project-content"><span class="eyebrow">{{ project.category }}</span><h3>{{ project.title }}</h3><p>{{ project.description }}</p>
                  <button type="button" class="text-action" (click)="show(project, $event)">Ver proyecto <i class="bi bi-arrow-up-right" aria-hidden="true"></i><span class="visually-hidden">: {{ project.title }}</span></button>
                </div>
              </article></div>
            }
          </div>
        } @else {
          <div class="empty-state"><i class="bi bi-grid-1x2" aria-hidden="true"></i><h3>Proyectos por completar</h3><p>Aquí aparecerán tus trabajos con imágenes, descripción y enlaces.</p></div>
        }
      </div>
    </section>
    <dialog #details class="project-dialog" aria-labelledby="project-dialog-title" (close)="restoreFocus()" (click)="closeBackdrop($event)">
      @if (selected(); as project) {
        <button type="button" class="dialog-close" aria-label="Cerrar detalle del proyecto" (click)="details.close()"><i class="bi bi-x-lg" aria-hidden="true"></i></button>
        @if (project.image.src) { <img [src]="project.image.src" [alt]="project.image.alt" class="dialog-image"> }
        <span class="eyebrow">{{ project.category }}</span><h2 id="project-dialog-title">{{ project.title }}</h2><p class="preserve-lines">{{ project.description }}</p>
        <div class="d-flex flex-wrap gap-2 mb-4">@for (tech of project.technologies; track $index) { <span class="language-tag">{{ tech }}</span> }</div>
        <div class="d-flex flex-wrap gap-3">
          @if (project.url) { <a class="portfolio-button" [href]="project.url" target="_blank" rel="noopener noreferrer">Abrir proyecto <span class="visually-hidden">(nueva pestaña)</span></a> }
          @if (project.repository) { <a class="text-action" [href]="project.repository" target="_blank" rel="noopener noreferrer">Ver código <span class="visually-hidden">(nueva pestaña)</span></a> }
        </div>
      }
    </dialog>`
})
export class ProjectsComponent {
  projects = input.required<Project[]>(); filter = signal('Todos'); selected = signal<Project | null>(null);
  details = viewChild.required<ElementRef<HTMLDialogElement>>('details');
  categories = computed(() => ['Todos', ...new Set(this.projects().map(p => p.category).filter(Boolean))]);
  filtered = computed(() => this.projects().filter(p => this.filter() === 'Todos' || p.category === this.filter()));
  private trigger: HTMLElement | null = null;
  show(project: Project, event: Event) { this.trigger = event.currentTarget as HTMLElement; this.selected.set(project); this.details().nativeElement.showModal(); }
  restoreFocus() { this.trigger?.focus(); }
  closeBackdrop(event: MouseEvent) {
    const dialog = this.details().nativeElement;
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
  }
}
