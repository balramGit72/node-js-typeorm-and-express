import { Request, Response } from 'express';
import { getConnection, getRepository } from 'typeorm';
import { User } from '../entities/User';
import { generateAuthToken } from '../middleware/authMiddleware';

export class UserController {

    async getAllUsers(req: Request, res: Response) {
        try {
          const userRepository = getRepository(User);
          const users = await userRepository.find();
          res.json(users);
        } catch (error) {
          console.error('Error fetching users:', error);
          res.status(500).json({ message: 'Internal server error' });
        }
      }

      async createUser(req: Request, res: Response) {
        const queryRunner = getConnection().createQueryRunner();
    
        try {
          console.log('Creating user...');
          const userRepository = getRepository(User);
          const newUser = userRepository.create(req.body);
    
          await queryRunner.connect();
          await queryRunner.startTransaction();
    
          console.log('Saving newUser...');
          await userRepository.save(newUser);
    
          // Commit the transaction
          await queryRunner.commitTransaction();
    
          console.log('User creation completed successfully.');
          res.status(201).json(newUser);
        } catch (error) {
          console.error('Error creating user:', error);
    
          // Roll back the transaction on error
          await queryRunner.rollbackTransaction();
    
          res.status(500).json({ message: 'Internal server error' });
        } finally {
          console.log('Releasing query runner...');
          // Release the query runner
          await queryRunner.release();
        }
      }


      async login(req: Request, res: Response) {
        try {
          // Check user credentials and get userId
          const userId = req.body['userId']; // Replace with actual user ID
    
          const token = generateAuthToken(userId);
          res.json({ token });
        } catch (error) {
          console.error('Error during login:', error);
          res.status(500).json({ message: 'Internal server error' });
        }
      }


      async getProfile(req: Request, res: Response) {
        try {
          // Access user information from the decoded token
          const id = req.body['user'].userId;
    
          const userRepository = getRepository(User);
          const user = await userRepository.findOne({ where: { id } });
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
          res.json(user);
        } catch (error) {
          console.error('Error fetching user profile:', error);
          res.status(500).json({ message: 'Internal server error' });
        }
      }
}
