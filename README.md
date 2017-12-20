# NBT Docs

This repo is basically JSON Schema but for NBT. the format is as following  

Node:  

type: STRING. An NBT tag type or `root`.  
ref: STRING. A URI to another file. in the form of `*file path*#*node path in file*`. The `#` and anything after is optional  
child_ref: LIST. A List of refrences to add to the child if `type` is "compound"  
&nbsp &nbsp \*: STRING. A URI like *ref*  
children: OBJECT. The sub nodes in `type` is "compound"  
&nbsp &nbsp **a node**: OBJECT. A child node. See *Node*  
item: OBJECT. The object type if `type` is "list". See *Node*  
