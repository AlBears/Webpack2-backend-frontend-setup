import { foo } from 'shared/test';
import _ from 'lodash';

foo();

const arr = [ 1, 2, 3, 4];
console.log(_.filter(arr, a => a < 5));
