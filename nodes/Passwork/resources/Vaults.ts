import { ILoadOptionsFunctions, INodeListSearchResult } from 'n8n-workflow';
import { apiRequest } from '../GenericFunctions';

type ApiResponse<T> = {
	status: string;
	data: T;
};

type Vault = {
	id: string;
	name: string;
	access: string;
	scope: string;
	visible: boolean;
	foldersAmount: number;
	passwordsAmount: number;
};

export async function searchVaults(
	this: ILoadOptionsFunctions,
	query?: string,
): Promise<INodeListSearchResult> {
	const searchResults = (await apiRequest.call(this, 'GET', '/vaults/list', {})) as ApiResponse<
		Vault[]
	>;

	const vaults = searchResults.data
		.map((w: Vault) => ({
			name: `${w.name} (#${w.id})`,
			value: w.id,
		}))
		.filter(
			(w) =>
				!query ||
				w.name.toLowerCase().includes(query.toLowerCase()) ||
				w.value?.toString() === query,
		)
		.sort((a, b) => {
			const nameA = a.name.toUpperCase(); // ignore upper and lowercase
			const nameB = b.name.toUpperCase(); // ignore upper and lowercase
			if (nameA < nameB) {
				return -1;
			}
			if (nameA > nameB) {
				return 1;
			}

			// names must be equal
			return 0;
		});

	return {
		results: vaults,
	};
}
