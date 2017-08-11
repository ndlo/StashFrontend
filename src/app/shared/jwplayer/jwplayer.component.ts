import { Component, EventEmitter, Input, Output, ElementRef, AfterViewInit } from '@angular/core';

declare var jwplayer: any;

@Component({
  selector: 'app-jwplayer',
  templateUrl: './jwplayer.component.html',
  styleUrls: ['./jwplayer.component.css']
})
export class JwplayerComponent {
  @Input() public title: string;
  @Input() public file: string;
  @Input() public image: string;
  @Input() public height: string;
  @Input() public width: string;
  @Output() public bufferChange: EventEmitter<any> = new EventEmitter();
  @Output() public complete: EventEmitter<any> = new EventEmitter();
  @Output() public buffer: EventEmitter<any> = new EventEmitter();
  @Output() public error: EventEmitter<any> = new EventEmitter<any>();
  @Output() public play: EventEmitter<any> = new EventEmitter<any>();
  @Output() public start: EventEmitter<any> = new EventEmitter<any>();
  @Output() public fullscreen: EventEmitter<any> = new EventEmitter<any>();

  private _player: any = null;

  constructor(private _elementRef: ElementRef) { }

  public get player(): any {
    this._player = this._player || jwplayer(this._elementRef.nativeElement);
    return this._player;
  }

  public setupPlayer(file: string, image?: string, vtt?: string) {
    console.log('uhhh', file, image, this.player)
    this.player.remove();
    this.player.setup({
      file: file,
      image: image,
      tracks: [{
        file: vtt,
        kind: "thumbnails"
      }],
      primary: 'html5',
      autostart: false
    });
    this.handleEventsFor(this.player);
  }

  public handleEventsFor = (player: any) => {
    this.onBufferChange = player.onBufferChange;
    this.onBuffer = player.onBuffer;
    this.onComplete = player.onComplete;
    this.onError = player.onError;
    this.onFullScreen = player.onFullScreen;
    this.onPlay = player.onPlay;
    this.onStart = player.onStart;
  }

  public onComplete = (options: {}) => this.complete.emit(options);

  public onError = () => this.error.emit();

  public onBufferChange = (options: {
    duration: number,
    bufferPercent: number,
    position: number,
    metadata?: number
  }) => this.bufferChange.emit(options);

  public onBuffer = (options: {
    oldState: string,
    newState: string,
    reason: string
  }) => this.buffer.emit();

  public onStart = (options: {
    oldState: string,
    newState: string,
    reason: string
  }) => this.buffer.emit();

  public onFullScreen = (options: {
    oldState: string,
    newState: string,
    reason: string
  }) => this.buffer.emit();

  public onPlay = (options: {
  }) => this.play.emit();
}