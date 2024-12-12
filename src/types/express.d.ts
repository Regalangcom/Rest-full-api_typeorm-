// src/express.d.ts
import { User } from './entities/User-identity';

declare global {
  namespace Express {
    interface Request {
      currentUsers: User; // Menambahkan currentUsers dengan tipe User
    }
  }
}
