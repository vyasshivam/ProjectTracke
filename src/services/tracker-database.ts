import { Project } from './../models/project';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Headers, RequestOptions } from '@angular/http';
import { ProjectDetail } from 'models/projectDetail';

@Injectable()
export class TrackerDBService {
    url='';

    constructor(private http: Http) { }

    getAllProjects(): Observable<Project[]> {
        return this.http.get(`${this.url}getProjectName`)
            .map(response => response.json());
    }

    getProjectDetails(id: number): Observable<Project[]> {
        return this.http.get(`${this.url}getProjectDetails?id=${id}`)
            .map(response => response.json());
    }

    saveProject(project: Project): Observable<string> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return this.http.post(`${this.url}saveProjectName`, project,options).map(r=>r.json());
    }

    saveProjectDetail(projectDetail: ProjectDetail): Observable<string> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });        
        return this.http.post(`${this.url}saveProjectDetails`,projectDetail, options)
                    .map(r => r.json());
    }

}
