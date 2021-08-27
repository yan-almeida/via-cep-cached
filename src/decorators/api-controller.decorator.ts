import { Controller } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export function ApiController(controllerName: string): ClassDecorator {
  return function (target): void {
    Controller(controllerName)(target);
    ApiTags(controllerName)(target);

    ApiBadRequestResponse({
      description: 'Erro de validação, por parte do cliente.',
    })(target);
    ApiNotFoundResponse({ description: 'Nenhum dado encontrado.', type: null })(
      target,
    );
    ApiUnauthorizedResponse({
      description: 'Usuário não autenticado.',
    })(target);
    ApiConflictResponse({
      description: 'Dado já existente.',
    })(target);
    ApiInternalServerErrorResponse({
      description: 'Erro de execução do servidor.',
    })(target);
  };
}
