import { Scene } from './scene.model';
import { Performer } from './performer.model';
import { Studio } from './studio.model';
import { Gallery } from './gallery.model';

export enum DisplayMode {
  Grid,
  List
}

export enum FilterMode {
  Scenes,
  Performers,
  Studios,
  Galleries
}

export class CustomCriteria {
  key: string;
  value: string;
  constructor(key: string, value: string) {
    this.key = key;
    this.value = value;
  }
}

export enum CriteriaType {
  None,
  Rating,
  Resolution,
  Favorite
}

export class CriteriaOption {
  name: string;
  value: CriteriaType;
  constructor(type: CriteriaType) {
    this.name = CriteriaType[type]
    this.value = type
  }
}

export class Criteria {
  type: CriteriaType;
  options: any[];
  parameterName: string;
  value: string;
}

export class ListFilter {
  searchTerm?: string;
  performers?: number[];
  itemsPerPage = 20;
  sortDirection = 'asc';
  sortBy: string;
  displayMode = DisplayMode.Grid;
  filterMode: FilterMode;
  sortByOptions: string[];
  criteriaFilterOpen = false;
  criterions: CriteriaOption[];
  criteria: Criteria = new Criteria();
  customCriteria: CustomCriteria[] = [];

  configureForFilterMode(filterMode: FilterMode) {
    switch (filterMode) {
      case FilterMode.Scenes:
        if (!!this.sortBy === false) { this.sortBy = 'date'; }
        this.sortByOptions = ['title', 'rating', 'date'];
        this.criterions = [
          new CriteriaOption(CriteriaType.None),
          new CriteriaOption(CriteriaType.Rating),
          new CriteriaOption(CriteriaType.Resolution)
        ];
        break;
      case FilterMode.Performers:
        if (!!this.sortBy === false) { this.sortBy = 'name'; }
        this.sortByOptions = ['name', 'height'];
        this.criterions = [
          new CriteriaOption(CriteriaType.None),
          new CriteriaOption(CriteriaType.Favorite)
        ];
        break;
      case FilterMode.Studios:
        if (!!this.sortBy === false) { this.sortBy = 'name'; }
        this.sortByOptions = ['name'];
        this.criterions = [
          new CriteriaOption(CriteriaType.None)
        ];
        break;
      case FilterMode.Galleries:
        if (!!this.sortBy === false) { this.sortBy = 'title'; }
        this.sortByOptions = ['title', 'path'];
        this.criterions = [
          new CriteriaOption(CriteriaType.None)
        ];
        break;
      default:
        this.sortByOptions = [];
        this.criterions = [new CriteriaOption(CriteriaType.None)];
        break;
    }
  }

  configureCriteriaType(type: CriteriaType) {
    switch (type) {
      case CriteriaType.None: {
        this.criteria.type = CriteriaType.None;
        this.criteria.options = [];
        break;
      }
      case CriteriaType.Rating: {
        this.criteria.type = CriteriaType.Rating;
        this.criteria.parameterName = 'rating';
        this.criteria.options = [1, 2, 3, 4, 5];
        break;
      }
      case CriteriaType.Resolution: {
        this.criteria.type = CriteriaType.Resolution;
        this.criteria.parameterName = 'resolution'
        this.criteria.options = ['240p', '480p', '720p', '1080p', '4k'];
        break;
      }
      case CriteriaType.Favorite: {
        this.criteria.type = CriteriaType.Favorite;
        this.criteria.parameterName = 'filter_favorites'
        this.criteria.options = ['true', 'false'];
        break;
      }
      default: {
        this.criteria.type = CriteriaType.None;
        this.criteria.options = [];
      }
    }

    this.criteria.value = null;
  }
}

export class ListState<T> {
  currentPage = 1;
  totalCount: number;
  errorMessage: string;
  scrollY: number;
  filter: ListFilter = new ListFilter();
  data: T[];

  update(state: ListState<T>) {
    // TODO: improve this...
    this.currentPage = state.currentPage;
    this.scrollY = state.scrollY;
    this.filter.searchTerm = state.filter.searchTerm;
    this.filter.itemsPerPage = state.filter.itemsPerPage;
    this.filter.sortDirection = state.filter.sortDirection;
    this.filter.sortBy = state.filter.sortBy;
    this.filter.displayMode = state.filter.displayMode;
    this.filter.criteriaFilterOpen = state.filter.criteriaFilterOpen;
    this.filter.customCriteria = state.filter.customCriteria;
  }
}

export class SceneListState extends ListState<Scene> {
  constructor() {
    super();
    this.filter.filterMode = FilterMode.Scenes;
  }
}

export class PerformerListState extends ListState<Performer> {
  constructor() {
    super();
    this.filter.filterMode = FilterMode.Performers;
  }
}

export class StudioListState extends ListState<Studio> {
  constructor() {
    super();
    this.filter.filterMode = FilterMode.Studios;
  }
}

export class GalleryListState extends ListState<Gallery> {
  constructor() {
    super();
    this.filter.filterMode = FilterMode.Galleries;
  }
}
