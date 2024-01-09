import { Request, Response } from 'express';
import { validate } from 'class-validator';

import { AppDataSource } from '../../../data-source';
import { Alumni } from '../../entity/Alumni.entity';

export class AlumniController {
  getAllAlumni = async (req: Request, res: Response) => {
    try {
      const alumniRepository = AppDataSource.getRepository(Alumni);
      const alumni = await alumniRepository.createQueryBuilder('alumni').getMany();

      res.status(200).send({
        success: true,
        message: 'Thankyou, all alumni fetched.',
        data: alumni,
      });
    } catch (error) {
      console.error(`getAllAlumni error [${new Date().toString()}]:  ${error}`);
      res.status(404).send({
        success: false,
        message: 'Error in alumni fetch, please try after sometime.',
        data: [],
      });
    }
  };

  createAlumni = async (req: Request, res: Response) => {
    // const { docUrl, fileName } = req.body;
    const docUrl = req.body.docUrl;
    const fileName = req.body.fileName;

    try {
      const newAlumni = new Alumni();

      newAlumni.docUrl = docUrl;
      newAlumni.fileName = fileName;

      const errors = await validate(newAlumni);
      if (errors.length > 0) {
        res.status(409).send({
          success: false,
          message: 'Alumni details invalid, please try correcting.',
          data: {},
        });
        return;
      }
      // await alumniRepository.save(newAlumni);
      await AppDataSource.manager.save(newAlumni);

      res.status(200).send({
        success: true,
        message: 'Alumni created successfuly.',
        data: newAlumni,
      });
    } catch (e) {
      console.error(`create Alumni error [${new Date().toString()}]:  ${e}`);
      const errorMessage =
        'Server error, could not create Alumni, please try after sometime.';

      res.status(409).send({
        success: false,
        message: errorMessage,
        data: {},
      });
    }
  };

  updateAlumni = async (req: Request, res: Response) => {
    const { docUrl, fileName } = req.body;
    const alumniId = req.params.alumniId;
    try {
      const alumniRepository = AppDataSource.getRepository(Alumni);
      const updatedAlumni = await alumniRepository
        .createQueryBuilder('alum')
        .where('alum.id =:alumniId', { alumniId: alumniId })
        .getOneOrFail();

      if (docUrl) updatedAlumni.docUrl = docUrl;
      if (fileName) updatedAlumni.fileName = fileName;

      await AppDataSource.manager.save(updatedAlumni);

      res.status(200).send({
        success: true,
        message: 'Thankyou, alumni updated successfully.',
        data: updatedAlumni,
      });
    } catch (e) {
      console.error(`updateAlumni error [${new Date().toString()}]:  ${e}`);
      const errorMessage =
        'Server error, could not update alumni, please try after sometime.';
      res.status(409).send({
        success: false,
        message: errorMessage,
        data: {},
      });
      return;
    }
  };
}
