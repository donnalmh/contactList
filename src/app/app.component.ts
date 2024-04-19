import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ContactListService } from './shared/contact-list.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ContactListComponent, ContactFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:[
    ContactListService]
})
export class AppComponent {
  title = 'ContactListApp';
}
