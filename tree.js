

function Node(options) {
    this.name = options.name;
    this.isTerminal = options.isTerminal || null;
    this.value = options.value;
    if(options.children) {
        this.children = options.children.slice() || null;
    } else {
        this.children = null;
    }

}

function alphabeta(node, depth, alpha, beta, isMax, g) {
    if((depth == 0) || (node.isTerminal == true)) {
        return node.value;
    }
    if(isMax) {
        console.log('maximizing');
        for (var i in node.children) {
            var child = node.children[i];
            console.log(child);
            alpha = Math.max(alpha, alphabeta(child, depth-1, alpha, beta, false, g));
            if(beta <= alpha) {
                console.log('beta '+beta+' alpha '+alpha);
                break;
            }
        }

        g.nodes[node.name].shape.items["1"].attr("text", alpha);
        return alpha;
    } else {
        console.log('minimizing');
        for (var i in node.children) {
            console.log('1 child');
            var child = node.children[i];
            console.log(child);
            beta = Math.min(beta, alphabeta(child, depth-1, alpha, beta, true, g));
            if (beta <= alpha) {
                console.log('beta '+beta+' alpha '+alpha);
                break;
            }
        }
        
        g.nodes[node.name].shape.items["1"].attr("text", beta);
        return beta;
    }
}