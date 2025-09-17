import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { config } from '../../../../shared/infrastructure/config/environment.config';

export interface GoogleProfile {
  sub: string; // Google user id
  email: string;
  name?: string;
  picture?: string;
  email_verified?: boolean;
}

export class GoogleAuthService {
  private client: OAuth2Client;

  constructor() {
    this.client = new OAuth2Client({
      clientId: config.google.clientId,
      clientSecret: config.google.clientSecret,
      redirectUri: config.google.redirectUri,
    });
  }

  getAuthUrl(scopes: string[] = ['openid', 'email', 'profile']): string {
    const url = this.client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      include_granted_scopes: true,
      prompt: 'consent',
    });
    return url;
  }

  async verifyIdToken(idToken: string): Promise<GoogleProfile> {
    const ticket = await this.client.verifyIdToken({
      idToken,
      audience: config.google.clientId,
    });
    const payload = ticket.getPayload() as TokenPayload | undefined;
    if (!payload || !payload.sub || !payload.email) {
      throw new Error('Token de Google inválido');
    }
    return {
      sub: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
      email_verified: payload.email_verified,
    };
  }

  async exchangeCodeForTokens(code: string) {
    const { tokens } = await this.client.getToken(code);
    return tokens;
  }
}
