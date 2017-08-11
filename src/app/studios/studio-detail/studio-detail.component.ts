import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { StashService } from '../../core/stash.service';
import { StudiosService } from '../studios.service';

import { Studio } from '../../shared/models/studio.model';

import { SceneListState, CustomCriteria } from '../../shared/models/list-state.model';

@Component({
  selector: 'app-studio-detail',
  templateUrl: './studio-detail.component.html',
  styleUrls: ['./studio-detail.component.css']
})
export class StudioDetailComponent implements OnInit {
  studio: Studio;
  sceneListState: SceneListState;

  constructor(private route: ActivatedRoute, private stashService: StashService, private studioService: StudiosService, private router: Router) { }

  ngOnInit() {
    const id = parseInt(this.route.snapshot.params['id'], 10);
    this.sceneListState = this.studioService.detailsSceneListState;
    this.sceneListState.filter.customCriteria = [];
    this.sceneListState.filter.customCriteria.push(new CustomCriteria('studio_id', id.toString()));

    this.getStudio();
  }

  getStudio() {
    const id = parseInt(this.route.snapshot.params['id'], 10);
    this.stashService.getStudio(id).subscribe(studio => {
      this.studio = studio;
    }, error => {
      console.log(error);
    });
  }

  imagePath(): string {
    if (!!this.studio === false) { return ''; }
    return `${this.stashService.url}${this.studio.image_path}`
  }

  onClickEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

}