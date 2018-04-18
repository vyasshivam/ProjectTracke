import { TrackerDBService } from './../../services/tracker-database';
import { Component, OnInit } from '@angular/core';

import { Project } from 'models/project';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  projectList: Array<Project>;
  constructor(private trackerService: TrackerDBService) { }

  ngOnInit() {
    this.getProject();
  }

  getProject() {
    this.trackerService.getAllProjects().subscribe( projectList => this.projectList = projectList,
      error => alert(<any>error)
      )
  }
}
