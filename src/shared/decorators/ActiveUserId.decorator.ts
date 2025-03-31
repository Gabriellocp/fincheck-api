import { createParamDecorator, UnauthorizedException } from "@nestjs/common";

export const ActiveUserId = createParamDecorator<never>((_, context) => {
    const request = context.switchToHttp().getRequest()
    const userId = request.userId
    if (!userId) {
        throw new UnauthorizedException()
    }
    return userId
})