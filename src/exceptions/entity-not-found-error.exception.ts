import { HttpException, HttpStatus } from '@nestjs/common';

export class EntityNotFoundError extends HttpException {
  constructor(entityClassName: any, criterio?: any) {
    super(
      criterio
        ? `Nenhum dado encontrado na entidade ${entityClassName.name}. Criterio: ${criterio}`
        : `Nenhum dado encontrado na entidade ${entityClassName.name}.`,

      HttpStatus.NOT_FOUND,
    );
  }
}
