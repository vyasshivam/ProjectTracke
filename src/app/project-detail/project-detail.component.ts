import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { AccordionModule } from 'ngx-accordion';

import 'rxjs/add/operator/switchMap';

import { TrackerDBService } from '../../services/tracker-database';
import { Project } from 'models/project';
import { ProjectDetail } from 'models/projectDetail';
@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'];
  projectName: string;
  id = 0;
  title = 'Tracker';
  project: string;
  details: any;
  newDetails: string;
  months: any;
  dateData: any;
  currentMonth: number;
  currentDate: any;
  projectDetails: any;

  constructor(private trackerService: TrackerDBService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    const a = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.getProject();
      this.getProjectDetails(this.id);
    })
  }

  getProject() {
    this.trackerService.getAllProjects().subscribe(projectList => { this.projectName = projectList.find((item) => { return item.id == this.id; }).projectName },
      error => alert(<any>error)
    )
  }

  getProjectDetails(id) {
    this.trackerService.getProjectDetails(id).subscribe(projectDetails => {
          this.projectDetails = projectDetails;
          this.currentMonth = new Date().getMonth() + 1;
          this.currentDate = new Date().toDateString();
          this.getDetails(this.currentDate);
          this.refreshData();
        })
  }

  refreshData() {
    this.months = this.projectDetails.map(item => new Date(item.datetime).getMonth() + 1).filter((el, i, a) => i === a.indexOf(el));
    this.dateData = this.months.map(item => {
      const robj = {
        m: item.toString(),
        d: this.projectDetails.filter(items => {
          if ((new Date(items.datetime).getMonth() + 1) === item) {
            return new Date(items.datetime).toString();
          }
        }).map(items => new Date(items.datetime).toDateString()).filter((el, i, a) => i === a.indexOf(el))
      };
      return robj;
    });
  }

  getDetails(date) {
    this.currentDate = date;
    this.details = this.projectDetails.filter(item => new Date(item.datetime).toDateString() === date);
  }

  save() {
    let obj = new ProjectDetail();
    obj.id = 0;
    obj.details = this.newDetails;
    obj.projectID = this.id;
    obj.datetime = new Date();
    this.projectDetails.push(obj);
    this.newDetails = '';
    this.refreshData();
    this.getDetails(new Date().toDateString());

    this.trackerService.saveProjectDetail(obj).subscribe(
      item => { console.log('Saved'); }
    );
  }
  getMonth(month: number) {
    return this.monthNames[month - 1];
  }
}
