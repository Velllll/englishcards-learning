import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionsSkeletonComponent } from './collections-skeleton.component';

describe('CollectionsSkeletonComponent', () => {
  let component: CollectionsSkeletonComponent;
  let fixture: ComponentFixture<CollectionsSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionsSkeletonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionsSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
