/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import ArrowRight from '../../../static/img/arrow-pointing-right.svg';
import ArrowLeft from '../../../static/img/arrow-pointing-left.svg'
function DocPaginator(props) {
  const {metadata} = props;
  return (
    <nav
      className="pagination-nav docusaurus-mt-lg"
      aria-label={translate({
        id: 'theme.docs.paginator.navAriaLabel',
        message: 'Docs pages navigation',
        description: 'The ARIA label for the docs pagination',
      })}>
      <div className={metadata.previous ? 'pagination-nav__item' : ' pagination-nav__item  pagination-nav__hidden' }>
        {metadata.previous && (
          <Link
            className="pagination-nav__link"
            to={metadata.previous.permalink}>
            <div className="pagination-nav__icon">
              <ArrowLeft />
            </div>
            <div className="pagination-nav__label pagination-nav__label_previous">
              {metadata.previous.title}
            </div>
           
          </Link>
        )}
      </div>
      <div className={metadata.next ? 'pagination-nav__item pagination-nav__item--next' : ' pagination-nav__item pagination-nav__hidden' }>
        {metadata.next && (
          <Link className="pagination-nav__link" to={metadata.next.permalink}>
            <div className="pagination-nav__label pagination-nav__label_next">
              {metadata.next.title}
            </div>
            <div className="pagination-nav__icon">
              <ArrowRight />
            </div>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default DocPaginator;
