import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { StashService } from '../../core/stash.service';

import { Gallery, GalleryImage } from '../../shared/models/gallery.model';

@Component({
  selector: 'app-gallery-detail',
  templateUrl: './gallery-detail.component.html',
  styleUrls: ['./gallery-detail.component.css']
})
export class GalleryDetailComponent implements OnInit {
  gallery: Gallery;
  displayedImage: GalleryImage = null;

  constructor(private route: ActivatedRoute,
              private stashService: StashService,
              private router: Router) {}

  ngOnInit() {
    this.getGallery();
    window.scrollTo(0, 0);
  }

  getGallery() {
    const id = parseInt(this.route.snapshot.params['id'], 10);
    this.stashService.getGallery(id).subscribe(gallery => {
      this.gallery = gallery;
    }, error => {
      console.log(error);
    });
  }

  imagePath(): string {
    return `${this.stashService.url}${this.displayedImage.path}`
  }

  onClickEdit() {
    // TODO
    console.log('edit');
  }

  onClickCard(galleryImage: GalleryImage) {
    console.log(galleryImage);
    this.displayedImage = galleryImage;
  }

  onClickClose() {
    console.log('close')
    this.displayedImage = null;
  }

  onKey(event) {
    const i = this.displayedImage.index;
    console.log(event);

    switch (event.key) {
      case 'ArrowLeft': {
        this.displayedImage = this.gallery.files[i - 1];
        break;
      }

      case 'ArrowRight': {
        this.displayedImage = this.gallery.files[i + 1];
        break;
      }
    
      default:
        break;
    }

    event.preventDefault();
  }

}
