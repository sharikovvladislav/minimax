function Node(options) {
    this.isMin = options.isMin || null;
    this.isMax = options.isMax || null;
    this.isTerminal = options.isTerminal || null;
    this.value = options.value;
    this.depth = options.depth;
    if(options.children) {
        this.children = options.children.slice() || null;
    }
}

function alphaBeta(node) {
    node.value = max(node, -999, 999);
    console.log(node.value);
}

function max(node, alpha, beta) {
    //console.log("max fired");
    if(node.isTerminal) {
        console.log("visited node: "+node.value);
        return node.value;
    }
    
    node.value = -999;
    
    for(var i in node.children) {
        var currentNode = node.children[i];
        node.value = Math.max(node.value, min(currentNode, alpha, beta));
        alpha = Math.max(alpha, node.value);
        if(node.value >= alpha) {
            return node.value;
        }
    }
    return node.value;
}

function min(node, alpha, beta) {
    //console.log("min fired");
    if(node.isTerminal) {
        console.log("visited node: "+node.value);
        return node.value;
    }
    
    node.value = 999;
    
    for(var i in node.children) {
        var currentNode = node.children[i];
        node.value = Math.min(node.value, max(currentNode, alpha, beta));
        beta = Math.min(beta, node.value);
        if(node.value >= beta) {
            return node.value;
        }

    }
    return node.value;
}