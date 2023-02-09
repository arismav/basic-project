import { createFeatureSelector } from '@ngrx/store';
import { IEntry } from 'src/app/models/entry.model';
 
export const selectEntries = createFeatureSelector<IEntry[]>('myentries');