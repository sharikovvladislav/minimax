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
		var maximum = -999;
        var maxArray = [];
        for (var i in node.children) {
            var child = node.children[i];
            //console.log(g.nodes[child.name]);

            alpha = Math.max(alpha, alphabeta(child, depth-1, alpha, beta, false, g));
            var childValue = child.value;
			maximum = Math.max(maximum, childValue);
            maxArray.push(childValue);
			console.log('alpha value is set to '+alpha);
			//g.nodes[node.name].shape.items['1'].attr('text', maximum+'');
            if(beta <= alpha) {
                //console.log('beta '+beta+' alpha '+alpha);
				console.log('beta cut-off ('+beta+'<='+alpha+'), others children of '+g.nodes[node.name].parent+' wouldn\'t be visited');
                output += "<p>Бета-отсечение: "+beta+" <= "+alpha+"</p>";
                break;
            }
        }
        console.log(node.name+' — maximum of childs of '+node.name+' is '+maximum);
        console.log(node.name+' — childs of node '+node.name+":");
        console.log(JSON.stringify(maxArray));
		//g.nodes[node.name].shape.items['0'].attr('fill', 'blue');

        node.value = Math.max.apply(Math, maxArray);
        g.nodes[node.name].shape.items['1'].attr('text', node.value);

		console.log('returning alpha, node '+node.name+' value is set as '+node.value);
		console.log('going back to node '+g.nodes[node.name].parent)
        return alpha;
    } else {
		
        console.log('minimizing ('+node.name+')');
		var minimum = 999;
        var minArray = [];
        for (var i in node.children) {
            var child = node.children[i];
            //console.log(g.nodes[child.name]);

            beta = Math.min(beta, alphabeta(child, depth-1, alpha, beta, true, g));
            var childValue = child.value;
			minimum = Math.min(minimum, childValue);
            minArray.push(childValue);
			//g.nodes[node.name].shape.items['1'].attr('text', minimum+'');
			console.log('beta value is set to '+beta);
            if (beta <= alpha) {
                //console.log('beta '+beta+' alpha '+alpha);
				console.log('alpha cut-off ('+beta+'<='+alpha+'), others children of '+g.nodes[node.name].parent+' wouldn\'t be visited');
                output += "<p>Узел: "+node.name+", Альфа-отсечение: "+beta+" <= "+alpha+"</p>";
                break;
            }
        }
        console.log(node.name+' — minimum of childs of '+node.name+' is '+minimum);
        console.log(node.name+' — childs of node '+node.name+":");
        console.log(JSON.stringify(minArray));
		//g.nodes[node.name].shape.items['0'].attr('fill', 'red');

        node.value = Math.min.apply(Math, minArray);
        g.nodes[node.name].shape.items['1'].attr('text', node.value);

		console.log('returning beta, minimal node is '+node.value+', node '+node.name+' value is set as '+node.value);
		console.log('going back to node '+g.nodes[node.name].parent);
        return beta;
    }
}