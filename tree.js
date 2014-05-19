

function Node(options) {
    this.isTerminal = options.isTerminal || null;
    this.value = options.value;
    if(options.children) {
        this.children = options.children.slice() || null;
    } else {
        this.children = null;
    }

}


function min(node, alpha, beta) {
    console.log("min fired");
    if(node.isTerminal == true) {
        console.log("visited node: "+node.value);
        return node.value;
    }
    
    node.value = 999;
    console.log("alpha = "+alpha+" beta = "+beta+"node.value = "+node.value);
    var i;
    for(i in node.children) {
        var currentNode = node.children[i];
        node.value = Math.min(node.value, max(currentNode, alpha, beta));
        beta = Math.min(beta, node.value);
        //if(node.value >= alpha) {
        //    return node.value;
        //}
    
    }
    return node.value;
}

function alphabeta(node, depth, alpha, beta, isMax) {
    console.log('current value='+node.value);
    if((depth == 0) || (node.isTerminal == true)) {
        return node.value;
    }
    if(isMax) {
        console.log('maximizing');
        for (var i in node.children) {
            console.log('1 child');
            var child = node.children[i];
            console.log(child);
            alpha = Math.max(alpha, alphabeta(child, depth-1, alpha, beta, false));
            if(beta <= alpha) {
                console.log('beta '+beta+' alpha '+alpha);
                break;
            }
        }
        return alpha;
    } else {
        console.log('minimizing');
        for (var i in node.children) {
            console.log('1 child');
            var child = node.children[i];
            console.log(child);
            beta = Math.min(beta, alphabeta(child, depth-1, alpha, beta, true));
            if (beta <= alpha) {
                break;
            }
        }
        return beta;
    }
}