import { Inject, Injectable } from '@nestjs/common';
import supertokens from 'supertokens-node';
import Session from 'supertokens-node/recipe/session';
import ThirdParty from 'supertokens-node/recipe/thirdparty';

import { ConfigInjectionToken, AuthModuleConfig } from '../config.interface';
import { ConfigService } from '@nestjs/config';
import Dashboard from 'supertokens-node/recipe/dashboard';
import UserRoles from 'supertokens-node/recipe/userroles';
import { RoleService } from 'src/role/role.service';
@Injectable()
export class SupertokensService {
  constructor(
    @Inject(ConfigInjectionToken)
    private config: AuthModuleConfig,
    private configService: ConfigService,
    private roleService: RoleService,
  ) {
    supertokens.init({
      appInfo: config.appInfo,
      supertokens: {
        connectionURI: config.connectionURI,
        apiKey: config.apiKey,
      },
      recipeList: [
        ThirdParty.init({
          signInAndUpFeature: {
            providers: [
              ThirdParty.Google({
                clientId: configService.get('GOOGLE_CLIENT_ID'),
                clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
              }),
            ],
          },
          override: {
            apis: (originalImplementation) => {
              return {
                ...originalImplementation,
                signInUpPOST: async function (input) {
                  if (originalImplementation.signInUpPOST === undefined) {
                    throw Error('Should never come here');
                  }
                  // First we call the original implementation of signInUpPOST.
                  const response = await originalImplementation.signInUpPOST(
                    input,
                  );
                  // Post sign up response, we check if it was successful
                  if (response.status === 'OK') {
                    const { id, email } = response.user;

                    // This is the response from the OAuth 2 provider that contains their tokens or user info.
                    const thirdPartyAuthCodeResponse =
                      response.authCodeResponse;
                    // console.log(
                    //   '🚀 ~ file: supertokens.service.ts:51 ~ SupertokensService ~ thirdPartyAuthCodeResponse:',
                    //   thirdPartyAuthCodeResponse,
                    // );
                    // console.log(response);
                    if (response.createdNewUser) {
                      // TODO: Post sign up logic
                      roleService.addRoleToUser(id, 'free');
                    } else {
                      const roles = await roleService.getRolesForUser(id);
                      // If user does not contain role
                      // add default 'free' role
                      if (roles.length == 0) {
                        roleService.addRoleToUser(id, 'free');
                      }
                    }
                  }
                  return response;
                },
              };
            },
          },
        }),
        Session.init({
          exposeAccessTokenToFrontendInCookieBasedAuth: false,
        }),
        UserRoles.init(),
        Dashboard.init(),
      ],
    });
  }
}
