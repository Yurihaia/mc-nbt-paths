export const nbtDocs: { [key: string]: NBTNode | ValueList };

export interface NBTFunction {
	id: string;
	params: any;
}

export interface NodeBase {
	readonly description?: string;
	readonly references?: { [key: string]: any };
	readonly suggestions?: Array<
		| string
		| { description?: string; value: string }
		| { function: NBTFunction }
	>;
}

export interface NoPropertyNode extends NodeBase {
	readonly type:
		| "no-nbt"
		| "byte"
		| "short"
		| "int"
		| "long"
		| "float"
		| "double"
		| "byte_array"
		| "string"
		| "int_array"
		| "long_array";
}

export interface RefNode extends NodeBase {
	readonly ref: string;
}

export interface FunctionNode extends NodeBase {
	readonly function: NBTFunction;
}

export interface ListNode extends NodeBase {
	readonly item: NBTNode;
	readonly type: "list";
}

export interface CompoundNode extends NodeBase {
	readonly child_ref?: string[];
	readonly children?: { [key: string]: NBTNode };
	readonly type: "compound";
	readonly additionalChildren?: boolean;
}

export interface RootNode extends NodeBase {
	readonly children: { [key: string]: NBTNode };
	readonly type: "root";
}

export type ValueList = Array<string | { description: string; value: string }>;

export type NBTNode =
	| NoPropertyNode
	| CompoundNode
	| RootNode
	| ListNode
	| RefNode
	| FunctionNode;
