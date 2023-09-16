import {
	IAuthenticateGeneric,
	ICredentialDataDecryptedObject,
	ICredentialTestRequest,
	ICredentialType,
	IHttpRequestHelper,
	INodeProperties,
} from 'n8n-workflow';

type AuthLoginResponse = {
	status: string;
	data: {
		token: string;
		refreshToken: string;
		tokenTtl: number;
		refreshTokenTtl: number;
		tokenExpiredAt: number;
		refreshTokenExpiredAt: number;
		user: {
			name: string;
			email: string;
			avatar: string;
		};
	};
};

export class PassworkApi implements ICredentialType {
	displayName = 'Passwork API';
	documentationUrl = 'https://passwork.notion.site/API-4-313e9b08a56f4167bcb3fd47b82e84ff';
	name = 'passworkApi';
	properties: INodeProperties[] = [
		{
			displayName: 'Session Token',
			name: 'sessionToken',
			type: 'hidden',

			typeOptions: {
				expirable: true,
			},
			default: '',
		},
		{
			displayName: 'API endpoint',
			name: 'endpoint',
			type: 'string',
			default: 'https://passwork.me/api/v4',
		},
		{
			displayName: 'API key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
	];

	async preAuthentication(this: IHttpRequestHelper, credentials: ICredentialDataDecryptedObject) {
		const response = (await this.helpers.httpRequest({
			method: 'POST',
			baseURL: credentials.endpoint as string,
			url: `/auth/login/${credentials.apiKey}`,
		})) as AuthLoginResponse;

		console.log('preAuthentication', 'sessionToken received');

		return { sessionToken: response.data.token };
	}

	test: ICredentialTestRequest = {
		request: {
			method: 'GET',
			baseURL: '={{$credentials.endpoint}}',
			url: '/user/info',
		},
	};

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'Passwork-Auth': '={{$credentials.sessionToken}}',
			},
		},
	};
}
