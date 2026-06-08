import { describe, expect, it } from 'vitest';

import { router } from './routes';

describe('router', () => {
  it('exposes search-first top-level routes', () => {
    const rootRoute = router.routes[0];
    const childPaths = rootRoute.children?.map((route) =>
      route.index ? 'index' : route.path,
    );

    expect(childPaths).toEqual([
      'index',
      'setup',
      'containers/:containerNo',
      'emails/:id',
    ]);
  });
});
