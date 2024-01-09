import { Router } from 'express';
import { AlumniController } from '../controllers/test/AlumniController';

export class TestRoutes {
  public router: Router;
  public alumniController: AlumniController = new AlumniController();

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get('/alumni', this.alumniController.getAllAlumni);
    this.router.put('/test/:alumniId', this.alumniController.updateAlumni);
    this.router.post('/test', this.alumniController.createAlumni);
  }
}
