import $ from 'jquery';
import _ from 'lodash';
import { foo } from 'shared/test';
import "./application.scss";

foo();

$('body').html('heheheheheh');
console.log(_);

if (module.hot) {
	module.hot.accept();
}
