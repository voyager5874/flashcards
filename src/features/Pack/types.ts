import { FlashcardType } from 'features/Flashcard/types';

export type PackType = {
  id: string;
  name: string;
  flashcardsList: FlashcardType[];
};
