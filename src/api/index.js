import Router from 'koa-router';
// import map from 'lodash/map';
// import mapValues from 'lodash/mapValues';
import 'sistemium-telegram/config/aws';
import log from 'sistemium-telegram/services/log';
import { findAll, find } from '../data/mongo';

const { debug, error } = log('question:api');
const router = new Router();

export default router;

router.get('/question', question);
router.get('/question/:id', question);

async function question(ctx, next) {

  const { id } = ctx.params;

  try {
    const res = id ? await find('Question', id) : await findAll('Question');
    debug(res);
    ctx.body = res;
  } catch ({ message }) {
    error(message);
  }

  await next();

}
