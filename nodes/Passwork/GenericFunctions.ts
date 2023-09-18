import type {
	IDataObject,
	IExecuteFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
	JsonObject,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';
import type { OptionsWithUri } from 'request';
import {
	PassworkApiCredentials,
	passworkApiCredentialsName,
} from '../../credentials/PassworkApi.credentials';

export async function apiRequest<Type>(
	this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
	method: string,
	endpoint: string,
	body: object,
	query?: IDataObject,
): Promise<Type> {
	query = query || {};

	const credentials = (await this.getCredentials(
		passworkApiCredentialsName,
	)) as PassworkApiCredentials;
	const baseUrl = credentials.baseUrl;

	const options: OptionsWithUri = {
		method,
		body,
		qs: query,
		uri: `${baseUrl.replace(new RegExp('/$'), '')}${endpoint}`,
		json: true,
	};

	try {
		return await this.helpers.requestWithAuthentication.call(
			this,
			passworkApiCredentialsName,
			options,
		);
	} catch (error) {
		if (error instanceof NodeApiError) {
			throw error;
		}
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}
