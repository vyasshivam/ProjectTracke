import { Project } from './../../models/project';
import { TrackerDBService } from './../../services/tracker-database';
import { Component} from '@angular/core';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent {

  projectID: number;
  projectName: string;

  constructor(private db: TrackerDBService) { }

  saveProject() {
    const project = new Project();
    project.id = this.projectID;
    project.projectName = this.projectName;
    this.db.saveProject(project).subscribe();
  }
}
