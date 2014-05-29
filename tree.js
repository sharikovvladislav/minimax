

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
    g.nodes[node.name].shape.items['0'].attr('fill', 'green');

    if((depth == 0) || (node.isTerminal == true)) {
		console.log('getting value from terminal node '+node.name+' (value is '+node.value+')');
        return node.value;
    }
    if(isMax) {
        console.log('maximizing ('+node.name+')');

        for (var i in node.children) {
            var child = node.children[i];
            alpha = Math.max(alpha, alphabeta(child, depth-1, alpha, beta, false, g));
			console.log('alpha value is set to '+alpha);
            if(beta <= alpha) {
				console.log('beta cut-off ('+beta+'<='+alpha+'), others children of '+g.nodes[node.name].parent+' wouldn\'t be visited');
                break;
            }
        }

        g.nodes[node.name].shape.items['1'].attr('text', alpha);
		g.nodes[node.name].shape.items['0'].attr('fill', 'blue');

        node.value = alpha;

		console.log('returning alpha, node '+node.name+' value is set as '+node.value);
		console.log('going back to node '+g.nodes[node.name].parent)
        return alpha;
    } else {
        console.log('minimizing ('+node.name+')');

        for (var i in node.children) {
            var child = node.children[i];
            beta = Math.min(beta, alphabeta(child, depth-1, alpha, beta, true, g));
			console.log('beta value is set to '+beta);
            if (beta <= alpha) {
                //console.log('beta '+beta+' alpha '+alpha);
				console.log('alpha cut-off ('+beta+'<='+alpha+'), others children of '+g.nodes[node.name].parent+' wouldn\'t be visited');
                break;
            }
        }
        
		g.nodes[node.name].shape.items['0'].attr('fill', 'red');
        g.nodes[node.name].shape.items['1'].attr('text', beta);

        node.value = beta;

		console.log('returning beta, node '+node.name+' value is set as '+node.value);
		console.log('going back to node '+g.nodes[node.name].parent);
        return beta;
    }
}