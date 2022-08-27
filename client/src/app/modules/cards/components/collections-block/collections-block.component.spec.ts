import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionsBlockComponent } from './collections-block.component';

describe('CollectionsBlockComponent', () => {
  let component: CollectionsBlockComponent;
  let fixture: ComponentFixture<CollectionsBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionsBlockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionsBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
