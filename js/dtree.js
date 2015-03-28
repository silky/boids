
module.exports = Dtree;

function Dtree() {
  this.size = 0;
}

Dtree.prototype.insert = function(obj) {
  this.root = insert(this.root, obj);
};

Dtree.prototype.contains = function(obj) {
  return contains(this.root, obj);
};

Dtree.prototype.toString = function() {
  return toString(this.root);
};

Dtree.prototype.neighbors = function(point, radius) {
  return neighbors(this.root, point, radius);
};

function insert(node, obj, isEven) {
  if(!node) {
    return { value : obj };
  }

  var cmp = obj.compare(node.value, isEven);
  if(cmp < 0) {
    node.left = insert(node.left, obj, !isEven);
  } else if (cmp > 0) {
    node.right = insert(node.right, obj, !isEven);
  }

  return node;
}

function contains(node, obj, isEven) {
  if(!node) 
    return false;

  var cmp = obj.compare(node.value, isEven);
  
  if(cmp < 0)
    return contains(node.left, obj, !isEven);
  else if (cmp > 0)
    return contains(node.right, obj, !isEven);

  return true;

}

function neighbors(node, point, radius, isEven) {
  var neighborPoints = [],
    leftPoints = [],
    rightPoints = [];

  if(!node)
    return neighborPoints;

  if(node.value.position.distance(point) <= radius) {
    neighborPoints.push(node.value);
  }

  var cmp = point.compare(node.value.position, isEven);
  var distP2L = distanceToLine(point, node.value.position, isEven);

  if(cmp <= 0 || distP2L <= radius) {
    leftPoints = neighbors(node.left, point, radius, !isEven);
  }

  if(cmp >= 0 || distP2L <= radius) {
    rightPoints = neighbors(node.right, point, radius, !isEven);
  }

  return neighborPoints.concat(leftPoints).concat(rightPoints);

}

function distanceToLine(a, b, horizontal) {
  return Math.abs(horizontal ? a.y - b.y : a.x - b.x);
}

function toString(node) {
  if(!node) {
    return '';
  }

  return '{ L:' + toString(node.left)
    + ', N:' + node.value
    + ', R:' + toString(node.right) + '}';
}
