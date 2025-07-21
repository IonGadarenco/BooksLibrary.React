import type { Author } from "../author";
import type { Category } from "../category";
import type { Publisher } from "../publisher";

export interface EditBookDto {
  id: number;
  title: string;
  isbn: string;
  authors: Author[];
  totalCopies: number;
  image: File | null;
  description?: string;
  categories: Category[];
  publisher: Publisher;
  deleteExistingCoverImage?: boolean;
}
