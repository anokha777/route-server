import { Router } from 'express';
import { TestRoutes } from './test';

export class ApplicationRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.use('/', new TestRoutes().router);
  }
}
