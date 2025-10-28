import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();
cloudinary.config({
  cloud_name: 'valentine1234',
  api_key: '532445472934972',
  api_secret: 'dgL2d09QCdGiVeOKJ_sK0Dfi-9A',
  secure: true,
});
export default cloudinary;
