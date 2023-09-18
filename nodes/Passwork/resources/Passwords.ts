export type PathItem = {
	id: string;
	name: string;
	type: 'vault' | 'folder' | 'inbox';
	order: number;
};

export type Path = PathItem[];

export type Password = {
	vaultId: string;
	id: string;
	login: string;
	name: string;
	tags: [string];
	url: string;
	path: Path;
	color: number;
	fromInbox: boolean;
	inboxId: string;
};
