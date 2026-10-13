import { Component, input } from '@angular/core';

@Component({
  selector: 'app-section-title',
  template: `<div class="container section-title"><h2>{{ title() }}</h2><p>{{ subtitle() }}</p></div>`
})
export class SectionTitleComponent { title = input.required<string>(); subtitle = input(''); }
