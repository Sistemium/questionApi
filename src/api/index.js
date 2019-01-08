import Router from 'koa-router';
import map from 'lodash/map';
import mapValues from 'lodash/mapValues';
import 'sistemium-telegram/config/aws';
import log from 'sistemium-telegram/services/log';
import findAll from '../data/dynamo';

const { debug, error } = log('rest:api');
const router = new Router();

export default router;

router.get('/questions', question);

async function question(ctx, next) {

  try {
    const res = await findAll('Question');
    debug(res);
    ctx.body = convertResponse(res);
  } catch ({ message }) {
    error(message);
  }

  await next();

}

function convertResponse({ Items: data }) {
  // return map(data, row => ({ id: row.id.S, name: row.name.S }));
  return map(data, row => mapValues(row, value => Object.values(value)[0]));
}
