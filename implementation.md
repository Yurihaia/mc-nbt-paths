# Implementation specs

## General Nodes

A node is a JSON object. The format is fully specified in `schema.json` under `#/defintions/nest_node`. Each node specifies one of:
- An NBT tag along with suggestions & a description
- A reference to another node
- A reference function

## NBT Nodes

An NBT nodes always has the property `type`. `type` is one of
- `root`
- `no-nbt`
- `byte`
- `short`
- `int`
- `long`
- `float`
- `double`
- `byte_array`
- `string`
- `list`
- `compound`
- `int_array`
- `long_array`

### Root nodes

Root nodes are not actual NBT tags, but they act like it. Root nodes are used in root files, like `blocks.json` & `root.json`.  
  
In `root.json`, the root tag just contains references to `blocks.json`, `items.json`, & `entities.json` with the properties `block`, `item`, & `entity` respectively.  
  
In `blocks.json` (or the others), the children tag contains the IDs of the NBT holder (like an entity id or item id).  
  
Root tags have a special parsing feature. If one of their children starts with a `$`, the rest of the child is a path. That path points to a JSON file that contains an array of either strings or objects with `value` & `description` (the value is like the string if you strings in that array). All of the value of the child is assigned to all of the values in that list.  
  
(IE if you have `["minecraft:chest", "minecraft:dispenser"]` as file `foo.json`, then has the child `"$./foo.json": {"type": "no-nbt"}`, `{"type": "no-nbt"}` would be assigned to chest & dispenser)

## Reference Nodes

A reference node is a node containing a path to another node. The index in the walker path should not advance when getting the node specified.  
  
A reference is a posix-style path with an optional fragment. The fragment is also a posix-style path (no fragment though). This tells what node in the file to get. The index should not advance when reading though the fragment path

## Function Nodes

Function come in two varieties: Reference & Suggestion functions.
Both functions have the same format, but different locations.  
Functions have two properties: `id` & `params`. `id` is the ID of the function, and `params` are an object containing parameters for the function.

### Reference Functions

All reference functions should be implemented, as they are vital to walking the node tree.
These nodes should be implemented by calling the function based on `id`, then getting the node referenced with the same code used to get the node from a node with `ref: "..."`

- `insertStringNBT`: inserts a string based on NBT
	params: 
	- `ref`: a format string (like printf) for the string in the NBT to be inserted
	- `default`: a default path (no format) for the function to use in case
		- the tag specified by `tag_path` is not defined
		- the tag specified by `tag_path` is not a string
	- `tag_path`: The path of the NBT tag (using a posix-like path)

### Suggestion Functions

Suggestion functions are optional to implement. To get good results, return an empty array for undefined functions

- `itemList`: Gets a list of all item ids
	params: none
- `blockList`: Get a list of all block ids
	params: none
- `entityList`: Get a list of all entity ids
	params: none
