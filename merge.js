/*!
 * utils
 * Copyright(c) 2011 jcolebrand
 * Not Licensed Yet
 */

/**
 * Merge object r with object l. Alternately usable in a fluent pattern where l is merged with this.
 *
 *     var 1 = { left: 'right' }
 *       , r = { right: 'left' };
 *     
 *     utils.merge(l, r);
 *     // => { left: 'right', right: 'left' }
 *
 * @param {Object} l Left parameter. Alternately, if used fluently, the operator to be added to the called upon operator.
 * @param {Object} [r] Right parameter.
 * @return {Object}
 * @api public
 */

exports.merge = function(l, r){
  if (l && r) {
  } else if (typeof r == 'undefined'){
    r = l;
    l = this;
  } else if (typeof l == 'undefined'){
    throw new Error('Cannot merge two objects if two objects are not provided.', 'exports.merge');
  }
  for (var k in r) {
    l[k] = r[k];
  }
  return l;
};
