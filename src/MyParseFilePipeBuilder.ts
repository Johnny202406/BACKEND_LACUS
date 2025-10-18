import { HttpStatus, ParseFilePipeBuilder } from '@nestjs/common';

// Nest proporciona una tubería integrada para gestionar casos de uso comunes y facilitar/estandarizar la adición de nuevos.
// Esta tubería se llama ParseFilePipey se puede usar de la siguiente manera:
export const MyParseFilePipeBuilder = new ParseFilePipeBuilder()
  .addFileTypeValidator({
    fileType: /^image\//,
  })
  .addMaxSizeValidator({
    maxSize: 1024 * 1024 * 0.2,
  })
  .build({
    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  });
