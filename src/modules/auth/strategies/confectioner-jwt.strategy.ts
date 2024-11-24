import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Environment } from '../../../envoriment';
import { JwtPayloadDto } from '../dto/jwt-payload.dto';

@Injectable()
export class ConfectionerJwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const secretKey = Environment.jwt.secret;
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secretKey,
    });
  }

  async validate(payload: JwtPayloadDto) {
    return payload;
  }
}
