export type ApiResponse<T> = {
	status: string;
	data: T;
};

export type Vault = {
	id: string;
	name: string;
	access: string;
	scope: string;
	visible: boolean;
	foldersAmount: number;
	passwordsAmount: number;
};

export type PathItem = {
	id: string;
	name: string;
	type: 'vault' | 'folder' | 'inbox';
	order: number;
};

export type Path = PathItem[];

export type PasswordCustomField = {
	name: string;
	value: string;
	type: string;
};

export type PasswordAttachment = {
	name: string;
	id: string;
	encryptedKey: string;
	hash: string;
	encryptedData: string;
	data: Uint8Array;
};

export type Password = {
	vaultId: string;
	id: string;
	login: string;
	name: string;
	cryptedPassword: string;
	password: string;
	url: string;
	path: Path;
	color: number;
	fromInbox: boolean;
	inboxId: string;
	tags: [string];
	isFavorite: boolean;
	access: string;
	accessCode: number;
	custom: PasswordCustomField[];
	attachments: PasswordAttachment[];
};
